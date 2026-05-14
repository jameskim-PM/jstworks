# JSTWORKS — Joshua Tree Works 2nd Webpage

> **Korea to the World** — K-GANADA™ 브랜드 아키텍처를 소개하는 Joshua Tree Works의 공식 브랜드 사이트.
> Vite + React 기반 SPA, 영문/한글 실시간 토글, 메일 클라이언트 연동 문의 폼을 갖춘 단일 페이지 사이트입니다.

---

## ✨ 주요 기능

- **다국어 토글** — 우측 상단 `View is English ›` 버튼 한 번으로 페이지 전체가 즉시 한국어로 전환 (LanguageContext 기반)
- **풀스택 없는 문의 폼** — Name / Email / Message 입력 후 클릭 시 사용자의 메일 클라이언트가 자동으로 `info@jstworks.com` 수신자 + 채워진 제목/본문으로 열림
- **스크롤 트리거 페이드인** — IntersectionObserver 기반 `useFadeIn` 훅으로 모든 카드 컴포넌트가 화면 진입 시 자연스럽게 등장
- **부드러운 앵커 스크롤** — `scroll-behavior: smooth` + `scrollIntoView`로 네비게이션 클릭 시 부드러운 섹션 이동
- **반응형** — 1024 / 900 / 600 / 380px 4단계 브레이크포인트, 햄버거 메뉴(<900px), 폰트·패딩·그리드 단계적 축소
- **한글 친화 타이포그래피** — `word-break: keep-all` + `overflow-wrap: break-word` 전역 적용으로 한글이 글자 단위로 잘리지 않음

---

## 🗂 프로젝트 구조

```
jstworks_2ndWebpage/
├── index.html              # Vite 진입점 (root div + main.jsx 로드)
├── index.legacy.html       # 변환 전 단일 HTML 백업
├── package.json
├── vite.config.js
├── public/                 # 정적 자산 (절대 경로로 서빙됨)
│   ├── JoshuaTreeWorks_Logo.png        # navbar 풀 로고
│   ├── JoshuaTreeWorks_FL_White.png    # footer 로고
│   ├── JoshuaTreeWorks_White_Logo.png  # (legacy)
│   ├── Amazon_logo.svg                 # Market 섹션 채널 로고
│   ├── Etsy_logo_lg_rgb.png
│   └── sample예제.png                  # 디자인 레퍼런스
└── src/
    ├── main.jsx                        # ReactDOM 렌더 + global.css import
    ├── App.jsx                         # LanguageProvider + 섹션 조립
    ├── context/
    │   └── LanguageContext.jsx         # { lang, toggle, t(en, ko) } 컨텍스트
    ├── hooks/
    │   └── useFadeIn.js                # IntersectionObserver 페이드인 훅
    ├── styles/
    │   └── global.css                  # 모든 스타일 통합 (CSS 변수 + 미디어 쿼리)
    └── components/
        ├── Nav.jsx                     # 풀 로고 + 메뉴 + View 토글 + 햄버거
        ├── Hero.jsx                    # 메인 비주얼 — "한국의 문화를 세계로"
        ├── BrandVision.jsx             # K-* 8개 버티컬 카드 그리드
        ├── BrandMessage.jsx            # Primary/Secondary Benefits + Core Value
        ├── Market.jsx                  # Amazon / ETSY 유통 채널 카드
        ├── Quote.jsx                   # 인용문 + 문의 폼 (mailto)
        └── Footer.jsx                  # 로고 + 메뉴 + Korea HQ / US Office
```

---

## 🧩 섹션 구성

| # | Section | ID | 핵심 내용 |
|---|---|---|---|
| 1 | **Hero** | `#hero` | 한국 문화를 세계로 — 메인 카피, eyebrow, CTA |
| 2 | **Brand Vision** | `#brand-vision` | K-Beauty / Living / Play / Charms / Tech / Apparel / Scent / Pet 8개 버티컬 카드 |
| 3 | **Brand Message** | `#brand-message` | Primary 3 / Secondary 3 혜택 + Core Value `K-GANADA™` 강조 바 |
| 4 | **Market** | `#market` | Amazon / ETSY 두 글로벌 유통 채널 카드 (로고 + 강점 불릿) |
| 5 | **Quote + Inquiry** | `#quote` | 좌측: Internal Thesis 인용문 / 우측: Name·Email·Message 문의 폼 |
| 6 | **Footer** | `#footer` | 로고 (중앙) + Navigate + Korea HQ + U.S. Office |

---

## 🌐 다국어 시스템

`LanguageContext`는 단순하지만 확장 가능한 패턴을 사용합니다.

```jsx
import { useLang } from './context/LanguageContext.jsx';

function MyComponent() {
  const { lang, toggle, t } = useLang();
  return <p>{t('Hello', '안녕하세요')}</p>;
}
```

