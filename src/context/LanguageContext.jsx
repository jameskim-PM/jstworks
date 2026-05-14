import { createContext, useContext, useState, useCallback } from 'react';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');

  const toggle = useCallback(() => {
    setLang((prev) => (prev === 'en' ? 'ko' : 'en'));
  }, []);

  // t(en, ko) → returns text for current language
  const t = useCallback(
    (en, ko) => (lang === 'en' ? en : ko),
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used within LanguageProvider');
  return ctx;
}
