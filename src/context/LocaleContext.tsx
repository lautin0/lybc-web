import { createContext, Dispatch, SetStateAction } from "react";

export type localeTypes = "en" | "zh"

export const LocaleContext = createContext<[
  null, null, null] | [localeTypes, Dispatch<SetStateAction<localeTypes>>, Function
]>([null, null, null])