/**
 * StatTile — a single dashboard metric (streak, XP, week, certificates).
 *
 * Built from the foundation, not a new visual language: Card for the
 * container, Icon for the glyph, the same shadow/lift the accent Button
 * uses on hover. The one new move is the icon well's gradient — reusing
 * `--gradient-launch` / `--gradient-depth` from tokens.css rather than
 * inventing a third gradient, so a dashboard full of tiles still reads as
 * one brand instead of a palette explosion.
 */
import Icon from "../ui/Icon.jsx";
import Card from "../ui/Card.jsx";

const wells = {
  launch: "bg-[image:var(--gradient-launch)] text-content",   /* yellow → orange: streaks, momentum */
  depth:  "bg-[image:var(--gradient-depth)] text-white",      /* blue → ink: cumulative, serious */
  blue:   "bg-blue-50 text-blue-700",
  success:"bg-success-bg text-success-fg",
};

export default function StatTile({
  icon,
  value,
  label,
  well = "blue",
  trend,
  className = "",
  ...props
}) {
  return (
    <Card
      className={[
        "transition-[box-shadow,transform] duration-150 hover:shadow-lg hover:-translate-y-0.5",
        className,
      ].filter(Boolean).join(" ")}
      {...props}
    >
      <div className="flex items-start gap-4 p-5">
        <span
          className={[
            "flex size-11 shrink-0 items-center justify-center rounded-lg",
            wells[well] ?? wells.blue,
          ].join(" ")}
        >
          <Icon name={icon} size="md" />
        </span>

        <div className="flex flex-col gap-0.5 min-w-0">
          <span className="text-2xl font-black tabular-nums text-content leading-none">
            {value}
          </span>
          <span className="text-sm font-medium text-content-2 truncate">{label}</span>
          {trend && (
            <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-success-fg">
              <Icon name="progress" size="sm" />
              {trend}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}
