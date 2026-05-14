import { useState } from 'react';
import { useLang } from '../context/LanguageContext.jsx';

const CONTACT_EMAIL = 'info@jstworks.com';

export default function Quote() {
  const { t, lang } = useLang();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [feedback, setFeedback] = useState({
    text: '',
    error: false,
    fallbackHref: '',
    copied: false,
  });

  const update = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (!name || !email || !message) {
      setFeedback({
        text: lang === 'ko' ? '모든 항목을 입력해주세요.' : 'Please fill out every field.',
        error: true,
        fallbackHref: '',
        copied: false,
      });
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setFeedback({
        text:
          lang === 'ko'
            ? '올바른 이메일 주소를 입력해주세요.'
            : 'Please enter a valid email address.',
        error: true,
        fallbackHref: '',
        copied: false,
      });
      return;
    }

    const subject = `[JSTWORKS Inquiry] ${name}`;
    const body =
      `Name: ${name}\n` +
      `Email: ${email}\n\n` +
      `${message}\n`;

    const mailtoLink =
      `mailto:${CONTACT_EMAIL}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    // 메일 클라이언트가 안 떴을 때를 대비해, 본문 + 메일 주소를 클립보드에 복사
    let copied = false;
    try {
      const clipText =
        `To: ${CONTACT_EMAIL}\n` +
        `Subject: ${subject}\n\n` +
        `${body}`;
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(clipText);
        copied = true;
      }
    } catch {
      // 클립보드 접근 실패는 무시
    }

    // mailto 트리거 — window.location.href 가 가장 호환성이 좋음
    try {
      window.location.href = mailtoLink;
    } catch {
      // 일부 환경에서 throw 가능 — 그래도 fallback 링크로 안내
    }

    setFeedback({
      text:
        lang === 'ko'
          ? `메일 클라이언트가 열리지 않으면 아래 버튼을 눌러주세요. 내용은 클립보드에 ${
              copied ? '복사되었습니다.' : '복사하지 못했습니다 — 직접 복사해주세요.'
            }`
          : `If your email client did not open, use the button below. The message has ${
              copied ? 'been copied to your clipboard.' : 'NOT been copied — please copy it manually.'
            }`,
      error: false,
      fallbackHref: mailtoLink,
      copied,
    });
  };

  return (
    <section id="quote">
      <div className="container">
        <div className="quote-inner">
          <div className="quote-text-col">
            <blockquote>
              {t(
                'Lifestyle Variety is the steepest-growth lane in U.S. retail today — and a brand that pairs affordable premium with a real cultural soul is positioned to lead it.',
                '라이프스타일 버라이어티는 오늘날 미국 소매업에서 가장 가파른 성장 구간이며 — 합리적 프리미엄과 진정한 문화적 영혼을 결합한 브랜드가 이를 이끌 위치에 있습니다.'
              )}
            </blockquote>
            <div className="quote-attribution">
              <strong>{t('Internal Thesis', '내부 테시스')}</strong>
              <span>{t('Korea Strategy · Joshua Tree Works', '한국 전략 · Joshua Tree Works')}</span>
            </div>
          </div>

          <div className="inquiry-form-col">
            <h3>{t('Send an Inquiry', '문의하기')}</h3>
            <p className="inquiry-intro">
              {t('Reach us directly at ', '문의는 ')}
              <a className="inquiry-email-link" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>
              {t(
                ' — or fill out the form below and we will reply shortly.',
                ' 로 직접 보내주시거나, 아래 양식을 작성해주시면 빠르게 답변드리겠습니다.'
              )}
            </p>

            <form className="inquiry-form" onSubmit={submit} noValidate>
              <div className="form-row">
                <label htmlFor="iName">{t('Name', '이름')}</label>
                <input
                  id="iName" name="name" type="text" required autoComplete="name"
                  value={form.name} onChange={update('name')}
                />
              </div>
              <div className="form-row">
                <label htmlFor="iEmail">{t('Email', '이메일')}</label>
                <input
                  id="iEmail" name="email" type="email" required autoComplete="email"
                  value={form.email} onChange={update('email')}
                />
              </div>
              <div className="form-row">
                <label htmlFor="iMessage">{t('Message', '문의 내용')}</label>
                <textarea
                  id="iMessage" name="message" rows={5} required
                  value={form.message} onChange={update('message')}
                />
              </div>
              <button type="submit" className="btn-primary">
                {t('Send Inquiry', '문의 보내기')}
              </button>

              <div
                className={`form-feedback${feedback.error ? ' error' : ''}`}
                aria-live="polite"
              >
                <p>{feedback.text}</p>
                {feedback.fallbackHref && (
                  <a
                    className="inquiry-fallback-link"
                    href={feedback.fallbackHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t(
                      `Open mail to ${CONTACT_EMAIL}`,
                      `${CONTACT_EMAIL} 으로 메일 열기`
                    )}
                  </a>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
