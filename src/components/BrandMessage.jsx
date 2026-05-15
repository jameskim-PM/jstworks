import { useLang } from '../context/LanguageContext.jsx';
import { useFadeIn } from '../hooks/useFadeIn.js';

const PRIMARY = [
  {
    en: { h: 'Absolute Authenticity', p: '100% original Korean culture and product experience — sourced and curated directly from Korea.' },
    ko: { h: '절대적 진정성',         p: '100% 오리지널 한국 문화와 제품 경험 — 한국에서 직접 소싱하고 큐레이팅합니다.' },
  },
  {
    en: { h: 'Trend Curation Speed',  p: "The fastest access to Seoul's latest trends — Seoul data, global rollout, lightning-fast cycles." },
    ko: { h: '트렌드 큐레이션 스피드', p: '서울의 최신 트렌드에 대한 가장 빠른 접근 — 서울 데이터, 글로벌 롤아웃, 초고속 사이클.' },
  },
  {
    en: { h: 'Immersive Digital Narrative', p: 'Immersive storytelling powered by our proprietary IP — transforming short-form content into lasting culture.' },
    ko: { h: '몰입형 디지털 내러티브',     p: '자체 IP 기반의 몰입형 스토리텔링 — 숏폼 콘텐츠를 지속적인 문화로 전환합니다.' },
  },
];

const SECONDARY = [
  {
    en: { h: 'Affordable Premium',       p: 'Superior quality and function at a rational premium.' },
    ko: { h: '합리적 프리미엄',          p: '합리적인 프리미엄 가격대의 우수한 품질과 기능.' },
  },
  {
    en: { h: 'Comprehensive Categories', p: 'Experience K-Beauty, Living, Play, and more — all in one place.' },
    ko: { h: '종합 카테고리',            p: 'K-뷰티, 리빙, 플레이 등을 한곳에서 경험하실 수 있습니다.' },
  },
  {
    en: { h: 'Cultural Connection',      p: 'Your cultural pass to the trendiest global pop culture community.' },
    ko: { h: '문화적 연결',              p: "트렌디한 글로벌 팝컬쳐 커뮤니티에 동참하는 '문화적 입장권'" },
  },
];

function MsgCard({ data, secondary = false, index }) {
  const { t } = useLang();
  const ref = useFadeIn(index * 0.06);
  return (
    <div className={`msg-card${secondary ? ' secondary' : ''}`} ref={ref}>
      <h4>{t(data.en.h, data.ko.h)}</h4>
      <p>{t(data.en.p, data.ko.p)}</p>
    </div>
  );
}

export default function BrandMessage() {
  const { t } = useLang();
  return (
    <section id="brand-message">
      <div className="container">
        <span className="sec-label">{t('Creative', '크리에이티브')}</span>

        <div className="msg-header">
          <h2
            dangerouslySetInnerHTML={{
              __html: t(
                'Seoul Vibe<br/><em>Stories from Seoul</em>',
                '서울 바이브<br/><em>서울에서 전해지는 이야기</em>'
              ),
            }}
          />
          <p>
            {t(
              'The values that define K-GANADA™ as the authentic Korean culture brand in the US.',
              'K-GANADA™를 미국에서 진정한 한국 문화의 대표 브랜드로 정의하는 가치.'
            )}
          </p>
        </div>

        <p className="msg-group-label">{t('Primary Benefits', '주요 혜택')}</p>
        <div className="msg-grid">
          {PRIMARY.map((c, i) => (
            <MsgCard key={c.en.h} data={c} index={i} />
          ))}
        </div>

        <p className="msg-group-label">{t('Secondary Benefits', '부가 혜택')}</p>
        <div className="msg-grid">
          {SECONDARY.map((c, i) => (
            <MsgCard key={c.en.h} data={c} secondary index={i + PRIMARY.length} />
          ))}
        </div>

        <div className="core-value-bar">
          <small>Core Value</small>
          <img
            className="core-value-logo"
            src="/icons/K-GANADA-Logo_final.png"
            alt="K-GANADA™"
          />
        </div>
      </div>
    </section>
  );
}
