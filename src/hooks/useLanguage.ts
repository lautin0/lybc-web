import { localeTypes } from "context/LocaleContext";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function useLanguage(): [localeTypes, Dispatch<SetStateAction<localeTypes>>, Function] {
  const [locale, setLocale] = useState('zh' as localeTypes)

  useEffect(() => {
    let l = localStorage.getItem("locale")
    if (l != null) {
      setLocale(l! as localeTypes);
    }
  }, [])

  const persistLocale = (l: localeTypes) => {
    localStorage.setItem("locale", l)
    setLocale(l)
  }

  return [locale, setLocale, persistLocale]
}