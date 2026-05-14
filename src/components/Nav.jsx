import { useEffect, useState } from 'react';
import { useLang } from '../context/LanguageContext.jsx';

const LINKS = [
  { id: 'hero',          en: 'About',    ko: '소개' },
  { id: 'brand-vision',  en: 'Brand',    ko: '브랜드' },
  { id: 'brand-message', en: 'Creative', ko: '크리에이티브' },
  { id: 'market',        en: 'Market',   ko: '시장' },
  { id: 'quote',         en: 'Inquiry',  ko: '문의' },
];

export default function Nav() {
  const { lang, toggle, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <a href="#hero" className="nav-logo" onClick={scrollTo('hero')}>
          <img src="/JoshuaTreeWorks_Logo.png" alt="Joshua Tree Works" />
        </a>

        <ul className="nav-links">
          {LINKS.map((l) => (
            <li key={l.id}>
              <a href={`#${l.id}`} onClick={scrollTo(l.id)}>
                {t(l.en, l.ko)}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-right">
          <button className="lang-toggle" onClick={toggle}>
            {lang === 'ko' ? 'English ›' : 'Korean ›'}
          </button>
          <button
            className={`hamburger${menuOpen ? ' active' : ''}`}
            aria-label={t('Open menu', '메뉴 열기')}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <div className={`mobile-menu${menuOpen ? ' active' : ''}`}>
        {LINKS.map((l) => (
          <a key={l.id} href={`#${l.id}`} onClick={scrollTo(l.id)}>
            {t(l.en, l.ko)}
          </a>
        ))}
      </div>
    </>
  );
}
