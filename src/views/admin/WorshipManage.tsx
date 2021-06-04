import { Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { GridRowsProp, GridColDef, DataGrid, GridCellParams, GridColumnHeaderParams } from '@material-ui/data-grid';
import { AddCircle, Create, Delete } from '@material-ui/icons';
import clsx from 'clsx';
import RouterBreadcrumbs from 'components/Breadcrumbs/RouterBreadcrumbs';
import { useDeleteWorshipMutation, useWorshipsQuery, Worship } from 'generated/graphql';
import useLanguage from 'hooks/useLanguage';
import moment from 'moment';
import { SyntheticEvent, useEffect, useState } from 'react'
import { useIntl } from 'react-intl';
import { useHistory, useLocation } from 'react-router-dom';
import { RootStore } from 'store';
import useGlobalStyles from 'styles/styles';
import shallow from 'zustand/shallow';

const useStyles = makeStyles(theme => ({
  success: {
    backgroundColor: green[700],
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: green[600]
    }
  }
}))

function WorshipManage() {

  const globalClasses = useGlobalStyles()
  const classes = useStyles()

  const [locale] = useLanguage()

  const intl = useIntl()

  const location = useLocation();

  const history = useHistory();

  const setModalError = RootStore.useMuiModalStore(state => state.setError)

  const { loading, data: worshipData, refetch } = useWorshipsQuery({ notifyOnNetworkStatusChange: true })

  const [setMessage, setPositiveFn] = RootStore.useDecisionStore(state => [state.setMessage, state.setPositiveFn], shallow)

  function onDeleteClicked(e: SyntheticEvent, id: any) {
    e.preventDefault()
    setMessage('確認刪除?')
    setPositiveFn(() => {
      deleteWorship({
        variables: {
          input: id
        }
      }).then(res => {
        refetch()
      })
        .catch((err: any) => {
          setModalError(err)
        })
    })
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

  const [deleteWorship, { loading: deleteLoading }] = useDeleteWorshipMutation()

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
  }, [locale, intl])

  useEffect(() => {
    worshipData && refetch();
  }, [location, refetch, worshipData])

  return (
    <>
      {deleteLoading && <LinearProgress className={globalClasses.progress} />}
      <RouterBreadcrumbs />
      <Typography className={globalClasses.adminPageTitle} variant="h5">崇拜管理</Typography>
      <Button
        className={clsx(classes.success, "my-3")}
        variant="contained"
        startIcon={<AddCircle />}
        onClick={() => history.push('/admin/worship/new')}
      >建立</Button>
      <div style={{ width: '100%' }}>
        <DataGrid loading={loading} autoHeight pageSize={10} rows={data} columns={columns} />
      </div>
    </>
  )
}

export default WorshipManage;