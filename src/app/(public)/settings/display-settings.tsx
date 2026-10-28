"use client";

import type { ReactNode } from "react";
import { DEFAULT_PREFS, type DisplayPrefs } from "@/lib/display/prefs";
import { updateDisplayPrefs, useDisplayPrefs } from "@/lib/display/store";
import { Button } from "@/components/ui/button";

type Option<T> = { value: T; label: string; hint?: string };

const THEME_OPTIONS: Option<DisplayPrefs["theme"]>[] = [
  { value: "system", label: "Follow my device", hint: "Light or dark, the same as your phone or computer." },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark", hint: "Easier on the eyes at night and can save battery." },
];

const SIZE_OPTIONS: Option<DisplayPrefs["textSize"]>[] = [
  { value: 100, label: "100%", hint: "Standard" },
  { value: 112, label: "112%" },
  { value: 125, label: "125%" },
  { value: 150, label: "150%", hint: "Largest" },
];

const FONT_OPTIONS: Option<DisplayPrefs["font"]>[] = [
  { value: "brand", label: "SydCrest font" },
  { value: "system", label: "Your device's own font", hint: "Plainer letters, and nothing extra to download." },
];

const RADIO = "mt-0.5 size-5 shrink-0 accent-line-selected";
const CHOICE =
  "flex min-h-11 cursor-pointer items-start gap-3 rounded-md border border-line-strong bg-surface px-3 py-2.5 text-content has-checked:border-line-selected has-checked:bg-info-bg";

function Group({ legend, help, children }: { legend: string; help?: string; children: ReactNode }) {
  return (
    <fieldset className="flex flex-col gap-3 rounded-lg border border-line bg-surface p-4 md:p-6">
      <legend className="float-left mb-1 w-full text-h3 font-bold text-content">{legend}</legend>
      {help && <p className="clear-left text-sm text-content-2">{help}</p>}
      <div className="clear-left flex flex-col gap-2">{children}</div>
    </fieldset>
  );
}

function Radios<T extends string | number>({
  name,
  options,
  value,
  onChange,
  columns = false,
}: {
  name: string;
  options: Option<T>[];
  value: T;
  onChange: (v: T) => void;
  columns?: boolean;
}) {
  return (
    <div className={columns ? "grid grid-cols-[repeat(auto-fit,minmax(9rem,1fr))] gap-2" : "flex flex-col gap-2"}>
      {options.map((o) => (
        <label key={String(o.value)} className={CHOICE}>
          <input
            type="radio"
            name={name}
            value={String(o.value)}
            checked={value === o.value}
            onChange={() => onChange(o.value)}
            className={RADIO}
          />
          <span className="flex flex-col">
            <span className="font-semibold">{o.label}</span>
            {o.hint && <span className="text-sm text-content-2">{o.hint}</span>}
          </span>
        </label>
      ))}
    </div>
  );
}

function Toggle({
  id,
  checked,
  onChange,
  label,
  hint,
}: {
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  hint: string;
}) {
  return (
    <label htmlFor={id} className={CHOICE}>
      <input id={id} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className={RADIO} />
      <span className="flex flex-col">
        <span className="font-semibold">{label}</span>
        <span className="text-sm text-content-2">{hint}</span>
      </span>
    </label>
  );
}

/**
 * Every display choice, applied the moment it changes and saved on this
 * device (and the profile when signed in; see DisplayPrefsSync).
 */
export function DisplaySettings() {
  const p = useDisplayPrefs();
  const isDefault = JSON.stringify({ ...p, updatedAt: 0 }) === JSON.stringify(DEFAULT_PREFS);
  return (
    <div className="flex flex-col gap-6" data-testid="display-settings">
      <Group legend="Theme">
        <Radios name="theme" options={THEME_OPTIONS} value={p.theme} onChange={(theme) => updateDisplayPrefs({ theme })} />
      </Group>

      <Group legend="Text size" help="Makes all text and spacing bigger. Pages rearrange to fit.">
        <Radios
          name="text-size"
          options={SIZE_OPTIONS}
          value={p.textSize}
          onChange={(textSize) => updateDisplayPrefs({ textSize })}
          columns
        />
      </Group>

      <Group legend="Reading">
        <Toggle
          id="contrast"
          checked={p.contrast === "more"}
          onChange={(on) => updateDisplayPrefs({ contrast: on ? "more" : "normal" })}
          label="Higher contrast"
          hint="Darker text and stronger borders in light theme, brighter in dark."
        />
        <Toggle
          id="underline-links"
          checked={p.underlineLinks}
          onChange={(underlineLinks) => updateDisplayPrefs({ underlineLinks })}
          label="Underline links"
          hint="Every link is underlined, so you never need colour to spot one."
        />
        <Toggle
          id="spacing"
          checked={p.spacing === "wide"}
          onChange={(on) => updateDisplayPrefs({ spacing: on ? "wide" : "normal" })}
          label="Easier reading spacing"
          hint="More space between lines, letters and words."
        />
      </Group>

      <Group legend="Font">
        <Radios name="font" options={FONT_OPTIONS} value={p.font} onChange={(font) => updateDisplayPrefs({ font })} />
      </Group>

      <Group legend="Motion">
        <Toggle
          id="reduce-motion"
          checked={p.motion === "reduce"}
          onChange={(on) => updateDisplayPrefs({ motion: on ? "reduce" : "system" })}
          label="Reduce motion"
          hint="Turns off animations here even if your device allows them. When this is off, we follow your device's setting."
        />
      </Group>

      <div>
        <Button
          variant="secondary"
          disabled={isDefault}
          onClick={() => updateDisplayPrefs({ ...DEFAULT_PREFS })}
        >
          Reset to standard settings
        </Button>
      </div>
    </div>
  );
}
