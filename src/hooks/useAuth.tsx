import { FetchResult } from "@apollo/client";
import { LoginMutation, RefreshTokenMutation, TokenPair } from "generated/graphql";
import { useState } from "react";
import { resetClient } from "utils/apollo.client";

export default function useAuth() {

   const [tokenPair, setTokenPair] = useState<TokenPair | null>((localStorage.getItem('token') && localStorage.getItem('refreshToken')) ? { token: localStorage.getItem('token')!, refreshToken: localStorage.getItem('refreshToken')! } : null)

   const signInComplete = (result: FetchResult<LoginMutation, Record<string, any>, Record<string, any>>) => {
      setTokenPair(result.data?.login!)
      localStorage.setItem('token', result.data?.login.token!)
      localStorage.setItem('refreshToken', result.data?.login.refreshToken!)
   }

   const refreshSignInComplete = (result: FetchResult<RefreshTokenMutation, Record<string, any>, Record<string, any>>) => {
      setTokenPair(result.data?.refreshToken!)
      localStorage.setItem('token', result.data?.refreshToken.token!)
      localStorage.setItem('refreshToken', result.data?.refreshToken.refreshToken!)
   }

   const signOut = () => {
      setTokenPair(null)
      localStorage.clear()
      resetClient()
   }

   return { signInComplete, refreshSignInComplete, signOut, tokenPair }
}