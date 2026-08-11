/**
 * Showcase — the build harness.
 *
 * Renders every export from components/ui at least once, inside the real
 * AppShell, so the frame is exercised the way a screen would use it. This is
 * what compiles the JSX and resolves every Tailwind class name; add each new
 * component here or nothing catches a class that silently fails to generate.
 */
import { useState } from "react";
import {
  AppShell, Page, PageSection,
  Prose, ProseHTML, CodeBlock, Callout, CheckQuestion, LessonStepper,
  Button, Badge, RoleBadge, Card, CardHeader, CardTitle, CardBody, CardFooter,
  Input, Textarea, Checkbox, Select, FileUpload, Avatar, Progress, WeekTrack, Logo, LogoMark,
  Icon, iconNames, Alert, Toast, ToastStack, Modal, EmptyState,
  Skeleton, SkeletonText, SkeletonCard, LaunchLoader, Spinner, PageLoader,
  Tabs, TabPanel,
} from "./components/ui/index.js";

const NAV = [
  { id: "learn", label: "Learn", icon: "lesson" },
  { id: "lesson", label: "Lesson", icon: "curriculum" },
  { id: "projects", label: "Projects", icon: "project", badge: 2 },
  { id: "mentors", label: "Mentors", icon: "mentor" },
  { id: "kit", label: "Kit", icon: "settings" },
];

const Row = ({ title, children }) => (
  <section className="mb-8 flex flex-col gap-3">
    <h2 className="text-xs font-bold uppercase tracking-widest text-content-3">{title}</h2>
    <div className="flex flex-wrap items-center gap-3">{children}</div>
  </section>
);

/* --- The stepped lesson, with content from the DMP curriculum's territory --- */
const LESSON_STEPS = [
  {
    title: "What a variable actually is",
    content: (
      <>
        <p>
          A variable is a <strong>name for a value</strong>. That's the whole idea.
          You give something a name so you can refer to it later without repeating
          yourself.
        </p>
        <CodeBlock language="javascript">{`let price = 45;
let quantity = 3;
let total = price * quantity;`}</CodeBlock>
        <p>
          Three names, three values. <code>total</code> holds 135, because JavaScript
          worked out <code>price * quantity</code> at the moment you wrote it.
        </p>
        <Callout kind="note" title="Names are for humans">
          The computer does not care whether you call it <code>price</code> or{" "}
          <code>x</code>. The next person reading your code does — and in three
          weeks, that person is you.
        </Callout>
      </>
    ),
    check: {
      question: "After those three lines run, what is the value of total?",
      options: ["48", "135", "45", "It causes an error"],
      answer: 1,
      explanation:
        "45 × 3 = 135. The multiplication happens once, when the line runs — total does not update later if price changes.",
    },
  },
  {
    title: "let and const",
    content: (
      <>
        <p>
          You'll see two ways to make a variable. The difference is whether the name
          is allowed to point at something new later.
        </p>
        <CodeBlock language="javascript" filename="pricing.js">{`const vatRate = 0.15;   // never changes
let subtotal = 0;       // will change as items are added

subtotal = subtotal + 45;
subtotal = subtotal + 30;`}</CodeBlock>
        <p>
          Reach for <code>const</code> first. Use <code>let</code> only when you know
          the value has to change. This isn't style policing — a{" "}
          <code>const</code> tells the next reader "this never moves", which is one
          less thing to hold in your head.
        </p>
        <Callout kind="warning" title="const is not frozen">
          <code>const</code> stops the <em>name</em> being pointed somewhere new. It
          does not stop an object's contents changing. That catches almost everyone
          once.
        </Callout>
      </>
    ),
    check: {
      question: "Which line will throw an error?",
      options: [
        "const rate = 0.15; rate = 0.2;",
        "let total = 0; total = 45;",
        "const items = []; items.push('shirt');",
        "let name = 'Ama'; name = 'Kwame';",
      ],
      answer: 0,
      explanation:
        "Reassigning a const throws. Option 3 is fine — pushing into an array changes its contents, not which array the name points at.",
    },
  },
  {
    title: "Your turn",
    content: (
      <>
        <p>
          Open your editor and write a few lines that work out the cost of a phone
          top-up including VAT. Use <code>const</code> for the rate and{" "}
          <code>let</code> for anything that changes.
        </p>
        <Callout kind="task" title="Before the next lesson">
          <p>Write it, run it, and check the number by hand. Then post the snippet
          in the cohort WhatsApp group — reading each other's naming choices is
          half the lesson.</p>
        </Callout>
        <p>
          Next up: what happens when you put a variable somewhere it shouldn't be —
          and why <code>undefined</code> is not the same as an error.
        </p>
      </>
    ),
  },
];

