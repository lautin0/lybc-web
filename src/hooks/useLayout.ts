import { Dispatch, SetStateAction, useState } from "react";

export default function useLayout(): [boolean, Dispatch<SetStateAction<boolean>>, boolean, Dispatch<SetStateAction<boolean>>] {
   const [mobileOpen, setMobileOpen] = useState(false);
   const [darkMode, setDarkMode] = useState(false)

   return [mobileOpen, setMobileOpen, darkMode, setDarkMode]
}