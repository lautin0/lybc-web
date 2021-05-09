import { Button, Typography } from '@material-ui/core';
import { GridRowsProp, GridColDef, DataGrid, GridCellParams, GridColumnHeaderParams } from '@material-ui/data-grid';
import { Create, Delete } from '@material-ui/icons';
import { decisionRequest, setLoading } from 'actions';
import { useDeleteWorshipMutation, useWorshipsQuery, Worship } from 'generated/graphql';
import useLanguage from 'hooks/useLanguage';
import moment from 'moment';
import { SyntheticEvent, useEffect, useState } from 'react'
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

function WorshipManage2() {

  const [locale] = useLanguage()

  const intl = useIntl()

  const dispatch = useDispatch();

  const location = useLocation();

  const history = useHistory();

  const { loading, data: worshipData, refetch } = useWorshipsQuery({ notifyOnNetworkStatusChange: true })

  function onDeleteClicked(e: SyntheticEvent, id: any) {
    e.preventDefault()
    dispatch(decisionRequest('確認刪除?', () => {
      dispatch(setLoading(true))
      deleteWorship({
        variables: {
          input: id
        }
      })
    }))
  };

  function onEditClicked(e: SyntheticEvent, id: any) {
    e.preventDefault();
    history.push('/admin/worship/' + id)
  }

  const columns: GridColDef[] = [
    { field: 'date', headerName: '日期', width: 150 },
    { field: 'title', headerName: '講題', width: 400 },
    { field: 'messenger', headerName: '講員', width: 250 },
    {
      field: 'worshipId',
      width: 250,
      renderHeader: (params: GridColumnHeaderParams) => (
        <></>
      ),
      renderCell: (params: GridCellParams) => (
        <div>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ marginLeft: 16 }}
            startIcon={<Create />}
            onClick={(e) => onEditClicked(e, params.value)}
          >
            修改
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            style={{ marginLeft: 16 }}
            startIcon={<Delete />}
            onClick={(e) => onDeleteClicked(e, params.value)}
          >
            刪除
          </Button>
        </div>
      ),
    },
  ];

  const [data, setData] = useState<GridRowsProp>([])

  const [deleteWorship, { data: deleteResult }] = useDeleteWorshipMutation()

  useEffect(() => {
    if (worshipData === undefined)
      return
    let tmp: Array<Worship> = worshipData.worships != null ? [...worshipData.worships] : []
    setData(tmp?.sort((a: Worship, b: Worship) => {
      if (a.worshipId > b.worshipId) {
        return -1
      } else if (a.worshipId < b.worshipId) {
        return 1
      } else {
        return 0
      }
    })
      .map((x: Worship, idx: number): any => {
        return {
          id: idx,
          worshipId: x.worshipId,
          date: moment(x.worshipId, 'YYYYMMDD').format('YYYY-MM-DD'),
          title: x.type === '分享主日' ? '分享主日' : x.title,
          messenger: x.messenger === '' ? '---' : x.messenger,
          type: x.type
        }
      }))
  }, [worshipData])

  useEffect(() => {
    document.title = intl.formatMessage({ id: "app.menu.activity.online-sermon" })
  }, [locale])

  useEffect(() => {
    if (deleteResult != null && deleteResult.deleteWorship > 0) {
      dispatch(setLoading(false))
      refetch()
    }
  }, [deleteResult, dispatch, refetch])

  useEffect(() => {
    worshipData && refetch();
  }, [location, refetch, worshipData])

  return (
    <>
      <Typography className="my-3" variant="h4">崇拜管理</Typography>
      <div style={{ width: '100%' }}>
        <DataGrid loading={loading} autoHeight pageSize={10} rows={data} columns={columns} />
      </div>
    </>
  )
}

export default WorshipManage2;