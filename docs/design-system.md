# SydCrest Launchpad — Design System

Version 1.0 · August 2026 · Derived from the Beet Agency brand guideline.

Tokens live in `frontend/src/styles/tokens.css`. Primitives live in
`frontend/src/components/ui/`. Components must reference tokens, never raw hex.

**Verification:** `frontend/src/Showcase.jsx` renders every primitive and is
compiled by `npm run build`. Add each new component to it — a Tailwind class
that fails to generate produces no error, only a missing colour, and the
showcase is what catches that.

---

## 1. Logo

The mark is four angled bars carrying two gradients — a cool blue→black pair
and a warm orange→yellow pair. Geometry was measured from the vector paths in
the brand guideline PDF, so `LogoMark` is the real artwork rather than a trace.

| Variant | Use |
|---|---|
| `<Logo />` | Default lockup, ink wordmark, on white or light surfaces |
| `<Logo tone="inverse" />` | On Sea Blue, charcoal, or photography |
| `<LogoMark />` | Favicon, app icon, avatar slot, nav at narrow widths |
| `<LogoMark variant="onDark" />` | Any dark ground — see the rule below |
| `<LogoMark variant="mono" />` | Single-colour contexts; inherits `currentColor` |

**Clear space:** keep a margin equal to the mark's height on all sides
(the `X` rule on page 2 of the guideline). **Never** recolour the bars,
change their angles, or reorder them.

### The dark-ground rule

The full-colour mark is for **light surfaces only**. Its two cool bars run to
near-black, so on ink or Sea Blue they vanish into the background and the mark
loses half its geometry.

On dark grounds use `variant="onDark"`: the cool bars become **solid white**,
the warm bars keep their gradient. This is the brand book's own treatment —
it is exactly what the app icons in the guideline do.

### Known gap — the wordmark
No Gilroy web licence is held, so the lockup's wordmark is *set in Urbanist*,
not vectorised from the original artwork. It is close but not metrically
identical. For print and social, keep using the agency's supplied files.

**The fix is one email:** ask Beet Agency for the vector source
(`.ai`, `.svg`, or `.eps`). They will have it. That gives a pixel-exact
wordmark and removes this caveat entirely — worth doing before launch.

---

## 2. Typography

Brand font is **Gilroy** (commercial; no web licence held). The platform uses
**Urbanist** — chosen because it shares Gilroy's distinctive *single-storey* `a`
and near-identical letter widths, unlike the commonly suggested Figtree or
Poppins. One 28KB variable woff2 covers all six Gilroy weights, which matters
for learners on MTN mobile data and low-end Android.

| Gilroy weight | Token | Value |
|---|---|---|
| Light | `--font-weight-light` | 300 |
| Regular | `--font-weight-normal` | 400 |
| Medium | `--font-weight-medium` | 500 |
| SemiBold | `--font-weight-semibold` | 600 |
| Bold | `--font-weight-bold` | 700 |
| Black | `--font-weight-black` | 900 |

Headings use Bold with `-0.02em` tracking. Body is Regular at 16px minimum —
never smaller for content learners have to read on a phone.

> If Gilroy is licensed later, swap the single `@font-face` block in
> `tokens.css`. Nothing else changes.

---

## 3. Colour

| Role | Token | Hex | On white |
|---|---|---|---|
| Primary (Sea Blue) | `--color-blue-500` | `#1C75BB` | 4.87:1 ✅ |
| Accent (Orange) | `--color-orange-500` | `#F79020` | 2.34:1 ❌ |
| Text-safe orange | `--color-orange-800` | `#A0590E` | 5.33:1 ✅ |
| Secondary (Charcoal) | `--color-neutral-800` | `#333333` | 12.63:1 ✅ |
| Ink | `--color-neutral-900` | `#211D1D` | 16.69:1 ✅ |

### The orange rule

Brand orange at `#F79020` is **2.34:1 on white — it fails AA for text.**
This is the single most important constraint in the system.

- ✅ Orange as a **fill**: progress accents, active indicators, streak
  markers, decorative shapes, the launch gradient.
