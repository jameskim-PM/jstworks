import { useLang } from '../context/LanguageContext.jsx';

const NAV = [
  { id: 'hero',          en: 'About',    ko: '소개' },
  { id: 'brand-vision',  en: 'Brand',    ko: '브랜드' },
  { id: 'brand-message', en: 'Creative', ko: '크리에이티브' },
  { id: 'market',        en: 'Market',   ko: '시장' },
  { id: 'quote',         en: 'Inquiry',  ko: '문의' },
];

export default function Footer() {
  const { t } = useLang();

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-logo">
              <img src="/JoshuaTreeWorks_FL_White.png" alt="JOSHUA TREE WORKS" />
            </div>
            <p className="footer-desc">
              {t(
                'Bringing the richness of Korean culture to the world through K-GANADA™ — eight verticals, one unified identity.',
                'K-GANADA™를 통해 한국 문화의 풍요로움을 세계에 전달합니다 — 8개의 버티컬, 하나의 통합된 정체성.'
              )}
            </p>
          </div>

          <div>
            <p className="footer-col-label">{t('Navigate', '메뉴')}</p>
            <ul className="footer-links">
              {NAV.map((n) => (
                <li key={n.id}>
                  <button onClick={scrollTo(n.id)}>{t(n.en, n.ko)}</button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="footer-col-label">{t('Korea HQ', '한국 본사')}</p>
            <p
              className="footer-address"
              dangerouslySetInnerHTML={{
                __html:
                  t(
                    'RM 1218, BLDG C,<br/>Munjeong Hyundai Knowledge<br/>Industry Center,<br/>7, Beobwon-ro 11-gil,<br/>Songpa-gu, Seoul, 05836<br/>South Korea',
                    '서울특별시 송파구 법원로 11길 7<br/>문정현대지식산업센터 C동 1218호<br/>(우) 05836<br/>대한민국'
                  ) +
                  `<span class="country-tag">${t(
                    'Seoul, South Korea',
                    '서울, 대한민국'
                  )}</span>`,
              }}
            />
          </div>

          <div>
            <p className="footer-col-label">{t('U.S. Office', '미국 법인')}</p>
            <p
              className="footer-address"
              dangerouslySetInnerHTML={{
                __html:
                  'Joshua Tree Works LTD<br/>1234 Main Street, Suite 200<br/>Irvine, CA 92618<br/>USA<br/>EIN #: 41-5089467' +
                  '<span class="country-tag">Irvine, California</span>',
              }}
            />
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 JOSHUA TREE WORKS. All rights reserved.</p>
          <a href="mailto:info@jstworks.com" className="footer-email">
            info@jstworks.com
          </a>
        </div>
      </div>
    </footer>
  );
}
