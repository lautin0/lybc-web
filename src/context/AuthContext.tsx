import { FetchResult } from "@apollo/client";
import { LoginMutation, RefreshTokenMutation, TokenPair } from "generated/graphql";
import React from "react";

const AuthContext = React.createContext<{
   signInComplete: ((result: FetchResult<LoginMutation, Record<string, any>, Record<string, any>>) => void) | null, signOut: (() => void) | null, tokenPair: TokenPair | null,
   refreshSignInComplete: ((result: FetchResult<RefreshTokenMutation, Record<string, any>, Record<string, any>>) => void) | null
}>
   ({ signInComplete: null, signOut: null, tokenPair: null, refreshSignInComplete: null })

export default AuthContext;