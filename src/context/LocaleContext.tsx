import { createContext, Dispatch, SetStateAction } from "react";

export type localeTypes = "en" | "zh"

export const LocaleContext = createContext<{
  locale: null, setLocale: null, persistLocale: null} | {locale: localeTypes, setLocale: Dispatch<SetStateAction<localeTypes>>, persistLocale: Function
  }>({locale: null, setLocale: null, persistLocale: null})