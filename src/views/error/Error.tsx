import React from "react";
import PropTypes from 'prop-types';

// core components

type ErrorPageProps = {
  error: string,
}

let ErrMsg: any = {
  401: 'Unauthorized',
  404: 'Not Found',
  0: 'Component Error'
}

function ErrorPage(props: ErrorPageProps) {
  return (
    <>
      {parseInt(props.error) !== 0 && <h1>Error: {props.error} {ErrMsg[props.error]}</h1>}
      {parseInt(props.error) === 0 && <div>
        <h1>Oops! There is something wrong.</h1>
        <a href="./">Return to homepage</a>
      </div>}
    </>
  );
}

ErrorPage.propTypes = {
  error: PropTypes.string.isRequired,
};

export default ErrorPage;
