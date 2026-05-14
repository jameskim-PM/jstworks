import { useLang } from '../context/LanguageContext.jsx';
import { useFadeIn } from '../hooks/useFadeIn.js';

const PRIMARY = [
  {
    en: { h: 'Absolute Authenticity', p: '100% original Korean culture and product experience — sourced and curated directly from Korea.' },
    ko: { h: '절대적 진정성',         p: '100% 오리지널 한국 문화와 제품 경험 — 한국에서 직접 소싱하고 큐레이팅합니다.' },
  },
  {
    en: { h: 'Curated Trend-Speed',   p: "The fastest access to Seoul's latest trends — Seoul data, global rollout, ultra-fast cycles." },
    ko: { h: '큐레이티드 트렌드 스피드', p: '서울의 최신 트렌드에 대한 가장 빠른 접근 — 서울 데이터, 글로벌 롤아웃, 초고속 사이클.' },
  },
  {
    en: { h: 'Engaged Digital Narrative', p: 'Immersive storytelling powered by our proprietary IP — turning short-form content into lasting culture.' },
    ko: { h: '몰입형 디지털 내러티브',     p: '자체 IP 기반의 몰입형 스토리텔링 — 숏폼 콘텐츠를 지속적인 문화로 변환합니다.' },
  },
];

const SECONDARY = [
  {
    en: { h: 'Affordable Premium',       p: 'Superior quality and function at a rational premium — the best of Korea, accessible to everyone.' },
    ko: { h: '합리적 프리미엄',          p: '합리적인 프리미엄 가격대의 우수한 품질과 기능 — 최고의 한국을 모두에게.' },
  },
  {
    en: { h: 'Comprehensive Categories', p: 'K-Beauty, Living, Play and more — one destination for every dimension of the Korean lifestyle.' },
    ko: { h: '종합 카테고리',            p: 'K-뷰티, 리빙, 플레이 등 — 한국 라이프스타일의 모든 차원을 위한 원스톱 목적지.' },
  },
  {
    en: { h: 'Cultural Connection',      p: 'Your cultural passport — join a community where global pop culture and Korean identity converge.' },
    ko: { h: '문화적 연결',              p: '당신의 문화 여권 — 글로벌 팝 컬처와 한국 정체성이 만나는 커뮤니티에 합류하세요.' },
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
                'Seoul Vibe<br/><em>Stories Carried from Seoul</em>',
                '서울 바이브<br/><em>서울에서 전해지는 이야기</em>'
              ),
            }}
          />
          <p>
            {t(
              'The values that define K-GANADA™ as the definitive destination for authentic Korean culture in the United States — from Seoul to the world, at the speed of now.',
              'K-GANADA™를 미국에서 진정한 한국 문화의 대표 브랜드로 정의하는 가치 — 서울에서 세계로, 지금 이 순간의 속도로.'
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
          <strong>K-GANADA™</strong>
        </div>
      </div>
    </section>
  );
}
