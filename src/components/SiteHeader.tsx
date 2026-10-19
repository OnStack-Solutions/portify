import Link from 'next/link';
import { person } from '@/content/profile';
import { MobileNav } from './MobileNav';
import { Download } from './icons';

export const NAV = [
  { href: '/#work', label: 'Work' },
  { href: '/#about', label: 'About' },
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
          <span className="brand__mark" aria-hidden>SB</span>
          <span className="brand__text">
            <span className="brand__name">{person.name}</span>
            <span className="brand__role">{person.titles[1]}</span>
          </span>
        </Link>
        <MobileNav>
          <div className="nav__links">
            {NAV.map((item) => (
              <Link key={item.href} className="nav__link" href={item.href}>{item.label}</Link>
            ))}
          </div>
          <div className="nav__actions">
            <a className="nav__resume" href={person.resumePath} download>
              <Download /> Résumé
            </a>
            <Link className="btn btn--accent btn--small" href="/#contact">Get in touch</Link>
          </div>
        </MobileNav>
      </div>
    </header>
  );
}
