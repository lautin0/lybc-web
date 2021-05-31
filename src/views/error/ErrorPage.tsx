import { Button, CssBaseline } from "@material-ui/core";
import AntdResult, { ResultStatusType } from "components/ImitateAntd/AntdResult";
import React from "react";

type ErrorPageProps = {
  error: string,
}

let ErrMsg: any = {
  403: 'Sorry, you are unauthorized to access this page.',
  404: 'Sorry, the page you visited does not exist.',
  500: 'Sorry, something went wrong.',
  0: 'Component Error'
}

function ErrorPage(props: ErrorPageProps) {

  return (
    <div>
      <CssBaseline />
      {parseInt(props.error) !== 0 && <AntdResult
        status={props.error as ResultStatusType}
        title={props.error}
        subTitle={ErrMsg[props.error]}
        extra={<Button variant="outlined" color="primary" onClick={() => { window.location.href = '/' }}>Back Home</Button>}
      />}
      {parseInt(props.error) === 0 && <div>
        <h1>Oops! There is something wrong.</h1>
        <a href="./">Return to homepage</a>
      </div>}
    </div>
  );
}

export default ErrorPage;
