import React from "react";
import PropTypes from 'prop-types';

// react-bootstrap components
import IndexNavbar from "components/Navbars/IndexNavbar";
import DefaultFooter from "components/Footers/DefaultFooter";
import MainPageHeader from "components/Headers/MainPageHeader";

type MainPageProps = {

  // page id
  page: string

}

function MainPage(props: React.PropsWithChildren<MainPageProps>) {

  React.useEffect(() => {
    document.body.classList.add("profile-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    return function cleanup() {
      document.body.classList.remove("profile-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });

  return (
    <>
      <IndexNavbar />
      <div className="wrapper">
        <MainPageHeader page={props.page}/>
        {props.children}
        <DefaultFooter />
      </div>
    </>
  );
}

MainPage.propTypes = {
  page: PropTypes.string.isRequired
};

export default MainPage;
