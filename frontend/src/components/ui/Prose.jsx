/**
 * Prose — the wrapper for lesson body content.
 *
 * All the typography lives in the `.prose` block in tokens.css rather than in
 * utility classes, because lesson HTML arrives from the database and cannot
 * carry class names on every element. One selector scope, one place to change
 * how reading feels.
 *
 * Measure is capped near 68 characters. Code blocks, callouts and tables opt
 * out with `.full-bleed`.
 */

export default function Prose({ as: Tag = "div", className = "", children, ...props }) {
  return (
    <Tag className={`prose ${className}`} {...props}>
      {children}
    </Tag>
  );
}

/**
 * For lesson bodies stored as HTML in `learning_weeks`.
 *
 * SAFETY: this renders trusted, author-generated content only. It must be
 * sanitised server-side on save. Never point this at learner submissions,
 * community posts, or anything else a user can type.
 */
export function ProseHTML({ html, className = "", ...props }) {
  return (
    <div
      className={`prose ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
      {...props}
    />
  );
}
