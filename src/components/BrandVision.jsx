import { useLang } from '../context/LanguageContext.jsx';
import { useFadeIn } from '../hooks/useFadeIn.js';

const CARDS = [
  { num: 'Dis. 01', icon: '✦', title: 'K-Beauty',  tag: 'Beauty',        en: 'Innovative skincare & aesthetic cosmetics inspired by K-trends.',  ko: 'K-트렌드에서 영감을 받은 혁신적인 스킨케어 및 미학적 화장품.' },
  { num: 'Dis. 02', icon: '⌂', title: 'K-Living',  tag: 'Living',        en: 'Minimalist home goods and aesthetic lifestyle decor.',              ko: '미니멀리스트 홈 굿즈와 미학적 라이프스타일 데코.' },
  { num: 'Dis. 03', icon: '⬡', title: 'K-Play',    tag: 'Entertainment', en: 'Premium blind boxes, toys, and traditional-modern games.',          ko: '프리미엄 블라인드 박스, 토이 및 전통-현대 게임.' },
  { num: 'Dis. 04', icon: '♦', title: 'K-Charms',  tag: 'Lifestyle',     en: "The global 'Bag-Deco' trend featuring K-character keychains.",       ko: "K-캐릭터 키체인이 이끄는 글로벌 '백데코' 트렌드." },
  { num: 'Dis. 05', icon: '⬚', title: 'K-Tech',    tag: 'Tech',          en: 'Hangeul-designed tech gadgets and high-quality accessories.',         ko: '한글 디자인 테크 가젯과 고품질 액세서리.' },
  { num: 'Dis. 06', icon: '◈', title: 'K-Apparel', tag: 'Fashion',       en: 'Trend-driven fashion, socks, and heritage-motif streetwear.',         ko: '트렌드 주도형 패션, 양말 및 헤리티지 모티프 스트리트웨어.' },
  { num: 'Dis. 07', icon: '≋', title: 'K-Scent',   tag: 'Wellness',      en: 'Sensory diffusers and perfumes inspired by Korean nature.',           ko: '한국 자연에서 영감을 받은 센서리 디퓨저와 향수.' },
  { num: 'Dis. 08', icon: '✾', title: 'K-Pet',     tag: 'Lifestyle',     en: "Premium lifestyle supplies for the evolving 'Pet Economy'.",            ko: "진화하는 '펫코노미'를 위한 프리미엄 라이프스타일 용품." },
];

function VCard({ data, index }) {
  const { t } = useLang();
  const ref = useFadeIn(index * 0.06);
  return (
    <div className="v-card" ref={ref}>
      <div className="v-card-num">{data.num}</div>
      <div className="v-card-icon">{data.icon}</div>
      <h3>{data.title}</h3>
      <p>{t(data.en, data.ko)}</p>
      <span className="v-card-tag">{data.tag}</span>
    </div>
  );
}

export default function BrandVision() {
  const { t } = useLang();
  return (
    <section id="brand-vision">
      <div className="container">
        <div className="vision-header">
          <span className="sec-label">{t('Brand', '브랜드')}</span>
          <h2
            dangerouslySetInnerHTML={{
              __html: t('Korea Brand Architecture', '코리아 브랜드 아키텍처'),
            }}
          />
          <p>
            {t(
              'Eight distinct verticals, one unified Korean cultural identity — spanning every dimension of modern lifestyle.',
              '8개의 차별화된 버티컬, 하나의 통합된 한국 문화 정체성 — 현대 라이프스타일의 모든 영역을 아우릅니다.'
            )}
          </p>
        </div>

        <div className="vision-grid">
          {CARDS.map((c, i) => (
            <VCard key={c.title} data={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