- `lang` — 현재 언어 (`'en'` | `'ko'`)
- `toggle()` — EN ↔ KO 양방향 전환
- `t(en, ko)` — 현재 언어에 맞는 문자열 반환
- HTML 마크업을 포함하는 텍스트는 `dangerouslySetInnerHTML={{ __html: t(en, ko) }}` 패턴으로 처리

---

## 📧 문의 폼 — mailto 방식

서버리스 구조를 유지하기 위해 백엔드 없이 **클라이언트 메일러**로 처리합니다.

```js
const mailto =
  'mailto:info@jstworks.com' +
  '?subject=' + encodeURIComponent(`[JSTWORKS Inquiry] ${name}`) +
  '&body='    + encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
window.location.href = mailto;
```

- 사용자의 기본 메일 클라이언트 (Mail.app / Outlook / Gmail 등)가 미리 채워진 채로 열림
- 빈 필드 시 한/영 자동 분기 에러 메시지
- 성공 시 안내 문구 표시

> 백엔드 연동(Formspree, Resend, 자체 API)이 필요하면 `src/components/Quote.jsx`의 `submit` 핸들러만 교체하면 됩니다.

---

## 🚀 실행 방법

### 사전 요구
- Node.js 18+ (권장 20+)
- npm 또는 pnpm / yarn

### 설치 & 개발
```bash
npm install
npm run dev          # → http://localhost:5173 (자동 오픈)
```

### 프로덕션 빌드
```bash
npm run build        # → dist/ 생성
npm run preview      # 빌드 결과 미리보기
```

---

## 🎨 디자인 토큰

`src/styles/global.css`의 `:root`에서 모든 색상을 변수로 관리합니다.

| 변수 | 값 | 용도 |
|---|---|---|
| `--green-main` | `#00441d` | 메인 짙은 그린 (footer 배경, hover 등) |
| `--green-accent` | `#00754A` | 액센트 그린 (라벨, 링크, 폼 포커스) |
| `--green-house` | `#1E3932` | 하우스 그린 (nav, market, hero 배경) |
| `--green-uplift` | `#2b5148` | 보조 그린 (그라데이션) |
| `--green-light` | `#d4e9e2` | 라이트 그린 (태그 배경, 장식) |
| `--warm` | `#f2f0eb` | 따뜻한 베이지 (quote 섹션) |
| `--cool` | `#f8f8f6` | 쿨한 회백색 (vision, message-card) |
| `--text` | `rgba(0,0,0,0.85)` | 본문 텍스트 |
| `--text-soft` | `rgba(0,0,0,0.52)` | 보조 텍스트 |

폰트는 Google Fonts에서 로드: **Google Sans** (제목) + **Noto Sans KR** / **Nanum Gothic** / **Roboto** (본문).

---

## 📱 반응형 브레이크포인트

| 폭 | 변경 사항 |
|---|---|
| `≤ 1024px` | 섹션 padding 축소, msg/market 카드 패딩 조정 |
| `≤ 900px` | 햄버거 메뉴 활성, vision 4열 → 2열, msg/market 1열, quote 1열, footer 2열 |
| `≤ 600px` | vision 1열, footer 1열, 모든 카드 패딩 축소, 로고 36px |
| `≤ 380px` | 폰트·간격 미세 축소 |

---

## 🛠 기술 스택

- **React 18.3** — 함수형 컴포넌트 + Hooks (`useState`, `useEffect`, `useRef`, `useContext`, `useCallback`)
- **Vite 6** — 빠른 HMR + ESM 번들러
- **Vanilla CSS** — CSS 변수 + `clamp()` 가변 타이포그래피, no CSS-in-JS / no Tailwind
- **No backend** — 정적 호스팅 (Vercel, Netlify, Cloudflare Pages, GitHub Pages 등)에 그대로 배포 가능

---

## 🚢 배포 가이드

### Vercel
```bash
npx vercel
# Framework Preset: Vite
# Build Command: npm run build
# Output Directory: dist
```

### Netlify
- `Build command`: `npm run build`
- `Publish directory`: `dist`

### GitHub Pages (Actions)
- `dist/`를 `gh-pages` 브랜치로 푸시하거나 `peaceiris/actions-gh-pages` 액션 사용
- `vite.config.js`에 `base: '/<repo-name>/'` 추가 필요

---

## 📦 저장소

GitHub: [`jenuks/jstworks_Webpage`](https://github.com/jenuks/jstworks_Webpage)

---

## 📝 라이선스 / 저작권

© 2026 Joshua Tree Works. All rights reserved.

문의: [info@jstworks.com](mailto:info@jstworks.com)
