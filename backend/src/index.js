require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const { v4: uuidv4 } = require('uuid');
const { supabase } = require('./config/supabase');

const app = express();

/* Railway terminates TLS at a load balancer, so without this every request
   arrives carrying the proxy's address: `req.ip` is identical for all users,
   the rate limiter buckets the entire cohort together, and audit logs record
   one meaningless IP. Trust exactly one hop — `true` would trust any
   X-Forwarded-For header a client sends, which is trivially spoofable. */
app.set('trust proxy', 1);

// ─── REQUEST ID ───────────────────────────────────────────────
app.use((req, res, next) => {
  req.id = uuidv4();
  res.setHeader('X-Request-ID', req.id);
  next();
});

// ─── SECURITY HEADERS ─────────────────────────────────────────
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", process.env.SUPABASE_URL],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
    },
  },
  crossOriginEmbedderPolicy: false,
}));

// ─── CORS ─────────────────────────────────────────────────────
const allowedOrigins = (process.env.ALLOWED_ORIGINS || process.env.CLIENT_URL || 'http://localhost:3000').split(',');
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error(`CORS: ${origin} not allowed`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-ID'],
}));

// ─── LOGGING ──────────────────────────────────────────────────
morgan.token('reqid', req => req.id);
app.use(morgan(
  process.env.NODE_ENV === 'production'
    ? ':reqid :method :url :status :res[content-length] - :response-time ms'
    : 'dev'
));

// ─── BODY PARSING ─────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ─── GLOBAL RATE LIMITS ───────────────────────────────────────
// The integration suite (test/) makes real register/login calls against
// this same app, from one IP, well past any of these limits — that's a
// property of testing against the real API, not something to lower the
// limits for. Skipping in test env is the standard escape hatch.
const skipInTest = () => process.env.NODE_ENV === 'test';

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === 'production' ? 200 : 1000,
  standardHeaders: true,
  legacyHeaders: false,
  skip: skipInTest,
  /* No custom keyGenerator. The original code used `req => req.ip`, which
     keys on the raw address: an IPv6 user holds a whole /64 and can rotate
     through billions of addresses to bypass the limit entirely. The library's
     default already groups IPv6 by subnet — deleting the override is the fix. */
  message: { error: 'Too many requests. Please try again in 15 minutes.' },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  skip: skipInTest,
  message: { error: 'Too many auth attempts. Please wait 15 minutes.' },
  skipSuccessfulRequests: false,
});

const aiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 15,
  skip: skipInTest,
  message: { error: 'AI rate limit reached. Please wait a moment.' },
});

app.use('/api/', globalLimiter);
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);
app.use('/api/learning/paths/generate', aiLimiter);
app.use('/api/learning/chat', aiLimiter);
app.use('/api/learning/quiz/generate', aiLimiter);
app.use('/api/opportunities/research', aiLimiter);
app.use('/api/opportunities/roadmap', aiLimiter);
app.use('/api/opportunities/assistant', aiLimiter);
app.use('/api/projects/:id/ai-assess', aiLimiter);

// ─── ROUTES ───────────────────────────────────────────────────
app.use('/api/auth',         require('./routes/auth'));
app.use('/api/learning',     require('./routes/learning'));
app.use('/api/projects',     require('./routes/projects'));
app.use('/api/marketplace',  require('./routes/marketplace'));
app.use('/api/community',    require('./routes/community'));
app.use('/api/opportunities',require('./routes/opportunities'));
app.use('/api/admin',        require('./routes/admin'));
app.use('/api/sessions',     require('./routes/sessions'));

// ─── HEALTH / READINESS ───────────────────────────────────────
app.get('/api/health', async (req, res) => {
  let db = 'ok';
  try {
    await supabase.from('profiles').select('id').limit(1);
  } catch { db = 'degraded'; }
  res.json({
    status: db === 'ok' ? 'ok' : 'degraded',
    version: process.env.npm_package_version || '1.0.0',
    env: process.env.NODE_ENV,
    db,
    uptime: process.uptime(),
    time: new Date().toISOString(),
  });
});

// ─── 404 ──────────────────────────────────────────────────────
app.use((req, res) => res.status(404).json({ error: 'Not found', path: req.path }));

// ─── GLOBAL ERROR HANDLER ─────────────────────────────────────
app.use((err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  if (process.env.NODE_ENV !== 'production') console.error(`[${req.id}]`, err.stack);
  else console.error(`[${req.id}] ${status} ${err.message}`);
  res.status(status).json({
    error: process.env.NODE_ENV === 'production' && status === 500
      ? 'An internal error occurred'
      : err.message,
    requestId: req.id,
  });
});

// ─── GRACEFUL SHUTDOWN ────────────────────────────────────────
// Guarded so `require('./index')` from the test suite (supertest manages
// its own ephemeral listener against the exported `app`) doesn't also bind
// the real port and register a second set of signal handlers.
if (require.main === module) {
  const server = app.listen(process.env.PORT || 5000, () => {
    console.log(`\n🚀  SydCrest API`);
    console.log(`    Port:     ${process.env.PORT || 5000}`);
    console.log(`    Env:      ${process.env.NODE_ENV}`);
    console.log(`    Supabase: ${process.env.SUPABASE_URL ? '✓' : '✗ MISSING'}`);
    console.log(`    Claude:   ${process.env.ANTHROPIC_API_KEY ? '✓' : '✗ MISSING'}`);
    console.log(`    MoMo:     ${process.env.HUBTEL_CLIENT_ID ? '✓' : '✗ not configured'}\n`);
  });

  process.on('SIGTERM', () => {
    console.log('SIGTERM received. Draining connections...');
    server.close(() => { console.log('Server closed.'); process.exit(0); });
  });
  process.on('SIGINT', () => server.close(() => process.exit(0)));
}
process.on('unhandledRejection', (reason) => console.error('Unhandled rejection:', reason));
process.on('uncaughtException', (err) => { console.error('Uncaught exception:', err); process.exit(1); });

module.exports = app;
