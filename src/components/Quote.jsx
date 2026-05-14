import { useState } from 'react';
import { useLang } from '../context/LanguageContext.jsx';

export default function Quote() {
  const { t, lang } = useLang();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [feedback, setFeedback] = useState({ text: '', error: false });

  const update = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const { name, email, message } = form;

    if (!name.trim() || !email.trim() || !message.trim()) {
      setFeedback({
        text: lang === 'ko' ? '모든 항목을 입력해주세요.' : 'Please fill out every field.',
        error: true,
      });
      return;
    }

    const subject = `[JSTWORKS Inquiry] ${name.trim()}`;
    const body =
      `Name: ${name.trim()}\n` +
      `Email: ${email.trim()}\n\n` +
      `${message.trim()}\n`;

    window.location.href =
      `mailto:info@jstworks.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setFeedback({
      text:
        lang === 'ko'
          ? '메일 클라이언트를 열었습니다. 전송을 완료해주세요.'
          : 'Your email client has opened — please complete the send.',
      error: false,
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
              {t(
                "Fill out the form below and we'll receive your message at info@jstworks.com via your email client.",
                '아래 양식을 작성해주시면, 메일 클라이언트를 통해 info@jstworks.com 으로 문의가 전송됩니다.'
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
              <p
                className={`form-feedback${feedback.error ? ' error' : ''}`}
                aria-live="polite"
              >
                {feedback.text}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
