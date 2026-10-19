import { education, experience, formatMonth, yearsOfExperience } from '@/content/profile';
import { Section } from './Section';

export function Experience() {
  return (
    <Section id="experience" num="03" title="Experience" note={`${yearsOfExperience()}+ years building production software.`}>
      <div className="job__company">
        <h3>{experience.company}</h3>
        <p>{experience.location} · {formatMonth(experience.start)} to present</p>
      </div>
      <p className="job__note">{experience.companyNote}</p>

      <ol className="roles" role="list" aria-label="Roles at Nextbridge Limited">
        {experience.roles.map((r, i) => (
          <li key={r.title} className="role-row">
            <span className="role-row__left">
              {i === 0 && <span className="status__dot" aria-hidden />}
              <span className={`role-row__title${i === 0 ? ' role-row__title--current' : ''}`}>{r.title}</span>
            </span>
            <span className="role-row__date">
              {formatMonth(r.start)} → {r.end ? formatMonth(r.end) : 'Present'}
            </span>
          </li>
        ))}
      </ol>

      <ul className="duties" role="list">
        {experience.highlights.map((h) => <li key={h}><span>{h}</span></li>)}
      </ul>

      <div className="edu">
        <i className="edu__icon" aria-hidden>B</i>
        <div>
          <p className="edu__label">Education</p>
          <h3>{education.degree}</h3>
          <p>{education.school}</p>
        </div>
      </div>
    </Section>
  );
}
