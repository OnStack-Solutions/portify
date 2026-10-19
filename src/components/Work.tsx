import { projects } from '@/content/profile';
import { ProjectGrid } from './ProjectGrid';
import { Section } from './Section';

export function Work() {
  const data = projects.map(({ slug, name, tagline, summary, industry, role, tech, ai, solo }) => ({
    slug, name, tagline, summary, industry, role, tech, ai, solo,
  }));
  return (
    <Section
      id="work"
      eyebrow={`Selected work · ${projects.length} projects`}
      title="Client platforms, built end to end."
      note="Production products I've built at Nextbridge Limited. Each card shows my role and the stack; the case study adds the architecture and what I delivered."
    >
      <ProjectGrid projects={data} />
    </Section>
  );
}
