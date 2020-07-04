import React from "react";
import PropTypes from 'prop-types';

// core components

type ErrorPageProps = {
  error: string,
}

function ErrorPage(props: ErrorPageProps) {

  return (
    <>
      <h1>Error: {props.error}</h1>
    </>
  );
}

ErrorPage.propTypes = {
  error: PropTypes.string.isRequired,
};

export default ErrorPage;
