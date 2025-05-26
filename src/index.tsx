import ReactDOM from "react-dom";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import { lazy } from "react";

// styles for this kit
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss";
import "assets/demo/demo.css";
import "assets/demo/nucleo-icons-page-styles.css";
// pages for this kit
import Index from "views/Index";
import ErrorPage from "views/error/ErrorPage";
import MainPage from "views/main/MainPage";
import "moment/locale/zh-hk";
import { ApolloProvider } from "@apollo/client/react/context/ApolloProvider";
import { getClient } from "utils/apollo.client";
import en from "./assets/i18n/en.json";
import zh from "./assets/i18n/zh.json";
import { IntlProvider } from "react-intl";
import { getKeyValue } from "utils/utils";
import { LocaleContext } from "context/LocaleContext";
import useLanguage from "hooks/useLanguage";
import LayoutContext from "context/LayoutContext";
import useLayout from "hooks/useLayout";
import AuthContext from "context/AuthContext";
import useAuth from "hooks/useAuth";
import { ErrorBoundary } from "views/error/ErrorBoundary";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LoadingOverlay from "components/Loading/LoadingOverlay";
import { LazyComponent } from "components/LazyComponent";

const CommonModal = lazy(() => import("components/Modals/CommonModal"));
const ContactUs = lazy(() => import("views/about/ContactUs"));
const Doctrine = lazy(() => import("views/about/Doctrine"));
const SundayServiceInfo = lazy(() => import("views/about/SundayServiceInfo"));

const PrivateRoute = lazy(() => import("components/Route/PrivateRoute"))
const PersonalRoute = lazy(() => import("components/Route/PersonalRoute"))

const messages = {
  en: en,
  zh: zh,
};

function App() {
  const [locale, setLocale, persistLocale] = useLanguage();
  const [mobileOpen, setMobileOpen, darkMode, setDarkMode] = useLayout();
  const authHook = useAuth();
  return (
    // @ts-ignore
    <ErrorBoundary>
      <ApolloProvider client={getClient()}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <LocaleContext.Provider value={{ locale, setLocale, persistLocale }}>
            <LayoutContext.Provider
              value={{ mobileOpen, setMobileOpen, darkMode, setDarkMode }}
            >
              <AuthContext.Provider value={{ ...authHook }}>
                <IntlProvider
                  locale={locale}
                  messages={getKeyValue(messages, locale)}
                >
                  <LazyComponent><CommonModal /></LazyComponent>
                  <LoadingOverlay />
                  <Switch>
                    <Route
                      path="/index"
                      render={(props: any) => <Index {...props} />}
                    />
                    <PrivateRoute path="/admin" />
                    <PersonalRoute path="/personal" />
                    <Route
                      path="/contact-us"
                      render={(props: any) => (
                        <MainPage {...props} page="contact-us">
                          <LazyComponent><ContactUs /></LazyComponent>
                        </MainPage>
                      )}
                    />
                    <Route
                      path="/doctrine"
                      render={(props: any) => (
                        <MainPage {...props} page="doctrine">
                          <LazyComponent><Doctrine /></LazyComponent>
                        </MainPage>
                      )}
                    />
                    <Route
                      path="/sunday-service-info"
                      render={(props: any) => (
                        <MainPage {...props} page="sunday-service-info">
                          <LazyComponent><SundayServiceInfo /></LazyComponent>
                        </MainPage>
                      )}
                    />
                    <Redirect from="/sharing/" to="/sharing-list" />
                    <Route exact path="/">
                      <Index />
                    </Route>
                    <Route path="/unauthorized">
                      <ErrorPage error="403" />
                    </Route>
                    <Route path="*">
                      <ErrorPage error="404" />
                    </Route>
                  </Switch>
                </IntlProvider>
              </AuthContext.Provider>
            </LayoutContext.Provider>
          </LocaleContext.Provider>
        </BrowserRouter>
      </ApolloProvider>
    </ErrorBoundary>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
