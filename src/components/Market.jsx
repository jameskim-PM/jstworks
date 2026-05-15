import { useLang } from '../context/LanguageContext.jsx';
import { useFadeIn } from '../hooks/useFadeIn.js';

const CREATIVE_CHANNELS = [
  {
    name: 'YouTube',
    icon: '/icons/youtube-icon.png',
    desc: { en: 'Long-form storytelling · brand documentary · product reviews', ko: '롱폼 스토리텔링 · 브랜드 다큐멘터리 · 제품 리뷰' },
  },
  {
    name: 'Instagram',
    icon: '/icons/Instagram_icon.png',
    desc: { en: 'Visual campaigns · Reels · lifestyle curation',                  ko: '비주얼 캠페인 · 릴스 · 라이프스타일 큐레이션' },
  },
  {
    name: 'TikTok',
    icon: '/icons/TikTok-icon.png',
    desc: { en: 'Short-form trends · challenges · viral marketing',               ko: '숏폼 트렌드 · 챌린지 · 바이럴 마케팅' },
  },
  {
    name: 'Threads',
    icon: '/icons/Threads-icon.png',
    desc: { en: 'Real-time conversation · community building',                    ko: '실시간 소통 · 커뮤니티 빌딩' },
  },
  {
    name: 'Pinterest',
    icon: '/icons/pinterest_logo.png',
    desc: { en: 'Visual discovery · mood boards · Korean lifestyle inspiration',  ko: '비주얼 디스커버리 · 무드보드 · 한국 라이프스타일 영감' },
  },
  {
    name: 'Discord',
    icon: '/icons/Discord_Logo.png',
    desc: { en: 'Exclusive hub for loyal fans',                                    ko: '충성 팬용 비공개 아지트' },
  },
  {
    name: 'Twitch',
    icon: '/icons/Twitch_Logo.png',
    desc: { en: 'Live, real-time engagement',                                      ko: '현장감 넘치는 실시간 소통' },
  },
  {
    name: 'Reddit',
    icon: '/icons/Reddit_Logo.svg',
    desc: { en: 'Interest-based niche targeting',                                  ko: '관심사 기반 니치 타겟팅' },
  },
];

const PLACE_OPEN_MARKETS = [
  {
    name: 'Amazon',
    icon: '/icons/Amazon_Logo_White.png',
    desc: { en: "America's largest commerce platform · core revenue channel", ko: '미국 최대 커머스 플랫폼 · 핵심 매출 채널' },
  },
  {
    name: 'Etsy',
    icon: '/icons/Etsy-Logo.png',
    desc: { en: 'Specialized in K-Craft · goods · design products',           ko: 'K-Craft · 굿즈 · 디자인 상품 특화' },
  },
  {
    name: 'TikTok Shop Center',
    icon: '/icons/TikTok-Shop_Logo_png.png',
    desc: { en: 'Content-commerce live selling',                              ko: '콘텐츠-커머스 연계 라이브 셀링' },
  },
  {
    name: 'Meta Shop',
    icon: '/icons/meta-logo.png',
    desc: { en: 'Instagram Shop · social commerce',                           ko: 'Instagram Shop · 소셜 커머스' },
  },
  {
    name: 'eBay',
    icon: '/icons/ebay-logo.png',
    desc: { en: 'Expanded global reach',                                      ko: '글로벌 리치 확대' },
  },
];

const PLACE_D2C = [
  {
    name: 'K-GANADA™',
    icon: '/icons/K-GANADA_LOGO.png',
    desc: { en: 'Shopify-based proprietary brand store', ko: 'Shopify 기반 자체 브랜드 스토어' },
  },
  {
    name: 'JSTWorks',
    icon: '/JoshuaTreeWorks_Logo.png',
    desc: { en: 'Corporate homepage · brand hub',        ko: '회사 홈페이지 · 브랜드 허브' },
  },
];

function ChannelChip({ data }) {
  const { t } = useLang();
  return (
    <div className="track-channel">
      <div className="track-channel-icon" aria-hidden={!data.icon}>
        {data.icon && <img src={data.icon} alt={`${data.name} logo`} />}
      </div>
      <div className="track-channel-text">
        <strong>{data.name}</strong>
        <span>{t(data.desc.en, data.desc.ko)}</span>
      </div>
    </div>
  );
}

