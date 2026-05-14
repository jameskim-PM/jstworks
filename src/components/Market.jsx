import { useLang } from '../context/LanguageContext.jsx';
import { useFadeIn } from '../hooks/useFadeIn.js';

const CHANNELS = [
  {
    num: 'Channel 01',
    logo: '/Amazon_logo.svg',
    logoClass: 'is-amazon',
    name: 'Amazon',
    sub: { en: 'Global E-commerce Leader', ko: '글로벌 이커머스 리더' },
    title: { en: 'Amazon Distribution Route', ko: '아마존 판매 루트' },
    desc: {
      en: "Amazon's global logistics network enables us to reach customers worldwide. With FBA (Fulfillment by Amazon), we ensure fast delivery and reliable service for K-Brand products across major markets including North America, Europe, and Asia.",
      ko: '아마존의 글로벌 물류 네트워크를 활용해 전 세계 고객에게 도달합니다. FBA(Fulfillment by Amazon)를 통해 북미, 유럽, 아시아의 주요 시장에서 K-브랜드 제품의 빠른 배송과 안정적인 서비스를 보장합니다.',
    },
    bullets: [
      { en: 'Global reach across 20+ countries',       ko: '20개국 이상 글로벌 도달' },
      { en: 'Prime delivery for a premium experience', ko: '프리미엄 경험을 위한 Prime 배송' },
      { en: 'Brand Registry for full protection',      ko: '브랜드 보호를 위한 Brand Registry' },
    ],
  },
  {
    num: 'Channel 02',
    logo: '/Etsy_logo_lg_rgb.png',
    logoClass: 'is-etsy',
    name: 'Etsy',
    sub: { en: 'Handcrafted & Unique Marketplace', ko: '핸드크래프트 & 유니크 마켓플레이스' },
    title: { en: 'ETSY Distribution Network', ko: 'ETSY 유통망' },
    desc: {
      en: "ETSY's community of creative shoppers values authenticity and craftsmanship. It's the perfect platform to showcase K-Brand's unique cultural products and connect with customers who appreciate Korean design and quality.",
      ko: 'ETSY의 크리에이티브 커뮤니티는 진정성과 장인정신을 중시합니다. K-브랜드의 독창적인 문화 상품을 소개하고, 한국적 디자인과 품질을 사랑하는 고객과 직접 연결되는 최적의 플랫폼입니다.',
    },
    bullets: [
      { en: 'Focus on artisan and unique products',        ko: '장인과 유니크 제품 중심' },
      { en: 'Direct connection with cultural enthusiasts', ko: '문화 애호가와의 직접 연결' },
      { en: 'Story-driven brand presentation',             ko: '스토리 중심의 브랜드 프레젠테이션' },
    ],
  },
];

function ChannelCard({ data, index }) {
  const { t } = useLang();
  const ref = useFadeIn(index * 0.08);
  return (
    <div className="channel-card" ref={ref}>
      <div className="channel-visual">
        <img className={`channel-logo ${data.logoClass}`} src={data.logo} alt={data.name} />
        <div className="channel-visual-label">
          <p>{t(data.sub.en, data.sub.ko)}</p>
        </div>
      </div>
      <p className="channel-num">{data.num}</p>
      <h3 className="channel-title">{t(data.title.en, data.title.ko)}</h3>
      <p className="channel-desc">{t(data.desc.en, data.desc.ko)}</p>
      <ul className="channel-list">
        {data.bullets.map((b, i) => (
          <li key={i}>{t(b.en, b.ko)}</li>
        ))}
      </ul>
    </div>
  );
}

export default function Market() {
  const { t } = useLang();
  return (
    <section id="market">
      <div className="container">
        <div className="market-header">
          <div>
            <span className="sec-label">{t('Market', '시장')}</span>
            <h2
              dangerouslySetInnerHTML={{
                __html: t(
                  'K-Brand Distribution<br/><em>Two Global Channels</em>',
                  'K-브랜드 유통<br/><em>두 개의 글로벌 채널</em>'
                ),
              }}
            />
          </div>
          <p>
            {t(
              "We deliver outstanding Korean products to customers worldwide through Amazon and ETSY — leveraging each platform's strengths to build the optimal distribution strategy.",
              '우리는 아마존과 ETSY를 통해 전 세계 고객에게 한국의 우수한 제품을 전달합니다. 각 플랫폼의 특성을 활용하여 최적의 유통 전략을 구현합니다.'
            )}
          </p>
        </div>

        <div className="channels-grid">
          {CHANNELS.map((c, i) => (
            <ChannelCard key={c.name} data={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
