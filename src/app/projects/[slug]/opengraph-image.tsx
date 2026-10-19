import { getProject, projects } from '@/content/profile';
import { renderProjectOg, ogSize } from '../../og';

export const alt = 'Project case study by Salman Bashir, Full Stack Developer';
export const size = ogSize;
export const contentType = 'image/png';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug)!;
  return renderProjectOg({ name: p.name, tagline: p.tagline, industry: p.industry });
}
