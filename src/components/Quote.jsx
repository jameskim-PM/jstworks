import { useState } from 'react';
import { useLang } from '../context/LanguageContext.jsx';

const CONTACT_EMAIL = 'info@jstworks.com';

export default function Quote() {
  const { t, lang } = useLang();
  const [form, setForm] = useState({ name: '', company: '', email: '', message: '' });
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
    const company = form.company.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (!name || !email || !message) {
      setFeedback({
        text: lang === 'ko' ? '필수 항목을 입력해주세요.' : 'Please fill out the required fields.',
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

    const subject = `[JSTWORKS Inquiry] ${name}${company ? ` (${company})` : ''}`;
    const body =
      `Name: ${name}\n` +
      `Company: ${company || '-'}\n` +
      `Email: ${email}\n\n` +
      `${message}\n`;

    const mailtoLink =
      `mailto:${CONTACT_EMAIL}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

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
        <div className="quote-hero">
          <h2 className="quote-headline">JOSHUA TREE WORKS</h2>
          <div className="quote-body">
            <p>
              {t(
                'Design the future of lifestyle with us.',
                '함께 라이프스타일의 미래를 설계하세요.'
              )}
            </p>
            <p>
              {t(
                'We set a new standard by combining the affordable premium the market demands with genuine brand value.',
                '시장이 요구하는 합리적 프리미엄과 진정한 브랜드 가치를 결합하여 새로운 기준을 만듭니다.'
              )}
            </p>
            <p>
              {t(
                'We welcome inquiries from partners who share the JOSHUA TREE WORKS vision and are ready to grow together.',
                'JOSHUA TREE WORKS의 비전에 공감하며 동반 성장을 이뤄낼 파트너사의 문의를 기다립니다.'
              )}
            </p>
          </div>
          <div className="quote-attribution">
            <strong>{t('Core Thesis', '핵심 명제')}</strong>
            <span>{t('JOSHUA TREE WORKS', 'JOSHUA TREE WORKS')}</span>
          </div>
        </div>

        <div className="inquiry-block">
          <h3>{t('Send an Inquiry', '문의하기')}</h3>

          <form className="inquiry-form" onSubmit={submit} noValidate>
            <div className="form-row-trio">
              <div className="form-row">
                <input
                  id="iName"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder={t('Name [Title included]', '성명 [직함포함]')}
                  value={form.name}
                  onChange={update('name')}
                />
              </div>
              <div className="form-row">
                <input
                  id="iCompany"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  placeholder={t('Company', '회사명')}
                  value={form.company}
                  onChange={update('company')}
                />
              </div>
              <div className="form-row">
                <input
                  id="iEmail"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder={t('Email', '이메일')}
                  value={form.email}
                  onChange={update('email')}
                />
              </div>
            </div>

            <div className="form-row form-row-full">
              <textarea
                id="iMessage"
                name="message"
                rows={5}
                required
                placeholder={t('Message', '문의 내용')}
                value={form.message}
                onChange={update('message')}
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {t('Send', '보내기')}
              </button>
            </div>

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

          <p className="inquiry-intro">
            {t('Reach us directly at ', '문의는 ')}
            <a className="inquiry-email-link" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
            {t(
              ' — or fill out the form above and we will reply shortly.',
              ' 로 직접 보내주시거나, 위 양식을 작성해주시면 빠르게 답변드리겠습니다.'
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
