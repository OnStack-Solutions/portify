import { education, experience, formatMonth, yearsOfExperience } from '@/content/profile';
import { Section } from './Section';

export function Experience() {
  return (
    <Section id="experience" title="Experience" note={`${yearsOfExperience()}+ years building production software.`}>
      <div className="job__head">
        <h3>{experience.company}</h3>
        <p>{experience.location} · {formatMonth(experience.start)} to present</p>
      </div>
      <p className="job__note">{experience.companyNote}</p>
      <ol className="roles" role="list" aria-label="Roles at Nextbridge Limited">
        {experience.roles.map((r, i) => (
          <li key={r.title} data-current={i === 0}>
            <span>{i === 0 && <span className="status__dot" aria-hidden />}{r.title}</span>
            <span>{formatMonth(r.start)} to {r.end ? formatMonth(r.end) : 'present'}</span>
          </li>
        ))}
      </ol>
      <ul className="duties">
        {experience.highlights.map((h) => <li key={h}>{h}</li>)}
      </ul>
      <div className="edu">
        <h3>Education</h3>
        <p>{education.degree}</p>
        <p>{education.school}</p>
      </div>
    </Section>
  );
}
