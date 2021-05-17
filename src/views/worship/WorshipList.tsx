import { useEffect, useMemo, useState } from "react";

import moment from 'moment'
import { useHistory } from "react-router-dom";
import { useWorshipsQuery } from "generated/graphql";
import { useIntl } from "react-intl";
import useLanguage from "hooks/useLanguage";
import { Button, Container, CssBaseline } from "@material-ui/core";
import { DataGrid, GridCellParams, GridColDef, GridRowsProp, GridSortDirection } from "@material-ui/data-grid";
import { PlayArrow } from "@material-ui/icons";

function WorshipList() {

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
          color="primary"
          size="small"
          style={{ marginLeft: 16 }}
          startIcon={<PlayArrow />}
        >
          {intl.formatMessage({ id: "app.tables.goto" })}
        </Button>
      )
    },
  ], [intl])

  useEffect(() => {
    if (worshipData === undefined)
      return
    setData(worshipData.worships.map((x, i) => ({ ...x, id: i + 1 })))
  }, [worshipData])

  useEffect(() => {
    document.title = intl.formatMessage({ id: "app.menu.activity.online-sermon" })
  }, [locale])

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
            <DataGrid
              onRowClick={(param) => onCellClicked(param.row["worshipId"].toString())}
              loading={loading}
              autoHeight
              pageSize={5}
              rows={data}
              columns={columns}
              localeText={{
                noRowsLabel: intl.formatMessage({ id: "app.tables.no-record" })
              }}
              sortModel={[
                {
                  field: 'worshipId',
                  sort: 'desc' as GridSortDirection,
                }
              ]}              
            />
          </div>
        </Container>
      </div>
    </>
  );
}

export default WorshipList;