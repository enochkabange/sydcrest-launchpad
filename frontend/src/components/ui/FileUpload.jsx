/**
 * FileUpload — project submission.
 *
 * This is the control Phase B's exit test runs through: a learner submits work,
 * a mentor reviews it. Without it the core loop has no exit.
 *
 * It handles selection and validation only. Actual transfer belongs to the
 * caller, because retry-on-flaky-connection is a network concern and the
 * connection here is mobile data — the component should not pretend to own it.
 *
 * Drag-and-drop is an enhancement, never the only route: the majority device
 * is a phone, where dragging does not exist. The whole control is a label
 * wrapping a real file input, so tap and keyboard both work by default.
 */
import { useId, useRef, useState } from "react";
import Icon from "./Icon.jsx";

function readable(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export default function FileUpload({
  label = "Attach your work",
  hint,
  accept,
  multiple = false,
  maxSizeMB = 10,
  value = [],
  onChange,
  disabled = false,
  className = "",
}) {
  const inputId = useId();
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState(null);

  const accept_ = (files) => {
    const list = Array.from(files);
    const tooBig = list.find((f) => f.size > maxSizeMB * 1024 * 1024);
    if (tooBig) {
      /* Name the file and the limit. "Upload failed" tells a learner nothing
         they can act on. */
      setError(`${tooBig.name} is ${readable(tooBig.size)} — the limit is ${maxSizeMB} MB. Compress it and try again.`);
      return;
    }
    setError(null);
    onChange?.(multiple ? [...value, ...list] : list.slice(0, 1));
  };

  const remove = (i) => onChange?.(value.filter((_, n) => n !== i));

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={inputId} className="text-sm font-semibold text-content">
        {label}
      </label>

      <label
        htmlFor={inputId}
        onDragOver={(e) => { e.preventDefault(); if (!disabled) setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          if (!disabled) accept_(e.dataTransfer.files);
        }}
        className={[
          "flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed px-5 py-8 text-center transition-colors duration-150",
          disabled
            ? "cursor-not-allowed border-line bg-surface-sunken opacity-60"
            : dragging
              ? "border-blue-500 bg-blue-50"
              : "border-line-strong hover:border-blue-500 hover:bg-surface-sunken",
        ].join(" ")}
      >
        <Icon name="upload" size="lg" className="text-content-3" />
        <span className="text-sm font-semibold text-content">
          Tap to choose {multiple ? "files" : "a file"}
        </span>
        <span className="text-xs text-content-3">
          or drag {multiple ? "them" : "it"} here · up to {maxSizeMB} MB
        </span>
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          className="sr-only"
          onChange={(e) => { accept_(e.target.files); e.target.value = ""; }}
        />
      </label>

      {hint && !error && <p className="text-xs text-content-2">{hint}</p>}
      {error && (
        <p role="alert" className="text-xs font-medium text-danger-fg">{error}</p>
      )}

      {value.length > 0 && (
        <ul className="flex flex-col gap-2">
          {value.map((f, i) => (
            <li
              key={`${f.name}-${i}`}
              className="flex items-center gap-3 rounded-md border border-line bg-surface px-3 py-2"
            >
              <Icon name="attachment" size="sm" className="text-content-3" />
              <span className="min-w-0 flex-1 truncate text-sm text-content">{f.name}</span>
              <span className="shrink-0 text-xs tabular-nums text-content-3">{readable(f.size)}</span>
              <button
                type="button"
                onClick={() => remove(i)}
                aria-label={`Remove ${f.name}`}
                className="flex size-7 shrink-0 items-center justify-center rounded-md text-content-3 transition-colors hover:bg-surface-sunken hover:text-danger-fg"
              >
                <Icon name="close" size="sm" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
