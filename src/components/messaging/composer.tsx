"use client";

import { useActionState, useRef, useState, useTransition, type FormEvent } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CheckboxField, CheckboxGroup, SelectField, TextAreaField, TextField } from "@/components/ui/field";
import Link from "@/components/ui/link";
import { STAGES } from "@/lib/learners/attributes";
import {
  BODY_MAX,
  CHANNELS,
  COMPOSER_TEMPLATES,
  FREQUENCY_DAYS,
  HOLDOUT_DEFAULT,
  HOLDOUT_MAX,
  NO_EMAIL_NOTE,
  RETURN_WINDOW_DAYS,
  SEND_CAP,
  TITLE_MAX,
  isChannel,
  isComposerTemplate,
  splitPreview,
  whatsappPreview,
  type Channel,
  type ComposerTemplateName,
} from "@/lib/messaging/audience";
import { checkAudience, sendComposedMessage, type SendState } from "@/lib/messaging/composer-actions";
import { REGIONS } from "@/lib/regions";

type Option = { id: string; name: string };

/**
 * The audience composer (#334), shared by staff (/admin/messages) and chapter
 * leads (their chapter's lead page). Pick who, check how many, write the
 * message from a template, see the preview, and send. Everything is checked
 * again on the server; this form only helps.
 */
