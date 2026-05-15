import { useEffect, useRef } from 'react';
import { useLang } from '../context/LanguageContext.jsx';

const PILLARS = [
  {
    key: 'fruit',
    label:    { en: 'Fruit', ko: '열매' },
    qmark:    '(What?)',
    question: {
      en: 'What is the ultimate experience our customers will enjoy?',
      ko: '고객이 즐길 최종 결과물은 무엇인가?',
    },
    items: [
      { en: 'Affordable Premium, high-quality products',                            ko: '합리적 프리미엄 (Affordable Premium) 고품질 제품' },
      { en: 'Comprehensive K-Culture Portfolio (Comprehensive Categories)',         ko: '종합 K-Culture 포트폴리오 (Comprehensive Categories)' },
      { en: 'One-stop shopping experience (Korean products → K-GANADA™)',           ko: '원스탑 쇼핑 경험 (한국제품 → K-GANADA™)' },
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
      { en: 'Story-driven Digital Narrative (Digital Narrative)',       ko: '스토리 중심의 디지털 내러티브 (Digital Narrative)' },
      { en: 'Trend Curation Speed (Curated Trend-Speed)',               ko: '트렌드 큐레이션 속도 (Curated Trend-Speed)' },
      { en: 'Two-track distribution and communication strategy',       ko: '투트랙 유통 및 커뮤니케이션 전략' },
    ],
  },
  {
    key: 'root',
    label:    { en: 'Root', ko: '뿌리' },
    qmark:    '(Why?)',
    question: {
      en: 'Why K-GANADA™?',
      ko: '왜 K-GANADA™인가?',
    },
    items: [
      { en: 'Resilient transmission of Korean heritage (the Joshua Tree spirit)', ko: '한국 Heritage의 강인한 전파 (조슈아트리의 생명력)' },
      { en: 'Absolute Authenticity',                                              ko: '압도적 진정성 (Absolute Authenticity)' },
      { en: 'Seoul Vibe',                                                         ko: '서울의 바이브 (Seoul Vibe)' },
    ],
  },
];

// 뿌리(0) → 줄기(1) → 열매(2) 순서로 등장
// cardRefs/dotRefs: [0]=root, [1]=stem, [2]=fruit
const SEQUENCE = [
  { dotIdx: 0, cardIdx: 0, delay: 200  },
  { dotIdx: 1, cardIdx: 1, delay: 800  },
  { dotIdx: 2, cardIdx: 2, delay: 1400 },
];

export default function Vision() {
  const { t } = useLang();
  const sectionRef = useRef(null);
  const dotRefs    = useRef([]);
  const cardRefs   = useRef([]);
  const linesRef   = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let animated = false;

    const runAnimation = () => {
      if (animated) return;
      animated = true;

      linesRef.current.forEach(l => { try { l.remove(); } catch (_) {} });
      linesRef.current = [];

      const isMobile      = window.matchMedia('(max-width: 900px)').matches;
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      SEQUENCE.forEach(({ dotIdx, cardIdx, delay }) => {
        setTimeout(() => {
          const dotEl  = dotRefs.current[dotIdx];
          const cardEl = cardRefs.current[cardIdx];
          if (!dotEl || !cardEl) return;

          dotEl.style.opacity = '1';
          cardEl.classList.add('visible');

          if (!isMobile && !reducedMotion && window.LeaderLine) {
            try {
              const line = new window.LeaderLine(dotEl, cardEl, {
                color:         '#2d5a2e',
                size:          4,
                path:          'fluid',
                startSocket:   'right',
                endSocket:     'left',
                startPlug:     'arrow2',
                startPlugSize: 1.2,
                endPlug:       'behind',
              });
              line.show('draw', { duration: 600, timing: 'ease-in-out' });
              linesRef.current.push(line);
            } catch (_) {}
          }
        }, reducedMotion ? 0 : delay);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          runAnimation();
          observer.unobserve(section);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(section);

    const handleResize = () => {
      linesRef.current.forEach(l => { try { l.position(); } catch (_) {} });
    };
    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      linesRef.current.forEach(l => { try { l.remove(); } catch (_) {} });
      linesRef.current = [];
    };
  }, []);

  return (
    <section id="vision" ref={sectionRef}>
      <div className="container">
        <div className="vision-statement-header">
          <span className="sec-label">{t('Vision', '비전')}</span>
          <h2
            dangerouslySetInnerHTML={{
              __html: t('Vision Statement', 'Vision Statement'),
            }}
          />
          <p className="vision-lede">
            {t(
              '"Like the Joshua Tree thriving in the harshest desert, we anchor K-Heritage deep into American soil with unwavering vitality."',
              '"혹한의 사막에서도 마르지 않는 생명력으로, K-Heritage를 미국 땅에 깊게 뿌리내리다"'
            )}
          </p>
        </div>

        <div className="vision-statement-grid">
          {/* 좌: 이미지 + 도트 앵커 */}
          <div className="vision-image-wrap">
            <img
              className="vision-image"
              src="/Joshua_Tree_01.jpg"
              alt={t('Joshua Tree — symbol of K-Heritage', '조슈아트리 — K-Heritage의 상징')}
            />
            {/* 도트 순서: [0]=뿌리(bottom), [1]=줄기(mid), [2]=열매(top) */}
            <div className="dot-anchor" id="dot-bottom" ref={el => { dotRefs.current[0] = el; }} />
            <div className="dot-anchor" id="dot-mid"    ref={el => { dotRefs.current[1] = el; }} />
            <div className="dot-anchor" id="dot-top"    ref={el => { dotRefs.current[2] = el; }} />
          </div>

          {/* 우: 카드 3개 — PILLARS 순서 [fruit, stem, root], cardRefs는 역순 매핑 */}
          <div className="pillars">
            {PILLARS.map((p, i) => (
              <article
                key={p.key}
                className={`pillar pillar-${p.key}`}
                ref={el => { cardRefs.current[2 - i] = el; }}
              >
                <h3>
                  {t(p.label.en, p.label.ko)}
                  <span className="pillar-qmark"> {p.qmark}</span>
                </h3>
                <p className="pillar-ask">{t(p.question.en, p.question.ko)}</p>
                <ul className="pillar-list">
                  {p.items.map((it, idx) => (
                    <li key={idx}>{t(it.en, it.ko)}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
