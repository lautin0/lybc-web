import { Grow, Typography } from "@material-ui/core";
import { DataGrid, GridColDef, GridCellParams, GridRowsProp, GridRowId } from "@material-ui/data-grid";
import { Delete } from "@material-ui/icons";
import RouterBreadcrumbs from "components/Breadcrumbs/RouterBreadcrumbs";
import ExtendColorButton from "components/Buttons/ExtendColorButton";
import { useDeletePendingPostsMutation, usePendingPostsQuery } from "generated/graphql";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { RootStore } from "store";
import useGlobalStyles from "styles/styles";
import shallow from "zustand/shallow";

const columns: GridColDef[] = [
   { field: '_id', hide: true },
   {
      field: 'creDttm',
      headerName: '建立時間',
      width: 200,
      renderCell: (params: GridCellParams) => (<>
         {moment(params.value?.toString()).format('YYYY-MM-DD')}
      </>)
   },
   { field: 'username', headerName: '提交者', width: 200 },
   { field: 'title', headerName: '主題', width: 200 },
   { field: 'approveUsername', headerName: '批核人員', width: 200 },
   {
      field: 'approveDttm',
      headerName: '批核時間',
      width: 200,
      renderCell: (params: GridCellParams) => (<>
         {moment(params.value?.toString()).format('YYYY-MM-DD')}
      </>)
   },
   { field: 'status', headerName: '狀態', width: 200 }
]

export default function SuperPendingPostManage() {

   const globalClasses = useGlobalStyles()

   const [data, setData] = useState<GridRowsProp>([])
   const [selectionModel, setSelectionModel] = useState<GridRowId[]>([]);

   const { data: pData, loading, refetch } = usePendingPostsQuery({ notifyOnNetworkStatusChange: true })
   const [deletePendingPosts, { loading: deleteLoading }] = useDeletePendingPostsMutation()

   const [handleError, setMessage] = RootStore.useMuiModalStore(state => [state.setError, state.setMessage], shallow)
   const { setPositiveFn, setDecisionMessage, setTitle } = RootStore.useDecisionStore(state => ({
      setPositiveFn: state.setPositiveFn,
      setDecisionMessage: state.setMessage,
      setTitle: state.setTitle
   }), shallow)

   useEffect(() => {
      if (pData) {
         setData(pData.pendingPosts.map((x, i) => ({ ...x, id: i })))
      }
   }, [pData])

   const handleDelete = useCallback(() => {
      if (selectionModel.length === 0) {
         setMessage("請選取記錄")
         return
      }
      setTitle("提示")
      setDecisionMessage("確認刪除?")
      setPositiveFn(() => deletePendingPosts({
         variables: {
            input: data.filter(x => selectionModel.includes(x.id)).map(x => x._id)
         }
      }).then(res => {
         refetch()
         setSelectionModel([])
      }).catch(handleError))

   }, [refetch, data, deletePendingPosts, handleError, selectionModel, setMessage, setPositiveFn, setDecisionMessage, setTitle])

   return <>
      <RouterBreadcrumbs />
      <Typography className={globalClasses.adminPageTitle} variant="h5">待審閱文章</Typography>
      <Grow in={selectionModel.length > 0}>
         <ExtendColorButton
            className="my-3"
            variant="contained"
            startIcon={<Delete />}
            onClick={handleDelete}
            color="danger"
         >刪除</ExtendColorButton>
      </Grow>
      <div style={{ width: '100%', height: 400 }}>
         <DataGrid
            checkboxSelection
            loading={loading || deleteLoading}
            autoHeight
            pageSize={10}
            rows={data}
            columns={columns}
            onSelectionModelChange={(newSelection) => {
               setSelectionModel(newSelection.selectionModel);
            }}
            selectionModel={selectionModel}
         />
      </div>
   </>
}