export default function Showcase() {
  const [view, setView] = useState("lesson");
  const [modalOpen, setModalOpen] = useState(false);
  const [tab, setTab] = useState("lessons");
  const [checked, setChecked] = useState(true);
  const [bio, setBio] = useState("Frontend learner from Kumasi.");
  const [files, setFiles] = useState([]);
  const [toasts, setToasts] = useState([]);

  const user = { name: "Enoch Kabange" };

  return (
    <AppShell nav={NAV} current={view} onNavigate={setView} user={user} notifications={3}>
      {view === "lesson" && (
        <Page width="reading" className="sm:px-6" title="Week 5 · Variables" titleHidden>
          <LessonStepper
            title="Week 5 · Variables"
            steps={LESSON_STEPS}
            onComplete={() =>
              setToasts((t) => [...t, { id: Date.now(), tone: "success", message: "Lesson complete. Week 5 is 40% done." }])
            }
          />
        </Page>
      )}

      {view === "learn" && (
        <Page
          eyebrow="Delta Mentoring Program · Cohort 1"
          title="Welcome back, Enoch"
          description="You're four weeks in. Week 5 unlocks on Monday."
          actions={<Button icon="start">Continue Week 4</Button>}
        >
          <PageSection title="This week">
            <div className="grid gap-4 sm:grid-cols-2">
              <Card variant="accent" interactive>
                <CardHeader><CardTitle>Week 4 — Version control</CardTitle></CardHeader>
                <CardBody>
                  <Progress value={72} label="Your progress" />
                </CardBody>
                <CardFooter>Closes Friday, 23:59 GMT</CardFooter>
              </Card>
              <Card interactive>
                <CardHeader><CardTitle>Mentor session</CardTitle></CardHeader>
                <CardBody>
                  <div className="flex items-center gap-3">
                    <Avatar name="Ama Boateng" />
                    <div className="text-sm">
                      <p className="font-semibold text-content">Ama Boateng</p>
                      <p className="text-content-2">Portfolio review</p>
                    </div>
                  </div>
                </CardBody>
                <CardFooter>Thursday, 18:00 GMT</CardFooter>
              </Card>
            </div>
          </PageSection>

          <PageSection title="Cohort track">
            <Card><CardBody>
              <WeekTrack weeks={[
                "complete","complete","complete","active","none","none",
                "none","none","none","none","none","none",
              ]} />
            </CardBody></Card>
          </PageSection>

          <PageSection title="Notices">
            <div className="flex flex-col gap-3">
              <Alert tone="warning" title="Deadline approaching">
                Week 4 closes in two days. Two exercises are still outstanding.
              </Alert>
              <Alert tone="info" title="Week 5 opens Monday">
                Content unlocks at 06:00 GMT.
              </Alert>
            </div>
          </PageSection>
        </Page>
      )}

      {view === "projects" && (
        <Page title="Projects" description="Everything you build during the cohort.">
          <EmptyState
            icon="project"
            title="No projects yet"
            description="Your first project unlocks at the end of Week 2. It's a personal portfolio page."
            action="Browse the curriculum"
            onAction={() => setView("learn")}
          />
        </Page>
      )}

      {view === "mentors" && (
        <Page title="Mentors" description="Book a session or message your assigned mentor.">
          <div className="flex flex-col gap-3">
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </Page>
      )}

      {view === "kit" && (
        <Page title="Component kit" description="Every primitive in the system, rendered once.">
          <Row title="Logo">
            <Logo size={44} />
            <LogoMark size={40} />
            <span className="rounded-lg bg-blue-500 p-3"><LogoMark size={36} variant="onDark" /></span>
            <span className="rounded-lg bg-ink p-3"><Logo size={36} tone="inverse" /></span>
            <span className="text-orange-800"><LogoMark size={36} variant="mono" /></span>
          </Row>

          <Row title="Loading">
            <LaunchLoader size={56} />
            <Spinner size={20} />
            <div className="w-full rounded-lg border border-line"><PageLoader message="Loading your cohort…" /></div>
          </Row>

          <Row title="Icons">
            <div className="grid w-full grid-cols-4 gap-3 sm:grid-cols-8">
              {iconNames.map((n) => (
                <span key={n} className="flex flex-col items-center gap-1 text-content-2">
                  <Icon name={n} size="lg" />
                  <span className="text-center text-[10px] leading-tight text-content-3">{n}</span>
                </span>
              ))}
            </div>
          </Row>

          <Row title="Buttons">
            <Button icon="start">Enrol now</Button>
            <Button variant="secondary" icon="download">Save draft</Button>
            <Button variant="accent" icon="lesson">Continue Week 4</Button>
            <Button variant="ghost">Cancel</Button>
            <Button variant="danger" icon="delete">Withdraw</Button>
            <Button variant="inverse">Sign up</Button>
            <Button loading>Submitting</Button>
            <Button disabled>Disabled</Button>
            <Button size="sm">Small</Button>
            <Button size="lg" icon="certificate">Large</Button>
          </Row>

          <Row title="Badges and roles">
            <Badge>Not started</Badge>
            <Badge tone="info">In review</Badge>
            <Badge tone="success">Completed</Badge>
            <Badge tone="warning" icon={<Icon name="warning" size="sm" />}>Due in 2 days</Badge>
            <Badge tone="danger">Overdue</Badge>
            <Badge tone="accent">Featured</Badge>
            <RoleBadge role="mentee" /><RoleBadge role="mentor" />
            <RoleBadge role="cohort_admin" /><RoleBadge role="platform_admin" />
            <RoleBadge role="super_admin" />
          </Row>

          <Row title="Lesson content">
            <div className="w-full">
              <Prose>
                <h2>Prose sample</h2>
                <p>Long-form body copy at 17px, capped near 68 characters so a
                line is comfortable on a phone. Inline <code>code</code> sits in
                the line without disturbing it.</p>
                <ul><li>First point</li><li>Second point</li></ul>
                <blockquote>A pull quote uses the brand accent as a rule.</blockquote>
              </Prose>
              <ProseHTML html={"<p>Rendered from stored HTML, as lesson bodies will be.</p>"} />
              <CodeBlock language="css" filename="styles.css">{`.card {
  /* a comment */
  border-radius: 8px;
  padding: 16px;
}`}</CodeBlock>
              <Callout kind="tip" title="Tip">Callouts are the author speaking.</Callout>
              <CheckQuestion
                question="Which is the author speaking, rather than the system?"
                options={["Alert", "Callout"]}
                answer={1}
                explanation="Alert reports what the system did; Callout is the curriculum talking."
              />
            </div>
          </Row>

          <Row title="Tabs">
            <div className="w-full">
              <Tabs value={tab} onChange={setTab} tabs={[
                { id: "lessons", label: "Lessons", icon: "lesson", count: 12 },
                { id: "projects", label: "Projects", icon: "project", count: 3 },
                { id: "sessions", label: "Sessions", icon: "session" },
              ]} />
              <TabPanel id="lessons" value={tab} baseId="d"><p className="text-sm text-content-2">Twelve weeks.</p></TabPanel>
              <TabPanel id="projects" value={tab} baseId="d"><p className="text-sm text-content-2">Three submitted.</p></TabPanel>
              <TabPanel id="sessions" value={tab} baseId="d"><p className="text-sm text-content-2">None booked.</p></TabPanel>
            </div>
          </Row>

          <Row title="Avatars">
            <Avatar name="Enoch Kabange" size="xs" /><Avatar name="Ama Boateng" size="sm" />
            <Avatar name="Kwame Mensah" size="md" /><Avatar name="Yaw Osei" size="lg" />
            <Avatar name="Nana Adjei" size="xl" />
          </Row>

          <Row title="Form controls">
            <div className="grid w-full gap-5 sm:grid-cols-2">
              <Input label="Email address" placeholder="you@example.com" required />
              <Input label="Cohort code" defaultValue="DMP-2027-X"
                     error="That code doesn't match an open cohort. Check the invite email." />
              <Textarea label="Short bio" value={bio} onChange={(e) => setBio(e.target.value)}
                        maxLength={160} hint="Shown to your mentor before your first session." />
              <div className="flex flex-col gap-3">
                <Checkbox label="Email me when my mentor replies" checked={checked}
                          onChange={(e) => setChecked(e.target.checked)} />
                <Checkbox label="Send WhatsApp reminders" hint="Recommended — most learners miss email." defaultChecked />
                <Checkbox label="Unavailable option" disabled />
              </div>
              <Select
                label="Preferred session time"
                placeholder="Choose a slot"
                hint="All times are GMT — Ghana local time."
                options={[
                  { value: "wed18", label: "Wednesday, 18:00" },
                  { value: "thu18", label: "Thursday, 18:00" },
                  { value: "sat10", label: "Saturday, 10:00" },
                  { value: "sun16", label: "Sunday, 16:00 (full)", disabled: true },
                ]}
              />
              <FileUpload
                label="Submit your project"
                hint="A .zip of your folder, or a link in the notes field below."
                value={files}
                onChange={setFiles}
                multiple
              />
            </div>
          </Row>

          <Row title="Progress">
            <div className="flex w-full flex-col gap-5">
              <Progress value={72} label="Week 4 · Version control" />
              <Progress value={100} state="complete" label="Week 3 · HTML & CSS" />
              <Progress value={20} state="overdue" label="Week 5 · Flexbox" />
              <Progress value={0} state="none" label="Week 6 · JavaScript" size="lg" />
            </div>
          </Row>

          <Row title="Cards and skeletons">
            <div className="grid w-full gap-4 sm:grid-cols-2">
              <Card variant="raised"><CardBody>Raised</CardBody></Card>
              <Card variant="sunken"><CardBody>Sunken</CardBody></Card>
              <SkeletonText lines={3} />
              <Skeleton className="h-11 w-40" />
            </div>
          </Row>

          <Row title="Modal and toast">
            <Button onClick={() => setModalOpen(true)}>Open modal</Button>
            <Button variant="secondary" onClick={() =>
              setToasts((t) => [...t, { id: Date.now(), tone: "info", message: "Mentor session booked." }])}>
              Add toast
            </Button>
          </Row>
        </Page>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Withdraw from the cohort?"
        description="This frees your seat for someone on the waitlist and cannot be undone."
        footer={
          <>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Stay enrolled</Button>
            <Button variant="danger" onClick={() => setModalOpen(false)}>Withdraw</Button>
          </>
        }
      >
        <p className="text-sm text-content-2">
          You've completed three of twelve weeks. Your progress is kept for six
          months if you'd rather pause instead.
        </p>
      </Modal>

      <ToastStack toasts={toasts} onDismiss={(id) => setToasts((t) => t.filter((x) => x.id !== id))} />
    </AppShell>
  );
}
