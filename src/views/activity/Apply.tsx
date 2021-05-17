import { Container, CssBaseline } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect } from "react";

import { useIntl } from "react-intl";

// import moment from 'moment'

const data: Array<any> = []

function Apply() {

  const intl = useIntl()

  useEffect(() => {
    //Default scroll to top
    window.scrollTo(0, 0)
  }, [])

  function onCellClicked(uri: string) {
    window.open(uri, '_blank');
  };

  return (
    <>
      <div
        //className="section section-download"
        className="section"
        id="download-section"
      >
        <Container>
          <div style={{ width: '100%', marginBottom: 50 }}>
            <CssBaseline />
            <DataGrid
              rows={[]}
              columns={[]}
              autoHeight
              localeText={{
                noRowsLabel: intl.formatMessage({ id: "app.tables.no-record" })
              }}
            />
          </div>
        </Container>
      </div>
    </>
  );
}

export default Apply;
