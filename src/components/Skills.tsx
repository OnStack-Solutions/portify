import { experience, person, skills } from '@/content/profile';
import { Section } from './Section';

const PURPOSE: Record<string, string> = {
  Frontend: 'Web interfaces and dashboards in React and Next.js.',
  Backend: 'APIs and services, mainly Node.js with Express.js or NestJS.',
  'AI and LLMs': 'LLM features in production: natural-language-to-SQL, RAG and AI assistants.',
  Data: 'Relational, document and vector storage behind those apps.',
  'Hospitality systems': 'POS and PMS integrations for hotels and restaurants.',
  Integrations: 'Third-party APIs for accounting, storage, search, messaging and analytics.',
  Languages: 'Languages I write production code in.',
  Tools: 'Version control, project tracking and API tooling.',
};

// "Main" = skills Salman names in his own summary and experience text in profile.ts.
const text = [person.summary, ...person.intro, ...experience.highlights].join(' ').toLowerCase();
const base = (s: string) => s.replace(/\s*\(.*\)$/, '').replace(/ API$/, '').toLowerCase();
const isMain = (item: string) => {
  const b = base(item);
  const last = b.split(' ').pop()!;
  return text.includes(b) || (/\d/.test(last) && text.includes(last));
};

export function Skills() {
  return (
    <Section
      id="skills"
      tone="tint"
      eyebrow="Skills"
      title="What I build with, by area."
      note={<>Dark tags are my <strong>main stack</strong>, the core of the work described above. Outlined tags are other tools I have worked with.</>}
    >
      <dl className="skill-rows">
        {skills.map((g, i) => (
          <div className="skill-row reveal" key={g.name}>
            <dt>
              <span className="skill-row__n">{String(i + 1).padStart(2, '0')}</span>
              <span className="skill-row__name">{g.name}</span>
              <span className="skill-row__purpose">{PURPOSE[g.name]}</span>
            </dt>
            <dd>
              <ul className="chips" role="list">
                {[...g.items].sort((a, b) => Number(isMain(b)) - Number(isMain(a))).map((item) => (
                  <li key={item} className={`chip${isMain(item) ? ' chip--main' : ''}`}>{item}</li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
