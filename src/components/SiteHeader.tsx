import Image from 'next/image';
import Link from 'next/link';
import avatar from '@/assets/salman-avatar.jpg';
import { person } from '@/content/profile';
import { MobileNav } from './MobileNav';
import { LinkedIn, Mail } from './icons';

export const NAV = [
  { href: '/#work', label: 'Work' },
  { href: '/#ai', label: 'AI' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#services', label: 'Services' },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link href="/" className="brand" aria-label={`${person.name}, home`}>
          <span className="avatar"><Image src={avatar} alt="" width={30} height={30} sizes="30px" /></span>
          {person.name}
        </Link>
        <MobileNav>
          {NAV.map((item) => (
            <Link key={item.href} className="nav__link" href={item.href}>{item.label}</Link>
          ))}
          <span className="nav__actions">
            <a className="icon-link" href={person.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile (opens in a new tab)" title="LinkedIn">
              <LinkedIn />
            </a>
            <a className="icon-link" href={`mailto:${person.email}`} aria-label={`Email ${person.email}`} title={person.email}>
              <Mail />
            </a>
            <a className="btn btn--secondary btn--small" href={person.resumePath} download>Resume</a>
            <Link className="btn btn--primary btn--small" href="/#contact">Contact</Link>
          </span>
        </MobileNav>
      </div>
    </header>
  );
}
