import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "es" | "en";

type PresentationLangContext = {
  lang: Lang;
  toggle: () => void;
  t: (es: string, en: string) => string;
};

const Ctx = createContext<PresentationLangContext | undefined>(undefined);

export const PresentationLangProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("es");
  const toggle = () => setLang((l) => (l === "es" ? "en" : "es"));
  const t = (es: string, en: string) => (lang === "es" ? es : en);
  return <Ctx.Provider value={{ lang, toggle, t }}>{children}</Ctx.Provider>;
};

export const usePresentationLanguage = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("Missing PresentationLangProvider");
  return ctx;
};
