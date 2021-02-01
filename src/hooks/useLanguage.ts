import { localeTypes } from "context/LocaleContext";
import { Dispatch, SetStateAction, useState } from "react";

export default function useLanguage(): [localeTypes, Dispatch<SetStateAction<localeTypes>>] {
  const [locale, setLocale] = useState('zh' as localeTypes)

  return [locale, setLocale]
}