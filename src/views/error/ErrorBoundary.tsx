import React from "react";
import ErrorPage from "./ErrorPage";

export class ErrorBoundary extends React.Component<any, { hasError: boolean }> {
   constructor(props: any) {
      super(props);
      this.state = { hasError: false };
   }

   static getDerivedStateFromError(error: any) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
   }

   componentDidCatch(error: any, errorInfo: any) {
      // You can also log the error to an error reporting service
      //   logErrorToMyService(error, errorInfo);
   }

   render() {
      if (this.state.hasError) {
         // You can render any custom fallback UI
         return <ErrorPage error="500" />
      }

      return this.props.children;
   }
}