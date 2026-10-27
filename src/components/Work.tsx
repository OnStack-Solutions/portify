import { visibleProjects } from '@/content/profile';
import { showcases } from '@/content/showcase';
import { ProjectGrid } from './ProjectGrid';
import { Section } from './Section';

export function Work() {
  const data = visibleProjects.map(({ slug, name, tagline, summary, industry, role, tech, ai, solo }) => ({
    slug, name, tagline, summary, industry, role, tech, ai, solo,
    cover: showcases[slug]?.main?.src,
    coverPhones: showcases[slug]?.phones?.map((s) => s.src),
    brand: showcases[slug]?.brand,
  }))
    // Projects with screenshots lead the grid; the order is otherwise unchanged.
    .sort((a, b) => Number(!(a.cover || a.coverPhones)) - Number(!(b.cover || b.coverPhones)));
  return (
    <Section
      id="work"
      eyebrow={`Selected work · ${visibleProjects.length} projects`}
      title="Client platforms, built end to end."
      note="Production products I've built. Each card shows my role and the stack; the case study adds the architecture and what I delivered."
    >
      <ProjectGrid projects={data} />
    </Section>
  );
}
