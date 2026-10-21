import { experience, experienceTextCapitalized, person, services } from '@/content/profile';
import { Section } from './Section';

export function About() {
  return (
    <Section
      id="about"
      tone="tint"
      eyebrow="About"
      title={`${experienceTextCapitalized()} of shipping production software.`}
    >
      <div className="about">
        <div className="about__text">
          {person.intro.map((p) => <p key={p}>{p}</p>)}
        </div>
        <div className="about__aside">
          <div className="about__block">
            <h3>Currently</h3>
            <p>{experience.roles[0].title} at {experience.company}, {experience.location}</p>
          </div>
          <div className="about__block">
            <h3>What I do</h3>
            <ol className="about__list" role="list">
              {services.map((s, i) => (
                <li key={s.title}><span>{String(i + 1).padStart(2, '0')}</span>{s.title}</li>
              ))}
            </ol>
          </div>
          <div className="about__block">
            <h3>Industries</h3>
            <ul className="chips" role="list">
              {person.industries.map((s) => <li key={s} className="chip">{s}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