function CreativeTrack() {
  const { t } = useLang();
  const ref = useFadeIn(0);
  return (
    <div className="track track-creative" ref={ref}>
      <span className="track-tag">{t('Track 1 · Creative', 'Track 1 · 크리에이티브')}</span>
      <h3 className="track-title">{t('Content & Communication', '콘텐츠 & 커뮤니케이션')}</h3>
      <p className="track-role">
        {t(
          'Creative work delivers the appeal of K-Culture and draws customers to K-GANADA™ — optimized for brand communication.',
          '창작물을 통해 K-Culture의 매력을 전달하고, 고객을 K-GANADA™로 유인합니다. (광고 커뮤니케이션 최적화)'
        )}
      </p>
      <div className="track-channels">
        {CREATIVE_CHANNELS.map((c) => (
          <ChannelChip key={c.name} data={c} />
        ))}
      </div>
    </div>
  );
}

function PlaceTrack() {
  const { t } = useLang();
  const ref = useFadeIn(0.08);
  return (
    <div className="track track-place" ref={ref}>
      <span className="track-tag">{t('Track 2 · Place', 'Track 2 · 플레이스')}</span>
      <h3 className="track-title">{t('Distribution & Sales', '유통 & 판매')}</h3>
      <p className="track-role">
        {t(
          'We broadly expose K-Culture products across major US commerce platforms and deliver a one-stop shopping experience — optimized for sales communication and CRO.',
          '미국 주요 커머스 플랫폼에 K-Culture 상품을 폭넓게 노출하고 원스탑 쇼핑 경험을 제공합니다. (세일즈 커뮤니케이션 / CRO 최적화)'
        )}
      </p>

      <div className="track-subgroup">
        <span className="track-subgroup-label">{t('Open Markets · Global Commerce', '오픈마켓 · 글로벌 커머스')}</span>
        <div className="track-channels">
          {PLACE_OPEN_MARKETS.map((c) => (
            <ChannelChip key={c.name} data={c} />
          ))}
        </div>
      </div>

      <div className="track-subgroup track-subgroup-d2c">
        <span className="track-subgroup-label">{t('Direct-to-Consumer (D2C)', '자사몰 (D2C)')}</span>
        <div className="track-channels">
          {PLACE_D2C.map((c) => (
            <ChannelChip key={c.name} data={c} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Market() {
  const { t } = useLang();
  const calloutRef = useFadeIn(0.1);

  return (
    <section id="market">
      <div className="container">
        <div className="market-header">
          <span className="sec-label">{t('Market', '시장')}</span>
          <h2
            dangerouslySetInnerHTML={{
              __html: t(
                'Into the US Market<br/><em>Two Pillars Carrying K-Culture</em>',
                '미국 시장에서<br/><em>K-Culture를 전하는 두개의 축</em>'
              ),
            }}
          />
          <p>
            {t(
              'JSTWorks delivers the full spectrum of K-Culture — culture, products, fashion, food — to American consumers along two tracks: Creative (content) and Place (distribution).',
              'JSTWorks는 미국 소비자를 대상으로 한국의 문화, 상품, 패션, 푸드 등 K-Culture 전 영역을 Creative(콘텐츠)와 Place(유통) 두 개의 트랙으로 전개합니다.'
            )}
          </p>
        </div>

        <div className="tracks-grid">
          <CreativeTrack />
          <PlaceTrack />
        </div>

        <div className="imc-callout" ref={calloutRef}>
          <strong>
            {t(
              '"One consistent message — Creative and Place, operated as one."',
              '"하나의 일관된 메시지로, Creative와 Place를 통합 운영합니다."'
            )}
          </strong>
          <ul>
            <li>{t('Driven by IMC (Integrated Marketing Communications) strategy', 'IMC(Integrated Marketing Communications) 전략 기반')}</li>
            <li>{t('Creative optimizes brand communication; Place optimizes sales communication', 'Creative에서 광고 커뮤니케이션, Place에서 세일즈 커뮤니케이션 최적화')}</li>
            <li>{t("Delivering K-Culture's authenticity and trends to American consumers", '미국 소비자에게 K-Culture의 진정성과 트렌드를 함께 전달')}</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
