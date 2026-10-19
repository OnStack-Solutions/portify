import Image from 'next/image';
import photo from '@/assets/salman-photo.jpg';
import { experience, person, yearsOfExperience } from '@/content/profile';
import { whatsappHref } from '@/lib/site';
import { ArrowRight, Download, LinkedIn, MapPin, Mail, WhatsApp } from './icons';

export function Hero() {
  const years = yearsOfExperience();
  return (
    <section className="hero" aria-labelledby="hero-name">
      <div className="container">
        <div className="hero__grid">

          {/* Content column */}
          <div className="hero__content">
            <p className="hero__hi" aria-hidden>Hi, I&apos;m</p>

            <h1 id="hero-name" className="hero__name">{person.name}.</h1>

            <p className="hero__role">
              {person.titles.map((t, i) => (
                <span key={t}>
                  {t}
                  {i < person.titles.length - 1 && (
                    <span className="hero__sep" aria-hidden> · </span>
                  )}
                </span>
              ))}
            </p>

            <div className="hero__bio">
              {person.intro.map((p) => <p key={p}>{p}</p>)}
            </div>

            <div className="hero__actions">
              <a className="btn btn--primary" href="#work">
                View my work <ArrowRight />
              </a>
              <a
                className="btn btn--outline"
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsApp className="wa-icon" /> WhatsApp
              </a>
              <a className="btn btn--ghost" href={person.resumePath} download>
                <Download /> Resume
              </a>
            </div>

            <ul className="hero__links" role="list" aria-label="Contact details">
              <li>
                <a href={`mailto:${person.email}`}><Mail /> {person.email}</a>
              </li>
              <li>
                <a href={person.linkedin} target="_blank" rel="noopener noreferrer">
                  <LinkedIn /> LinkedIn
                </a>
              </li>
              <li>
                <span><MapPin /> {person.location}</span>
              </li>
            </ul>
          </div>

          {/* Photo column */}
          <figure className="hero__photo">
            <Image
              src={photo}
              alt={`${person.name}, Full Stack Developer`}
              priority
              placeholder="blur"
              sizes="(max-width: 900px) 0px, 360px"
            />
          </figure>
        </div>

        {/* Stats bar */}
        <dl className="facts">
          <div className="fact">
            <dt>Experience</dt>
            <dd>{years}+ years</dd>
          </div>
          <div className="fact">
            <dt>Current role</dt>
            <dd>{experience.roles[0].title}</dd>
          </div>
          <div className="fact">
            <dt>Focus</dt>
            <dd>Full-stack &amp; AI</dd>
          </div>
          <div className="fact">
            <dt>Based in</dt>
            <dd>{person.location}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
