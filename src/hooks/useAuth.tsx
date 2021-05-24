import { setSystemFailure } from "actions";
import { Login, RefreshTokenInput, TokenPair, useLoginMutation, useRefreshTokenMutation } from "generated/graphql";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { resetClient } from "utils/auth.client";

export default function useAuth() {

   const dispatch = useDispatch()

   const [tokenPair, setTokenPair] = useState<TokenPair | null>(null)
   const [login, { loading }] = useLoginMutation({ errorPolicy: 'all' })
   const [refreshToken] = useRefreshTokenMutation()

   const history = useHistory()
   const location = useLocation()

   const signIn = (input: Login) => {
      login({
         variables: {
            input: input
         }
      }).then(res => {
         setTokenPair({ token: res.data?.login.token!, refreshToken: res.data?.login.refreshToken! })
         const relayState = new URLSearchParams(location.search).get('relayState')
         if (relayState != null) {
            history.push(relayState)
         } else {
            history.push('/')
         }
      }).catch(err => {
         dispatch(setSystemFailure(err))
      })
   }

   const refreshSignIn = (input: RefreshTokenInput) => {
      refreshToken({
         variables: {
            input: input
         }
      }).then(res => {
         setTokenPair(res.data?.refreshToken!)
      }).catch(err => {
         signOut()
         window.location.reload()
      })
   }

   const signOut = () => {
      setTokenPair(null)
      resetClient()
   }

   return { signIn, refreshSignIn, loading, signOut, tokenPair }
}