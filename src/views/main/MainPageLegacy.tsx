import React from "react";
import PropTypes from 'prop-types';

// core components
import MainNavbar from "components/Navbars/MainNavbar";
import DefaultFooter from "components/Footers/DefaultFooter";
import { Breadcrumb, BreadcrumbItem } from 'react-bootstrap';
// import SearchBooks from "views/books/SearchBooks";
import { getMenuHierarchy } from "utils/utils";
import UNIVERSALS from "Universals";
import { useIntl } from "react-intl";
import { useHistory } from "react-router-dom";
import useLanguage from "hooks/useLanguage";

type MainPageProps = {
  page: string,
}

function MainPageLegacy(props: React.PropsWithChildren<MainPageProps>) {

  const [locale] = useLanguage()

  const history = useHistory()

  const intl = useIntl()

  let menus = getMenuHierarchy(props.page, null, null, null);

  React.useEffect(() => {
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    return function cleanup() {
      document.body.classList.remove("sidebar-collapse");
    };
  });

  React.useEffect(() => {
    document.title = intl.formatMessage({ id: UNIVERSALS.TITLE_MAP[props.page].title })
  }, [props.page, locale, intl])

  return (
    <>
      <MainNavbar page={props.page} />
      <div className="wrapper">
        <div className="main" style={props.page === 'preacher-message' ? { top: 135, background: 'lightyellow' } : { top: 135 }}>
          <div>
            <Breadcrumb as="nav" style={{ fontSize: '1.2rem' }}>
              {menus && menus.map((value: any, index: number) => {
                if (value.link != null)
                  return <BreadcrumbItem
                    key={index}
                    href="#"
                    onClick={(e: any) => {
                      e.preventDefault()
                      history.push(value.link)
                    }}
                  >
                    {intl.formatMessage({ id: value.title })}
                  </BreadcrumbItem>
                else
                  return <BreadcrumbItem key={index} active as="span">{intl.formatMessage({ id: value.title })}</BreadcrumbItem>
              })}
            </Breadcrumb>
          </div>
          {props.children}
        </div>
        <DefaultFooter />
      </div>
    </>
  );
}

MainPageLegacy.propTypes = {
  page: PropTypes.string.isRequired,
};

export default MainPageLegacy;
