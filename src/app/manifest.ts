import type { MetadataRoute } from 'next';
import { person } from '@/content/profile';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${person.name}, Full Stack Developer`,
    short_name: person.name,
    description: 'Portfolio of Salman Bashir, Full Stack Developer and AI integration engineer.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f5f4ef',
    theme_color: '#0e1217',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  };
}
