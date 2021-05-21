import React, { useEffect, useMemo } from "react";

import moment from 'moment';
import { useIntl } from "react-intl";
import { Container, CssBaseline, Button } from "@material-ui/core";
import { DataGrid, GridCellParams, GridColDef } from "@material-ui/data-grid";
import { SaveAlt } from "@material-ui/icons";

const data = [
  { id: 1, uri: 'https://drive.google.com/file/d/1MOytmDNIO_vAcp5N-wISOPJWCIpUoVm_/view?usp=sharing', date: moment('01/12/2019', 'DD/MM/YYYY').format('DD/MM/YYYY'), title: '聖誕特別刊 - 耶穌是我的牧羊人' },
  { id: 2, uri: 'https://drive.google.com/file/d/1wHbkcDRfIH6kbuleT9Wj9qEgS-2mD_O6/view?usp=sharing', date: moment('01/11/2019', 'DD/MM/YYYY').format('DD/MM/YYYY'), title: '盼望' },
  { id: 3, uri: 'https://drive.google.com/file/d/1lginTPl2mLvqQtqbRCHclBlUj2UjajHI/view?usp=sharing', date: moment('01/10/2019', 'DD/MM/YYYY').format('DD/MM/YYYY'), title: '世代的禱告' },
  { id: 4, uri: 'https://drive.google.com/file/d/1YWqPos_3fOPks2kzY2TvGE8E6pi95Le1/view?usp=sharing', date: moment('01/09/2019', 'DD/MM/YYYY').format('DD/MM/YYYY'), title: '和平之子' },
  { id: 5, uri: 'https://drive.google.com/file/d/1d9pFYF6kaVdiJPo8cGwVJsYsPIZC8-SZ/view?usp=sharing', date: moment('01/08/2019', 'DD/MM/YYYY').format('DD/MM/YYYY'), title: '行公義好憐憫' },
  { id: 6, uri: 'https://drive.google.com/file/d/1IU1luMHQpTC24iFyAFG7xmuNg0hj7hMC/view?usp=sharing', date: moment('01/07/2019', 'DD/MM/YYYY').format('DD/MM/YYYY'), title: '主的屬性 - 愛' },
  { id: 7, uri: 'https://drive.google.com/file/d/1IU1luMHQpTC24iFyAFG7xmuNg0hj7hMC/view?usp=sharing', date: moment('01/06/2019', 'DD/MM/YYYY').format('DD/MM/YYYY'), title: '主的見證人' }
]

function Journal() {

  const intl = useIntl()

  const columns: GridColDef[] = useMemo(() => [
    { field: 'date', headerName: intl.formatMessage({ id: "app.journal.publish-date" }), width: 200 },
    { field: 'title', headerName: intl.formatMessage({ id: "app.tables.topic" }), width: 500 },
    {
      field: 'uri',
      headerName: intl.formatMessage({ id: "app.download" }),
      width: 150,
      renderCell: (params: GridCellParams) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 16 }}
          onClick={(e) => window.open(params.value?.toString(), '_blank', 'noopener')}
        >
          <SaveAlt />
        </Button>
      )
    },
  ], [intl])

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
          <div style={{ width: '100%' }}>
            <CssBaseline />
            <DataGrid autoHeight pageSize={10} rows={data} columns={columns} />
          </div>
        </Container>
      </div>
    </>
  );
}

export default Journal;