- ✅ Orange **with ink text on top** (7.13:1) — this is the `accent` button.
- ✅ Orange as **text on charcoal or ink** (5.39:1 / 7.13:1) — dark surfaces only.
- ❌ Orange text on white. Use `--color-orange-800` instead.
- ❌ White text on orange. That is 2.34:1. Invert to ink.

The brand book agrees, incidentally: its own website mockup uses a charcoal
CTA button, not an orange one.

---

## 4. Status vs. brand accent

**Brand orange is not a status colour.** It means "SydCrest", never "caution".
If orange signalled both *in progress* and *warning*, learners would read a
progress bar as a problem. So the status set excludes it entirely:

| Meaning | Token | Hue |
|---|---|---|
| Success | `--color-success-700` | green |
| Warning | `--color-warning-700` | yellow, 45° — clear of the accent's 33° |
| Danger | `--color-danger-700` | red |
| Info | `--color-info-700` | blue |

Status badges are **tinted** (50-level surface, 700-level text), not solid, so
they stay quiet next to the accent. Warnings always carry an icon — colour
alone never carries meaning.

### Learning progress has its own vocabulary

| State | Token | Colour |
|---|---|---|
| Not started | `--progress-none` | neutral |
| In progress | `--progress-active` | blue |
| Complete | `--progress-complete` | green |
| Overdue | `--progress-overdue` | red |

---

## 5. Roles

Five levels from `schema.sql`, with visual weight escalating alongside
authority so privilege is legible at a glance in admin tables. All five clear
4.5:1 as text on white and take white text as a solid fill.

| Role | Treatment |
|---|---|
| `mentee` | Neutral grey, tinted |
| `mentor` | Sea Blue, tinted |
| `cohort_admin` | Teal `#0F766E`, tinted |
| `platform_admin` | Orange `#A0590E`, tinted |
| `super_admin` | Solid ink, white text |

---

## 6. Icons

