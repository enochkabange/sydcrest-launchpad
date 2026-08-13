/**
 * LessonCard — "continue where you left off," the first thing a learner
 * sees on the dashboard. Composed entirely from foundation primitives
 * (Card, Badge, Progress, Button, Icon) plus one new move: a 3px brand
 * gradient strip standing in for a thumbnail, since lessons have no
 * artwork. Reuses `--gradient-launch` — never a bespoke gradient per card,
 * or a dashboard of these turns into a colour showcase instead of a list.
 */
import Card from "../ui/Card.jsx";
import Badge from "../ui/Badge.jsx";
import Progress from "../ui/Progress.jsx";
import Button from "../ui/Button.jsx";
import Icon from "../ui/Icon.jsx";

export default function LessonCard({
  week,
  title,
  summary,
  percent = 0,
  onContinue,
  className = "",
  ...props
}) {
  return (
    <Card
      className={["overflow-hidden p-0", className].filter(Boolean).join(" ")}
      {...props}
    >
      <div className="h-[3px] bg-[image:var(--gradient-launch)]" />

      <div className="flex flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-3">
          <Badge tone="info" icon={<Icon name="curriculum" size="sm" />}>
            Week {week}
          </Badge>
          {percent >= 100 && <Badge tone="success">Complete</Badge>}
        </div>

        <div>
          <h3 className="text-lg font-bold text-content leading-snug">{title}</h3>
          {summary && (
            <p className="mt-1 text-sm text-content-2 leading-normal">{summary}</p>
          )}
        </div>

        <Progress
          value={percent}
          state={percent >= 100 ? "complete" : "active"}
          size="sm"
        />

        <Button
          variant="accent"
          size="sm"
          icon="start"
          className="mt-1 self-start"
          onClick={onContinue}
        >
          {percent > 0 && percent < 100 ? "Continue lesson" : percent >= 100 ? "Review" : "Start lesson"}
        </Button>
      </div>
    </Card>
  );
}
