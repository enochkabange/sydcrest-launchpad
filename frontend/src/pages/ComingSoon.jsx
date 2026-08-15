/**
 * Placeholder for nav destinations whose backend is still a 501 scaffold
 * (marketplace.js, projects.js). Says so plainly rather than rendering
 * sample mentors/projects that don't exist — see Showcase.jsx/Kit for
 * what those will look like once they're real.
 */
import { Page, EmptyState } from "../components/ui/index.js";

export default function ComingSoon({ title, icon, description }) {
  return (
    <Page title={title}>
      <EmptyState icon={icon} title="Not built yet" description={description} />
    </Page>
  );
}
