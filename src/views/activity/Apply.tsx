import { Container, CssBaseline } from "@material-ui/core";
import { GridColDef } from "@material-ui/data-grid";
import CustomDataGrid from "components/DataGrid/CustomDataGrid";
import { useEffect } from "react";

import { useIntl } from "react-intl";

function Apply() {
  const intl = useIntl()

  const columns: GridColDef[] = [
    { field: 'date', headerName: intl.formatMessage({ id: "app.tables.date" }), flex: .2 },
    { field: 'deadline', headerName: intl.formatMessage({ id: "app.deadline" }), flex: .2 },    
    { field: 'title', headerName: intl.formatMessage({ id:  "app.menu.activity.title" }), flex: .6 },
  ]

  useEffect(() => {
    //Default scroll to top
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <div
        //className="section section-download"
        className="section"
        id="download-section"
      >
        <Container>
          <div style={{ width: '100%', height: 400, marginBottom: 50 }}>
            <CssBaseline />
            <CustomDataGrid
              rows={[]}
              columns={columns}
            />
          </div>
        </Container>
      </div>
    </>
  );
}

export default Apply;
