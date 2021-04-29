import { useMutation, useQuery } from '@apollo/client';
import { Button, Typography } from '@material-ui/core';
import { GridRowsProp, GridColDef, DataGrid, GridCellParams, GridColumnHeaderParams } from '@material-ui/data-grid';
import { Create, Delete } from '@material-ui/icons';
import { decisionRequest, setLoading } from 'actions';
import { Worship } from 'generated/graphql';
import { DELETE_WORSHIP, GET_WORSHIPS } from 'graphqls/graphql';
import useLanguage from 'hooks/useLanguage';
import moment from 'moment';
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { WorshipListItemType } from 'views/worship/types/types';

function WorshipManage2() {

  const [locale] = useLanguage()

  const intl = useIntl()

  const dispatch = useDispatch();

  const location = useLocation();

  const history = useHistory();

  const { loading, data: worshipData, refetch } = useQuery<{ worships: Worship[] }>(GET_WORSHIPS, { notifyOnNetworkStatusChange: true })

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
    { field: 'date', headerName: '日期', flex: .35, disableClickEventBubbling: true },
    { field: 'title', headerName: '講題', flex: 1, disableClickEventBubbling: true },
    { field: 'messenger', headerName: '講員', flex: .35, disableClickEventBubbling: true },
    {
      field: 'worshipId',
      flex: .35,
      disableClickEventBubbling: true,
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

  const [deleteWorship, { data: deleteResult }] = useMutation<
    { deleteWorship: any },
    { input: string }
  >(DELETE_WORSHIP)

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
      <Typography variant="h4">崇拜管理</Typography>
      <div style={{ height: 300, width: '100%' }}>
        <DataGrid loading={loading} autoHeight pageSize={10} rows={data} columns={columns} />
      </div>
    </>
  )
}

export default WorshipManage2;