export function Composer({
  chapterId,
  chapterName,
  chapterHref,
  tracks,
  chapters,
  cohorts,
  origin,
  resultsBase,
}: {
  /** A chapter lead's chapter; null for a staff send. */
  chapterId: string | null;
  chapterName?: string;
  /** The chapter page, for the chapter news template. */
  chapterHref?: string;
  tracks: { slug: string; title: string }[];
  /** Staff only. */
  chapters?: Option[];
  cohorts?: Option[];
  origin: string;
  /** Where a send's results live: `${resultsBase}/${id}`. */
  resultsBase: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, send, sending] = useActionState<SendState, FormData>(sendComposedMessage.bind(null, chapterId), {});
  const [checking, startCheck] = useTransition();
  const [, startSend] = useTransition();
  const [size, setSize] = useState<number | null>(null);
  const [sizeError, setSizeError] = useState<string | null>(null);
  const [holdout, setHoldout] = useState(HOLDOUT_DEFAULT);
  const [channel, setChannel] = useState<Channel>("in_app");
  const [template, setTemplate] = useState<ComposerTemplateName>("come_back");
  const [title, setTitle] = useState<string>(COMPOSER_TEMPLATES.come_back.title);
  const [body, setBody] = useState<string>(COMPOSER_TEMPLATES.come_back.body);
  const [href, setHref] = useState<string>(COMPOSER_TEMPLATES.come_back.href);
  const staff = chapterId === null;

  function audienceChanged() {
    setSize(null);
    setSizeError(null);
  }

  function pickTemplate(value: string) {
    if (!isComposerTemplate(value)) return;
    const t = COMPOSER_TEMPLATES[value];
    setTemplate(value);
    setTitle(t.title);
    setBody(t.body);
    setHref(value === "chapter_news" && chapterHref ? chapterHref : t.href);
  }

  function check() {
    const form = formRef.current;
    if (!form) return;
    const data = new FormData(form);
    startCheck(async () => {
      const result = await checkAudience(chapterId, data);
      if (result.error !== undefined) {
        setSize(null);
        setSizeError(result.error);
      } else {
        setSize(result.size);
        setSizeError(null);
      }
    });
  }

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    // Called by hand, not through the form's action, so a refused send keeps every field.
    startSend(() => send(data));
  }

  const split = size === null ? null : splitPreview(size, holdout);
  const ready = size !== null && size > 0 && size <= SEND_CAP;

  if (state.sent) {
    const s = state.sent;
    return (
      <div className="flex flex-col gap-3">
        <Alert tone="success">
          Sent. {s.audience} {s.audience === 1 ? "person" : "people"} matched; {s.audience - s.held}{" "}
          {s.channel === "whatsapp" ? "are getting it on WhatsApp now" : "got it in the app"}, and {s.held} were held out to compare.
        </Alert>
        <div className="flex flex-wrap gap-3">
          <Link href={`${resultsBase}/${s.id}`} className="inline-flex min-h-11 items-center font-semibold text-content-link">
            See the results
          </Link>
          <Button variant="secondary" onClick={() => window.location.reload()}>
            Write another message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={submit} className="flex flex-col gap-8" noValidate>
      {state.error && <Alert tone="danger">{state.error}</Alert>}

      <fieldset className="flex flex-col gap-5" onChange={audienceChanged}>
        <legend className="mb-2 text-h3 text-content">Who gets it</legend>
        <p className="-mt-2 text-sm text-content-2">
          {staff
            ? "Leave a filter empty to include everyone."
            : `Only members of ${chapterName ?? "your chapter"}. Leave a filter empty to include all of them.`}
        </p>
        <CheckboxGroup
          name="stage"
          legend="Stage"
          legendStyle="field"
          hint="Worked out each day from what members do on Launchpad."
          options={STAGES.map((s) => ({ value: s.value, label: `${s.label}: ${s.hint.toLowerCase()}` }))}
          checked={[]}
        />
        <div className="grid gap-5 md:grid-cols-2">
          <TextField
            id="inactive_days"
            label="Inactive for at least (days)"
            type="number"
            inputMode="numeric"
            min={1}
            max={365}
            placeholder="For example 14"
          />
          <SelectField id="track" label="Track" defaultValue="">
            <option value="">Any track</option>
            {tracks.map((t) => (
              <option key={t.slug} value={t.slug}>
                {t.title}
              </option>
            ))}
          </SelectField>
          {staff && (
            <>
              <SelectField id="region" label="Region" defaultValue="">
                <option value="">Any region</option>
                {REGIONS.map((r) => (
                  <option key={r.slug} value={r.slug}>
                    {r.label}
                  </option>
                ))}
              </SelectField>
              <SelectField id="chapter_id" label="Chapter" defaultValue="">
                <option value="">Any chapter</option>
                {(chapters ?? []).map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </SelectField>
              <SelectField id="cohort_id" label="Cohort" defaultValue="">
                <option value="">Any cohort</option>
                {(cohorts ?? []).map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </SelectField>
            </>
          )}
          <TextField
            id="campaign"
            label="First came from campaign"
            hint="The campaign tag on the link they first used, like tamale."
            autoComplete="off"
          />
        </div>

        <fieldset className="flex flex-col gap-2">
          <legend className="text-sm font-semibold text-content">Send by</legend>
          {CHANNELS.map((c) => (
            <label key={c.value} className="flex min-h-11 items-start gap-3 py-1 text-sm text-content">
              <input
                type="radio"
                name="channel"
                value={c.value}
                checked={channel === c.value}
                onChange={(e) => isChannel(e.target.value) && setChannel(e.target.value)}
                className="mt-0.5 size-5 shrink-0 accent-line-selected"
              />
              <span className="flex flex-col">
                <span className="font-semibold">{c.label}</span>
                <span className="text-content-2">{c.hint}</span>
              </span>
            </label>
          ))}
          <p className="text-sm text-content-3">{NO_EMAIL_NOTE}</p>
        </fieldset>

        <div className="flex flex-col gap-2 rounded-lg border border-line bg-surface-sunken p-4" aria-live="polite">
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="secondary" onClick={check} disabled={checking}>
              {checking ? "Counting…" : "Check audience size"}
            </Button>
            {split && size !== null && (
              <p className="text-sm text-content" data-testid="audience-size">
                <strong>{size}</strong> {size === 1 ? "person matches" : "people match"}.{" "}
                {size > 0 && `${split.send} would get it and ${split.held} would be held out.`}
              </p>
            )}
          </div>
          {sizeError && <p className="text-sm text-danger-fg">{sizeError}</p>}
          {size !== null && size > SEND_CAP && (
            <p className="text-sm text-danger-fg">One message can reach at most {SEND_CAP} people. Narrow the audience.</p>
          )}
          <p className="text-sm text-content-3">
            Anyone sent one of these messages in the last {FREQUENCY_DAYS} days is left out, so nobody gets too many.
          </p>
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-5">
        <legend className="mb-2 text-h3 text-content">The message</legend>
        <input type="hidden" name="template" value={template} />
        <SelectField id="template_pick" label="Start from" value={template} onChange={(e) => pickTemplate(e.target.value)}>
          {Object.entries(COMPOSER_TEMPLATES).map(([value, t]) => (
            <option key={value} value={value}>
              {t.label}
            </option>
          ))}
        </SelectField>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <TextField
              id="title"
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={TITLE_MAX}
              required
              error={state.errors?.title}
            />
            <TextAreaField
              id="body"
              label="Message"
              hint={channel === "whatsapp" ? "WhatsApp sends the title and link only, in our approved wording." : `Up to ${BODY_MAX} characters.`}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              maxLength={BODY_MAX}
              rows={4}
              error={state.errors?.body}
            />
            <TextField
              id="href"
              label="Link to a page (optional)"
              hint="A page on Launchpad, like /events."
              value={href}
              onChange={(e) => setHref(e.target.value)}
              error={state.errors?.href}
            />
          </div>
          <Preview channel={channel} title={title} body={body} href={href} origin={origin} />
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-3">
        <legend className="mb-2 text-h3 text-content">Compare</legend>
        <TextField
          id="holdout"
          label="Hold out (percent)"
          type="number"
          inputMode="numeric"
          min={0}
          max={HOLDOUT_MAX}
          value={String(holdout)}
          onChange={(e) => setHoldout(Math.min(Math.max(Number(e.target.value) || 0, 0), HOLDOUT_MAX))}
          hint={`A random share of the audience gets nothing, so you can see if the message made a difference. Results compare who came back within ${RETURN_WINDOW_DAYS} days.`}
        />
      </fieldset>

      <div className="flex flex-col gap-3 border-t border-line pt-5">
        <CheckboxField id="confirm" disabled={!ready}>
          {ready && split
            ? `Send to ${split.send} ${split.send === 1 ? "person" : "people"} and hold out ${split.held}.`
            : "Check the audience size first."}
        </CheckboxField>
        <Button type="submit" disabled={!ready || sending} className="self-start">
          {sending ? "Sending…" : "Send message"}
        </Button>
      </div>
    </form>
  );
}

function Preview({ channel, title, body, href, origin }: { channel: Channel; title: string; body: string; href: string; origin: string }) {
  return (
    <section aria-label="Preview" className="flex flex-col gap-2">
      <h3 className="text-sm font-semibold text-content-2">Preview</h3>
      {channel === "whatsapp" ? (
        <div className="rounded-lg border border-line bg-surface-sunken p-4">
          <p className="max-w-prose whitespace-pre-line rounded-md bg-surface p-3 text-sm text-content shadow-sm" data-testid="whatsapp-preview">
            {whatsappPreview({ title: title.trim() || "Your title", href: href.trim() || null }, origin)}
          </p>
        </div>
      ) : (
        <div className="rounded-lg border border-line p-4" data-testid="in-app-preview">
          <p className="font-semibold text-content">{title.trim() || "Your title"}</p>
          {body.trim() && <p className="mt-1 text-sm text-content-2">{body.trim()}</p>}
          {href.trim() && <p className="mt-2 text-sm text-content-link">Opens {href.trim()}</p>}
        </div>
      )}
    </section>
  );
}
