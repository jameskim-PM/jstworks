import { useLang } from '../context/LanguageContext.jsx';

export default function Hero() {
  const { t } = useLang();

  return (
    <section id="hero">
      <div className="hero-content">
        <p className="hero-eyebrow">JOSHUA TREE WORKS · K-GANADA™</p>
        <h1
          className="hero-title-ko"
          dangerouslySetInnerHTML={{
            __html: t('Korean Culture<br/>to the World', '한국의 문화를<br/>세계로'),
          }}
        />
        <p className="hero-subtitle">
          {t('JOSHUA TREE WORKS —', 'JOSHUA TREE WORKS는')}
          <br />
          <em>
            {t(
              "Where Korean soul meets shelves worldwide — curating culture, not just products.",
              '한국의 영혼이 세계의 선반과 만나는 곳 — 제품이 아닌 문화를 큐레이팅합니다.'
            )}
          </em>
        </p>
      </div>

      <div className="scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  );
}
