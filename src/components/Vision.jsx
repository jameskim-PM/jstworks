import { useLang } from '../context/LanguageContext.jsx';
import { useFadeIn } from '../hooks/useFadeIn.js';

const PILLARS = [
  {
    key: 'fruit',
    label:    { en: 'Fruit', ko: '열매' },
    qmark:    '(What?)',
    question: {
      en: 'What is the final experience customers will enjoy?',
      ko: '고객이 즐길 최종 결과물은 무엇인가?',
    },
    items: [
      { en: 'Affordable Premium — high-quality products at a reasonable premium',  ko: '합리적 프리미엄 (Affordable Premium) 고퀄리티 제품' },
      { en: 'Comprehensive K-Pop Culture portfolio across every category',          ko: '종합 K-Pop Culture 포트폴리오 (Comprehensive Categories)' },
      { en: 'One-stop shopping experience — Korean products through K-GANADA',     ko: '원스탑 쇼핑 경험 (한국제품 → K-GANADA)' },
    ],
  },
  {
    key: 'stem',
    label:    { en: 'Stem', ko: '줄기' },
    qmark:    '(How?)',
    question: {
      en: 'How do we make it real?',
      ko: '어떻게 현실로 만드는가?',
    },
    items: [
      { en: 'Story-driven digital narrative (Digitally Narrative)',     ko: '스토리 중심의 디지털 내러티브 (Digitally Narrative)' },
      { en: 'Curated trend-speed in every release',                    ko: '트렌드 큐레이션 속도 (Curated Trend-Speed)' },
      { en: 'Two-track distribution and communication strategy',       ko: '투트랙 유통 및 커뮤니케이션 전략' },
    ],
  },
  {
    key: 'root',
    label:    { en: 'Root', ko: '뿌리' },
    qmark:    '(Why?)',
    question: {
      en: 'Why K-GANADA?',
      ko: '왜 K-GANADA인가?',
    },
    items: [
      { en: 'Resilient transmission of Korean heritage (the Joshua Tree spirit)', ko: '한국 Heritage의 강인한 전파 (조슈아트리의 생명력)' },
      { en: 'Absolute Authenticity',                                              ko: '압도적 진정성 (Absolute Authenticity)' },
      { en: 'Seoul Vibe',                                                         ko: '서울의 바이브 (Seoul Vibe)' },
    ],
  },
];

function Pillar({ data, index, total }) {
  const { t } = useLang();
  // 뿌리(아래) → 줄기 → 열매(위) 순으로 등장하도록 delay 역순 계산
  const delay = (total - 1 - index) * 0.35;
  const ref = useFadeIn(delay);
  return (
    <article className="pillar" ref={ref}>
      <h3>
        {t(data.label.en, data.label.ko)}
        <span className="pillar-qmark"> {data.qmark}</span>
      </h3>
      <p className="pillar-ask">{t(data.question.en, data.question.ko)}</p>
      <ul className="pillar-list">
        {data.items.map((it, i) => (
          <li key={i}>{t(it.en, it.ko)}</li>
        ))}
      </ul>
    </article>
  );
}

export default function Vision() {
  const { t } = useLang();
  const imageRef = useFadeIn(0);

  return (
    <section id="vision">
      <div className="container">
        <div className="vision-statement-header">
          <span className="sec-label">{t('Vision', '비전')}</span>
          <h2
            dangerouslySetInnerHTML={{
              __html: t(
                'Vision Statement',
                '비전 선언문'
              ),
            }}
          />
          <p className="vision-lede">
            {t(
              '"Like the Joshua Tree thriving in the harshest desert, we root K-Heritage deep into American soil with unwavering vitality."',
              '"혹한의 사막에서도 마르지 않는 생명력으로, K-Heritage를 미국 땅에 깊게 뿌리내리다"'
            )}
          </p>
        </div>

        <div className="vision-statement-grid">
          <div className="vision-image-wrap" ref={imageRef}>
            <img
              className="vision-image"
              src="/Joshua_Tree_01.jpg"
              alt={t('Joshua Tree — symbol of K-Heritage', '조슈아트리 — K-Heritage의 상징')}
            />
          </div>

          <div className="pillars">
            {PILLARS.map((p, i) => (
              <Pillar key={p.key} data={p} index={i} total={PILLARS.length} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
