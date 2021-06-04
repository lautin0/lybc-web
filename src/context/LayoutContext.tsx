import React, { Dispatch, SetStateAction } from "react";

const LayoutContext = React.createContext<{
   mobileOpen?: boolean | null,
   setMobileOpen?: Dispatch<SetStateAction<boolean>> | null,
   darkMode?: boolean | null,
   setDarkMode?: Dispatch<SetStateAction<boolean>> | null
}>
   ({
      mobileOpen: null,
      setMobileOpen: null,
      darkMode: null,
      setDarkMode: null
   })

export default LayoutContext;