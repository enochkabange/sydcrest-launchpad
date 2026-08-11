/**
 * WhatsApp notifications via Twilio.
 *
 * WhatsApp is where Ghanaian learners actually are (MASTER_PLAN §7), so this
 * matters more than email — but it is v1.1, not pilot-blocking. Until Twilio
 * credentials are configured, every function here no-ops and logs instead of
 * throwing: a missing notification must never fail a registration.
 */

const enabled = Boolean(
  process.env.TWILIO_ACCOUNT_SID &&
  process.env.TWILIO_AUTH_TOKEN &&
  process.env.TWILIO_WHATSAPP_FROM
);

let client = null;
if (enabled) {
  // eslint-disable-next-line global-require
  client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
}

async function send(to, body) {
  if (!enabled) {
    console.info('[whatsapp] disabled — would have sent to %s: %s', to, body);
    return { skipped: true };
  }
  if (!to) return { skipped: true };

  try {
    const msg = await client.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_FROM}`,
      to: `whatsapp:${to}`,
      body,
    });
    return { sid: msg.sid };
  } catch (err) {
    /* Swallow and log. A learner who registered successfully should not see an
       error because a notification provider was down. */
    console.error('[whatsapp] send failed for %s: %s', to, err.message);
    return { error: err.message };
  }
}

const notifyWelcome = (profile) =>
  send(profile.phone, `Welcome to SydCrest Launchpad, ${profile.full_name?.split(' ')[0] ?? 'there'}! Your account is ready.`);

const notifySessionBooked = (profile, session) =>
  send(profile.phone, `Your mentor session is confirmed for ${session.starts_at}.`);

const notifyWeekOpen = (profile, week) =>
  send(profile.phone, `Week ${week.week_number} is now open: ${week.title}`);

module.exports = { send, notifyWelcome, notifySessionBooked, notifyWeekOpen, enabled };
