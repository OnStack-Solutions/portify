import Link from 'next/link';
import { person } from '@/content/profile';
import { whatsappHref } from '@/lib/site';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <p className="site-footer__brand">
          <b>{person.name}</b>
          <span>{person.titles[1]} · {person.location}</span>
          <span>© {new Date().getFullYear()}</span>
        </p>
        <ul role="list" aria-label="Footer links">
          <li><Link href="/#work">Work</Link></li>
          <li><a href={person.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          <li><a href={whatsappHref()} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
          <li><a href={`mailto:${person.email}`}>Email</a></li>
          <li><a href={person.resumePath} download>Resume</a></li>
        </ul>
      </div>
    </footer>
  );
}
