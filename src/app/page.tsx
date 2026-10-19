import { Hero } from '@/components/Hero';
import { Work } from '@/components/Work';
import { About } from '@/components/About';
import { AiWork } from '@/components/AiWork';
import { Experience } from '@/components/Experience';
import { Skills } from '@/components/Skills';
import { Services } from '@/components/Services';
import { Contact } from '@/components/Contact';
import { JsonLd } from '@/components/JsonLd';
import { homeJsonLd } from '@/lib/jsonld';

// Static page, re-generated daily so "years of experience" stays current.
export const revalidate = 86400;

export default function HomePage() {
  return (
    <>
      <JsonLd data={homeJsonLd()} />
      <Hero />
      <Work />
      <About />
      <AiWork />
      <Experience />
      <Skills />
      <Services />
      <Contact />
    </>
  );
}
