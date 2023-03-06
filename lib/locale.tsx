import { useContext, createContext } from "react";
import { lang } from "@/lib/lang";

const LocaleContext = createContext(lang);

export function LocaleProvider({ children }) {
  return (
    <LocaleContext.Provider value={lang}>{children}</LocaleContext.Provider>
  );
}

export const useLocale = () => useContext(LocaleContext);
