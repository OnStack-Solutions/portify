import type { MetadataRoute } from 'next';
import { visibleProjects } from '@/content/profile';
import { getSiteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const url = getSiteUrl();
  const now = new Date();
  return [
    { url, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    ...visibleProjects.map((p) => ({
      url: `${url}/projects/${p.slug}`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: p.featured ? 0.8 : 0.6,
    })),
  ];
}
