import { useEffect, useMemo, useState } from "react";

import moment from 'moment'
import { useHistory } from "react-router-dom";
import { useWorshipsQuery } from "generated/graphql";
import { useIntl } from "react-intl";
import useLanguage from "hooks/useLanguage";
import { Button, Container, CssBaseline, makeStyles } from "@material-ui/core";
import { DataGrid, GridCellParams, GridColDef, GridRowsProp, GridSortDirection } from "@material-ui/data-grid";
import { YouTube } from "@material-ui/icons";
import { red } from "@material-ui/core/colors";
import CustomPagination from "components/DataGrid/Pagination/CustomPagination";
import CustomNoRowsOverlay from "components/DataGrid/GridOverlay/CustomGridOverlay";

const useStyles = makeStyles((theme) => ({
  goButton: {
    backgroundColor: '#fe0000',
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: red[600]
    }
  }
}))

function WorshipList() {

  const classes = useStyles()

  const [locale] = useLanguage()

  const intl = useIntl()

  const history = useHistory();

  const { loading, data: worshipData } = useWorshipsQuery()
  const [data, setData] = useState<GridRowsProp>([])

  function onCellClicked(id: any) {
    history.push('/worship/' + id)
  };

  const columns: GridColDef[] = useMemo(() => [
    {
      field: 'worshipId',
      headerName: intl.formatMessage({ id: "app.tables.date" }),
      width: 200,
      renderCell: (params: GridCellParams) => (
        <div>{moment(params.value?.toString(), 'YYYYMMDD').format('DD/MM/YYYY')}</div>
      )
    },
    {
      field: 'title',
      headerName: intl.formatMessage({ id: "app.tables.topic" }),
      width: 500,
      renderCell: (params) => {
        if (params.row["type"].toString() === "分享主日") {
          return <>分享主日</>
        } else {
          return <>{params.value}</>
        }
      }
    },
    { 
      field: 'messenger', 
      headerName: intl.formatMessage({ id: "app.tables.speaker" }), 
      width: 200,
      renderCell: (params) => {
        if (params.row["type"].toString() === "分享主日") {
          return <>---</>
        } else {
          return <>{params.value}</>
        }
      }
    },
    {
      field: 'link',
      renderHeader: (params) => (
        <></>
      ),
      width: 150,
      renderCell: (params: GridCellParams) => (
        <Button
          variant="contained"
          className={classes.goButton}
          size="small"
          style={{ marginLeft: 16 }}
          startIcon={<YouTube />}
        >
          {intl.formatMessage({ id: "app.tables.goto" })}
        </Button>
      )
    },
  ], [intl, classes])

  useEffect(() => {
    if (worshipData === undefined)
      return
    setData(worshipData.worships.map((x, i) => ({ ...x, id: i + 1 })))
  }, [worshipData])

  useEffect(() => {
    document.title = intl.formatMessage({ id: "app.menu.activity.online-sermon" })
  }, [locale, intl])

  useEffect(() => {
    //Default scroll to top
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <div
        className="section"
        id="download-section"
      >
        <Container>
          <div style={{ width: '100%', height: 400, marginBottom: 50 }}>
            <CssBaseline />
            <DataGrid
              onRowClick={(param) => onCellClicked(param.row["worshipId"].toString())}
              loading={loading}              
              pageSize={5}
              rows={data}
              columns={columns}
              // localeText={{
              //   noRowsLabel: intl.formatMessage({ id: "app.tables.no-record" })
              // }}
              sortModel={[
                {
                  field: 'worshipId',
                  sort: 'desc' as GridSortDirection,
                }
              ]}     
              components={{
                Pagination: CustomPagination,
                NoRowsOverlay: CustomNoRowsOverlay
              }}         
            />
          </div>
        </Container>
      </div>
    </>
  );
}

export default WorshipList;