import Image from 'next/image';
import photo from '@/assets/salman-photo.jpg';
import avatar from '@/assets/salman-avatar.jpg';
import { experience, person, yearsOfExperience } from '@/content/profile';
import { whatsappHref } from '@/lib/site';
import { ArrowRight, Download, LinkedIn, MapPin, Mail, WhatsApp } from './icons';

export function Hero() {
  const years = yearsOfExperience();
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container">
        <div className="hero__grid">
          <div>
            <div className="hero__id">
              <span className="avatar hero__id-photo">
                <Image src={avatar} alt="" width={56} height={56} sizes="56px" />
              </span>
              <div>
                <p className="hero__name">{person.name}</p>
                <ul className="titles" role="list" aria-label="Professional titles">
                  {person.titles.map((t, i) => (
                    <li key={t}>{t}{i < person.titles.length - 1 && <span aria-hidden>{'\u00a0·'}</span>}</li>
                  ))}
                </ul>
              </div>
            </div>

            <h1 id="hero-title" className="hero__title">{person.headline.replace('AI-powered', 'AI\u2011powered')}.</h1>

            <div className="hero__intro">
              {person.intro.map((p) => <p key={p}>{p}</p>)}
            </div>

            <div className="hero__actions">
              <a className="btn btn--primary" href="#work">View my work <ArrowRight /></a>
              <a className="btn btn--secondary" href={whatsappHref()} target="_blank" rel="noopener noreferrer">
                <WhatsApp className="wa-icon" /> WhatsApp
              </a>
              <a className="btn btn--secondary" href={person.resumePath} download>
                <Download /> Resume (PDF)
              </a>
            </div>

            <ul className="hero__contact" role="list" aria-label="Contact details">
              <li><a href={`mailto:${person.email}`}><Mail /> {person.email}</a></li>
              <li><a href={person.linkedin} target="_blank" rel="noopener noreferrer"><LinkedIn /> LinkedIn</a></li>
              <li><span><MapPin /> {person.location}</span></li>
            </ul>
          </div>

          <figure className="hero__photo">
            <Image
              src={photo}
              alt="Salman Bashir, Full Stack Developer"
              priority
              placeholder="blur"
              sizes="300px"
            />
          </figure>
        </div>

        <dl className="facts">
          <div className="fact"><dt>Experience</dt><dd>{years}+ years</dd></div>
          <div className="fact"><dt>Current role</dt><dd>{experience.roles[0].title}</dd></div>
          <div className="fact"><dt>Focus</dt><dd>Full-stack and AI integration</dd></div>
          <div className="fact"><dt>Based in</dt><dd>{person.location}</dd></div>
        </dl>
      </div>
    </section>
  );
}
