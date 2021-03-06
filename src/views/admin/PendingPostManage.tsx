import { Button, Typography } from '@material-ui/core';
import { GridCellParams, GridColDef, GridColumnHeaderParams, GridRowsProp } from '@material-ui/data-grid';
import { Create } from '@material-ui/icons';
import RouterBreadcrumbs from 'components/Breadcrumbs/RouterBreadcrumbs';
import ExtendColorChip from 'components/Chip/ExtendColorChip';
import CustomDataGrid from 'components/DataGrid/CustomDataGrid';
import { PostStatus, usePendingPostsQuery } from 'generated/graphql';
import moment, { Moment } from 'moment';
import { SyntheticEvent, useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom';
import useGlobalStyles from 'styles/styles';
import { getPostBadgeColorKey, getPostStatus } from 'utils/utils';

type PendingPostRowProps = {
  _id: string,
  title: string,
  username: string,
  creDttm: Moment,
  subtitle: string,
  status: string,
}

function PendingPostManage() {

  const globalClasses = useGlobalStyles()

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
        <ExtendColorChip color={getPostBadgeColorKey(params.value as PostStatus)} label={getPostStatus(params.value as PostStatus)} />
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

  useEffect(() => {
    pPostData && refetch();
  }, [location, refetch, pPostData])

  return (
    <>
      <RouterBreadcrumbs />
      <Typography className={globalClasses.adminPageTitle} variant="h5">審閱文章</Typography>
      <div style={{ width: '100%' }}>
        <CustomDataGrid loading={loading} autoHeight pageSize={10} rows={data} columns={columns} />
      </div>
    </>
  )
}

export default PendingPostManage;