/**
 * Holds the topic panel slot beside the roadmap. Opening a topic from the
 * roadmap is a soft navigation that `@panel/(.)[node]` intercepts: the topic
 * shows in a panel over the roadmap while the URL is the topic page. A reload
 * or a shared link renders the full topic page instead, so SEO is unchanged.
 */
export default function RoadmapLayout({ children, panel }: LayoutProps<"/roadmaps/[slug]">) {
  return (
    <>
      {children}
      {panel}
    </>
  );
}
