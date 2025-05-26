import { Suspense, PropsWithChildren } from "react"

export const LazyComponent = ({ children }: PropsWithChildren<any>) => {
  return <Suspense fallback={<></>}>
    {children}
  </Suspense>
}