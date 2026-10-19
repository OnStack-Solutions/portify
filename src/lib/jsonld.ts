import { education, experience, person, skills } from '@/content/profile';
import { getSiteUrl } from './site';

export function homeJsonLd() {
  const url = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${url}/#person`,
        name: person.name,
        url,
        image: `${url}/opengraph-image.jpg`,
        jobTitle: person.titles[1],
        description: person.summary,
        email: `mailto:${person.email}`,
        telephone: person.phoneE164,
        address: { '@type': 'PostalAddress', addressLocality: 'Lahore', addressCountry: 'PK' },
        worksFor: { '@type': 'Organization', name: experience.company },
        alumniOf: { '@type': 'CollegeOrUniversity', name: education.school },
        sameAs: [person.linkedin],
        knowsAbout: [...new Set(skills.flatMap((g) => g.items))].slice(0, 30),
      },
      {
        '@type': 'WebSite',
        '@id': `${url}/#website`,
        url,
        name: `${person.name} Portfolio`,
        inLanguage: 'en',
        publisher: { '@id': `${url}/#person` },
      },
      {
        '@type': 'ProfilePage',
        '@id': `${url}/#profile`,
        url,
        name: `${person.name}, Full Stack Developer and AI Integration Engineer`,
        mainEntity: { '@id': `${url}/#person` },
        isPartOf: { '@id': `${url}/#website` },
      },
    ],
  };
}
