import { Login, TokenPair } from "generated/graphql";
import React from "react";

const AuthContext = React.createContext<{
   signIn: ((input: Login) => void) | null, loading: boolean, signOut: (() => void) | null, tokenPair: TokenPair | null
}>
   ({ signIn: null, loading: false, signOut: null, tokenPair: null })

export default AuthContext;