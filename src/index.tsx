import ReactDOM from "react-dom";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";

// styles for this kit
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss";
import "assets/demo/demo.css";
import "assets/demo/nucleo-icons-page-styles.css";
// pages for this kit
import Index from "views/Index";
import LoginPage from "views/login/LoginPage";
import MainPageLegacy from "views/main/MainPageLegacy";
import ErrorPage from "views/error/ErrorPage";
import MainPage from "views/main/MainPage";
import "moment/locale/zh-hk";
import { ApolloProvider } from "@apollo/client/react/context/ApolloProvider";
import PrivateRoute from "components/Route/PrivateRoute";
import { getClient } from "utils/apollo.client";
import PersonalRoute from "components/Route/PersonalRoute";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import en from "./assets/i18n/en.json";
import zh from "./assets/i18n/zh.json";
import { IntlProvider } from "react-intl";
import { getKeyValue } from "utils/utils";
import { LocaleContext } from "context/LocaleContext";
import useLanguage from "hooks/useLanguage";
import LoadingOverlay from "components/Loading/LoadingOverlay";
import CommonModal from "components/Modals/CommonModal";
import LayoutContext from "context/LayoutContext";
import useLayout from "hooks/useLayout";
import AuthContext from "context/AuthContext";
import useAuth from "hooks/useAuth";
import { ErrorBoundary } from "views/error/ErrorBoundary";
import Journal from "views/articles/Journal";
import ContactUs from "views/about/ContactUs";
import Doctrine from "views/about/Doctrine";
import SundayServiceInfo from "views/about/SundayServiceInfo";
import PreacherMessage from "views/articles/PreacherMessage";
import NewsList from "views/news/NewsList";
import Careers from "views/about/Careers";
import Apply from "views/activity/Apply";
import News from "views/news/News";

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
                  <CommonModal />
                  <LoadingOverlay />
                  <Switch>
                    <Route
                      path="/index"
                      render={(props: any) => <Index {...props} />}
                    />
                    <PrivateRoute path="/admin" />
                    <PersonalRoute path="/personal" />
                    <Route
                      path="/journal"
                      render={(props: any) => (
                        <MainPage {...props} page="journal">
                          <Journal />
                        </MainPage>
                      )}
                    />
                    <Route
                      path="/apply-activity"
                      render={(props) => (
                        <MainPageLegacy {...props} page="apply-activity">
                          <Apply />
                        </MainPageLegacy>
                      )}
                    />
                    <Route
                      path="/careers"
                      render={(props: any) => (
                        <MainPageLegacy {...props} page="careers">
                          <Careers />
                        </MainPageLegacy>
                      )}
                    />
                    <Route
                      path="/contact-us"
                      render={(props: any) => (
                        <MainPage {...props} page="contact-us">
                          <ContactUs />
                        </MainPage>
                      )}
                    />
                    <Route
                      path="/doctrine"
                      render={(props: any) => (
                        <MainPage {...props} page="doctrine">
                          <Doctrine />
                        </MainPage>
                      )}
                    />
                    <Route
                      path="/sunday-service-info"
                      render={(props: any) => (
                        <MainPage {...props} page="sunday-service-info">
                          <SundayServiceInfo />
                        </MainPage>
                      )}
                    />
                    <Route
                      path="/login-page"
                      render={(props: any) => <LoginPage {...props} />}
                    />
                    <Route
                      path="/preacher-message"
                      render={(props: any) => (
                        <MainPage {...props} page="preacher-message">
                          <PreacherMessage />
                        </MainPage>
                      )}
                    />
                    <Route
                      path="/news/:id"
                      render={(props) => (
                        <MainPageLegacy {...props} page="news">
                          <News />
                        </MainPageLegacy>
                      )}
                    />
                    <Route
                      path="/news-list/"
                      render={(props) => (
                        <MainPage {...props} page="news-list">
                          <NewsList />
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
