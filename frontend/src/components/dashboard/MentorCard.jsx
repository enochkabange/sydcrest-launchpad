/**
 * MentorCard — browsable mentor card for the Mentors view.
 *
 * Pattern borrowed from marketplace coaching sites (Leland, etc.): a
 * credential headline instead of a bio dump, a star rating up front, and
 * proof of outcomes rather than a plain "book me" button. The adaptation
 * for a pre-launch pilot with no track record yet: outcome proof is
 * "N mentees mentored" (honest, grows from zero) rather than fabricated
 * company logos, and a mentor with zero sessions gets a "New mentor"
 * badge instead of a rating that would just read "0.0".
 */
import Card from "../ui/Card.jsx";
import Avatar from "../ui/Avatar.jsx";
import Badge from "../ui/Badge.jsx";
import Button from "../ui/Button.jsx";
import Icon from "../ui/Icon.jsx";

export default function MentorCard({
  name,
  photo,
  headline,
  specialties = [],
  rating,
  reviewCount = 0,
  menteesGuided = 0,
  full = false,
  onBook,
  className = "",
  ...props
}) {
  const isNew = reviewCount === 0;

  return (
    <Card interactive className={["p-5", className].filter(Boolean).join(" ")} {...props}>
      <div className="flex items-start gap-3">
        <Avatar name={name} src={photo} size="lg" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-content truncate">{name}</h3>
            {isNew && <Badge tone="accent">New mentor</Badge>}
          </div>
          <p className="text-sm text-content-2 leading-snug mt-0.5">{headline}</p>
        </div>
      </div>

      {!isNew && (
        <div className="mt-3 flex items-center gap-1.5">
          <Icon name="rating" size="sm" className="text-orange-500" fill="currentColor" strokeWidth={0} />
          <span className="text-sm font-bold text-content tabular-nums">{rating.toFixed(1)}</span>
          <span className="text-sm text-content-3">({reviewCount})</span>
        </div>
      )}

      {specialties.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {specialties.map((s) => (
            <Badge key={s} tone="neutral">{s}</Badge>
          ))}
        </div>
      )}

      <div className="mt-4 flex items-center justify-between gap-3 pt-3 border-t border-line">
        <span className="inline-flex items-center gap-1.5 text-sm text-content-2">
          <Icon name="cohort" size="sm" />
          {menteesGuided} mentee{menteesGuided === 1 ? "" : "s"} mentored
        </span>
        {full ? (
          <Badge tone="neutral">Fully booked</Badge>
        ) : (
          <Button variant="accent" size="sm" onClick={onBook}>Book intro call</Button>
        )}
      </div>
    </Card>
  );
}