Icons come from [Lucide](https://lucide.dev), wrapped in a **semantic layer**.
Components ask for what a thing *means*, not which glyph it is:

```jsx
<Icon name="lesson" />     // not <BookOpen />
<Icon name="mentor" />     // not <UserRound />
```

Changing the picture for "project" is then one line in `Icon.jsx` rather than a
find-and-replace across the app. The registry is the vocabulary — **adding an
icon is a design decision, not a convenience**, and only registered icons are
bundled.

Sizes are `sm` 16 · `md` 20 · `lg` 24 · `xl` 32. Icons are `aria-hidden` by
default; pass `label` when an icon carries meaning on its own.

An unknown name **throws in dev** and renders a visible red marker in
production. A silently-missing icon is the same class of bug as a Tailwind
class that never generates — invisible in review, obvious to a user.

**Cost:** 48 icons add ~27KB raw / ~8KB gzipped. Lucide ships 6,059; tree
shaking is what keeps that from being megabytes, which is why the registry
uses named imports rather than a dynamic lookup.

---

## 7. Motion

**One rule governs everything: animate `transform` and `opacity` only.** Those
composite on the GPU. Animating height, width, top or `background-position`
forces layout or paint every frame — the difference between a smooth UI and a
stuttering one on the phones this cohort actually owns. No exceptions.

| Token | Value | Use |
|---|---|---|
| `--duration-instant` | 100ms | Pressed states, checkbox ticks |
| `--duration-fast` | 160ms | Default — hover, colour changes |
| `--duration-medium` | 240ms | Entrances: toasts, modals |
| `--duration-slow` | 380ms | Progress fills, celebratory moments |
| `--ease-out-quart` | `cubic-bezier(.22,1,.36,1)` | Things arriving |
| `--ease-in-quart` | `cubic-bezier(.64,0,.78,0)` | Things leaving |
| `--ease-standard` | `cubic-bezier(.4,0,.2,1)` | Everything else |

`prefers-reduced-motion` is honoured globally in `tokens.css` — every duration
collapses to near-zero. Nothing depends on animation to be usable.

### The launch loader

The signature motion: the logo's four bars rise along the axis they already
point down, staggered 110ms apart. It replaces a generic spinner for full-page
and inline loading.

**This is the only place stagger is used.** Scattering the effect across the UI
would spend the idea and cheapen it. Use `<Spinner />` inside buttons and tight
spaces, where the mark would be illegible anyway.

### Skeletons pulse, they don't shimmer

A sweeping shimmer needs a full-width layer moving under every block. On a list
of twenty lesson cards that is real per-frame work on a cheap phone. Opacity
reads the same and costs almost nothing.

---

## 8. Layout and navigation

`AppShell` is the frame every signed-in screen sits inside. The responsive
decision is made **once**, here, so no screen re-litigates it:

| Breakpoint | Navigation |
|---|---|
| `< md` (768px) | **Bottom tab bar.** The majority device is a phone held one-handed. Primary navigation belongs under the thumb — not behind a hamburger in the top-left corner, the hardest pixel on a phone to reach. |
| `≥ md` | **Persistent sidebar.** Space exists, so spend it on orientation rather than hiding navigation behind a click. |

**There is no hamburger menu at any breakpoint.** Every primary destination is
always one tap away. The tab bar carries `env(safe-area-inset-bottom)` so it
clears the iOS home indicator, and `<main>` carries matching bottom padding so
content is never trapped underneath it.

`Page` holds the one-per-screen `h1`, an optional eyebrow for context (which
week, which cohort) and a slot for page actions. `width="reading"` narrows the
column for lesson screens. `PageSection` groups runs of cards under a
subheading.

Accessibility built into the shell: a skip link as the first tab stop, proper
`header` / `nav` / `main` landmarks, and `aria-current="page"` on the active
destination.

---

## 9. Lesson content

This is the surface a learner spends twelve weeks inside, so it gets its own
treatment rather than inheriting UI defaults.

### Prose

`Prose` wraps lesson bodies. Type is 17px at 1.7 line-height, capped near **68
characters** — wider is measurably harder to read on a phone at arm's length.
All styling lives in the `.prose` block in `tokens.css` rather than utility
classes, because lesson HTML comes from the database and cannot carry class
names on every element. Code blocks, callouts and tables opt out of the measure
with `.full-bleed`.

`ProseHTML` renders stored lesson HTML. **It must be sanitised server-side on
save** — never point it at learner submissions or community posts.

### Code blocks — and why there's no highlighter

Prism costs **~22KB gzipped** (17KB core plus markup/css/javascript). That is
roughly a 30% increase on the entire app bundle, paid by every learner on
metered data, on every visit — for colour.

So highlighting happens **once, server-side, when a lesson is saved**, and the
result is stored with the lesson. The client ships zero highlighter. `CodeBlock`
includes a ~40-line fallback tokenizer for the three languages the DMP
curriculum uses, so authoring preview and unprocessed content still read
correctly.

The fallback produces **React elements, not HTML strings**, so injection is
structurally impossible. The `html` prop is opt-in and takes server-generated
markup only.

Token colours are deliberately restrained — four hues, all AA against the code
surface. A rainbow highlighter fights the brand and reads as noise at 14px on a
low-DPI panel.

### Callout vs Alert

They look different on purpose and must never blur:

- **Alert** — the *system* reporting what happened. "Submission failed."
- **Callout** — the *author* speaking to the learner. "Watch out for this."

Callout kinds: `note`, `tip`, `warning`, and `task` — the last being a concrete
thing to go and do, which is where curriculum turns into practice.

### Form controls worth noting

**`Select` is a styled native `<select>`, deliberately.** On Android the native
picker is a full-screen wheel that is faster and more accurate one-handed than
any custom listbox, and it brings keyboard support, typeahead and screen-reader
semantics for free. The trade is that options cannot be styled — worth it for
choosing a cohort, a slot, or a timezone.

**`FileUpload` handles selection and validation only.** Transfer belongs to the
caller, because retry-on-flaky-connection is a network concern and the
connection here is mobile data. Drag-and-drop is an enhancement, never the only
route — the majority device is a phone, where dragging does not exist.

### Stepped lessons

`LessonStepper` presents a lesson as a sequence of short steps rather than one
long scroll — the structural idea worth taking from Brilliant. A 3,000-word page
gets abandoned; twelve steps with a visible "4 of 12" gets finished. Since
completion rate is the pilot's entire thesis, that is a product decision, not a
layout preference.

Steps carrying a `check` gate advancement until answered. Steps without one
advance freely — **gating every step turns a lesson into an exam.**

`CheckQuestion` is the beat that ends a step. Two rules in its feedback design:

1. A wrong answer is never a dead end — you retry, and you are not scored.
2. The explanation shows on a **correct** answer too. Being right for the wrong
   reason is the failure mode nobody catches.

For a coding curriculum the highest-value question shapes are "what does this
print?" and "spot the bug" — both plain text, both cheap on mobile data.

Focus moves to the new step's heading on advance. Without that, a keyboard or
screen-reader user presses Continue and lands nowhere — the most common
accessibility failure in stepped interfaces.

---

## 10. Layout, radius, elevation

Radius is deliberately tight (4–12px) — the logo is built from hard-edged
bars, and heavy rounding fights it. Separation comes from **borders**;
shadows are reserved for genuinely raised surfaces (menus, modals). Flat
cards also render better on low-DPI Android panels.

Interactive targets are **44px minimum** on `md` and above.

---

## 11. Accessibility floor

Non-negotiable for the pilot:

- Every text/background pair ≥ 4.5:1 (≥ 3:1 for text ≥ 24px).
- Colour is never the only signal — pair with icon, label, or shape.
- One focus treatment everywhere: 2px `--focus-ring` at 2px offset.
- `prefers-reduced-motion` respected globally.
- Form errors use `aria-invalid` + `aria-describedby`, not just red borders.

---

## 12. Themes

**Components never write raw colour.** They name a role — `bg-surface`,
`text-content-2`, `border-line` — and the theme decides the value. A component
that writes `bg-white` has silently opted out of theming.

| Role | Light | Dark |
|---|---|---|
| `surface` | `#FFFFFF` | `#14171C` |
| `surface-raised` | `#FFFFFF` | `#1B1F26` |
| `surface-sunken` | `#FAFAF9` | `#0E1114` |
| `content` | `#211D1D` (16.69:1) | `#F4F4F2` (16.31:1) |
| `content-2` | `#57564F` (7.37:1) | `#A3A29D` (7.02:1) |
| `content-3` | `#78776F` (4.50:1) | `#83827B` (4.65:1) |
| `line` / `line-strong` | `#E7E6E3` / `#D4D3CF` | `#262B33` / `#333A44` |

Status colours are **fg/bg pairs** (`text-success-fg` on `bg-success-bg`), so a
tinted chip is one decision in both themes rather than two hand-picked hexes.

Every dark value was measured, not eyeballed. Two failed on first pass and were
corrected: `content-3` was 3.99:1 and the danger red 3.72:1 — both below the
4.5:1 floor. The brand accent behaves **better** in dark (9.40:1) than on white
(2.34:1).

Three theme states, not two: **system** is the default and follows the OS, so a
learner whose phone is in night mode gets a dark app without touching a setting.
An explicit choice is remembered and wins over the OS. `useTheme()` handles it.

---

## 13. Known gaps

Named rather than quietly deferred:

- **Page-level states** — no 404, 500 or offline screens yet. `EmptyState` covers
  the pattern; these are compositions of it.
- **Global toast provider** — toast state is currently local to whichever screen
  raises it. Fine for one screen, needs lifting before several do.
- **Rich listbox** — `Select` is a styled native control on purpose (§ below). If
  a case genuinely needs avatars beside options, that is the moment to build one.
- **Real-device check** — mobile layout is verified at 390px in an iframe, which
  resolves media queries correctly, but not yet on physical hardware.
