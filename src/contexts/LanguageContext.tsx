import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations, Translations } from '@/lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  isKioskMode: boolean;
  setKioskMode: (enabled: boolean) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('medrelay-language');
    return (saved as Language) || 'en';
  });

  const [isKioskMode, setKioskMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('medrelay-kiosk-mode');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('medrelay-language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('medrelay-kiosk-mode', String(isKioskMode));
  }, [isKioskMode]);

  const value = {
    language,
    setLanguage,
    t: translations[language],
    isKioskMode,
    setKioskMode,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
