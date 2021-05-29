import { Button, Chip, makeStyles, Typography } from '@material-ui/core';
import { cyan, green, grey, red, yellow } from '@material-ui/core/colors';
import { DataGrid, GridCellParams, GridColDef, GridColumnHeaderParams, GridRowsProp } from '@material-ui/data-grid';
import { Create } from '@material-ui/icons';
import RouterBreadcrumbs from 'components/Breadcrumbs/RouterBreadcrumbs';
import { PostStatus, usePendingPostsQuery } from 'generated/graphql';
import moment, { Moment } from 'moment';
import { SyntheticEvent, useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  success: {
    backgroundColor: green[600],
    color: theme.palette.primary.contrastText
  },
  danger: {
    backgroundColor: red[700],
    color: theme.palette.primary.contrastText
  },
  warning: {
    backgroundColor: yellow[800],
    color: theme.palette.primary.contrastText
  },
  default: {
    backgroundColor: grey[500],
    color: theme.palette.primary.contrastText
  },
  info: {
    backgroundColor: cyan[800],
    color: theme.palette.primary.contrastText
  }
}))

type PendingPostRowProps = {
  _id: string,
  title: string,
  username: string,
  creDttm: Moment,
  subtitle: string,
  status: string,
}

function PendingPostManage() {

  const classes = useStyles()

  const location = useLocation();

  const history = useHistory();

  const { loading, data: pPostData, refetch } = usePendingPostsQuery({ notifyOnNetworkStatusChange: true })

  function onEditClicked(e: SyntheticEvent, id: any) {
    e.preventDefault();
    history.push('/admin/post/pending/' + id)
  }

  const columns: GridColDef[] = [
    { field: 'creDttm', headerName: '投稿日期', width: 150 },
    { field: 'title', headerName: '標題', width: 300 },
    { field: 'username', headerName: '投稿人', width: 200 },
    {
      field: 'status',
      width: 150,
      headerName: '狀態',
      renderCell: (params: GridCellParams) => (
        <Chip label={getStatus(params.value as PostStatus)} className={getBadgeClassName(params.value as PostStatus)} />
      ),
    },
    {
      field: '_id',
      width: 100,
      renderHeader: (params: GridColumnHeaderParams) => (
        <></>
      ),
      renderCell: (params: GridCellParams) => (
        <div>
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<Create />}
            onClick={(e) => onEditClicked(e, params.value)}
          >
            檢視
          </Button>
        </div>
      ),
    },
  ];

  const [data, setData] = useState<GridRowsProp>([])

  useEffect(() => {
    if (pPostData === undefined)
      return
    let tmp: Array<PendingPostRowProps> = pPostData.pendingPosts != null ? [...pPostData.pendingPosts] : []
    setData(tmp?.sort((a: PendingPostRowProps, b: PendingPostRowProps) => {
      if (a.creDttm > b.creDttm) {
        return -1
      } else if (a.creDttm < b.creDttm) {
        return 1
      } else {
        return 0
      }
    })
      .map((x: PendingPostRowProps, idx: number): any => {
        return {
          id: idx,
          _id: x._id,
          title: x.title,
          username: x.username,
          creDttm: moment(x.creDttm, 'YYYYMMDD').format('YYYY-MM-DD'),
          subtitle: x.subtitle,
          status: x.status,
        }
      }))
  }, [pPostData])

  const getBadgeClassName = (s: PostStatus) => {
    switch (s) {
      case PostStatus.Approved:
        return classes.success
      case PostStatus.Rejected:
      case PostStatus.Withdraw:
        return classes.danger
      case PostStatus.Pending:
        return classes.warning
      case PostStatus.Withhold:
        return classes.default
    }
  }

  const getStatus = (s: PostStatus) => {
    switch (s) {
      case PostStatus.Approved:
        return "已發佈"
      case PostStatus.Rejected:
        return "已拒絕"
      case PostStatus.Pending:
        return "待審閱"
      case PostStatus.Withhold:
        return "暫緩發佈"
      case PostStatus.Withdraw:
        return "已撤回"
    }
  }

  useEffect(() => {
    pPostData && refetch();
  }, [location, refetch, pPostData])

  return (
    <>
      <RouterBreadcrumbs />
      <Typography className="my-3" variant="h5">審閱文章</Typography>
      <div style={{ width: '100%' }}>
        <DataGrid loading={loading} autoHeight pageSize={10} rows={data} columns={columns} />
      </div>
    </>
  )
}

export default PendingPostManage;