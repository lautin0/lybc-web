import { Typography, Grow } from "@material-ui/core";
import { DataGrid, GridCellParams, GridColDef, GridRowId, GridRowsProp } from "@material-ui/data-grid";
import { Delete } from "@material-ui/icons";
import RouterBreadcrumbs from "components/Breadcrumbs/RouterBreadcrumbs";
import ExtendColorButton from "components/Buttons/ExtendColorButton";
import { useAllPostsQuery, useDeletePostsMutation, User } from "generated/graphql"
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { RootStore } from "store";
import useGlobalStyles from "styles/styles";
import { getTitleDisplay } from "utils/utils";
import shallow from "zustand/shallow";

const columns: GridColDef[] = [
   { field: '_id', hide: true },
   {
      field: 'user',
      headerName: '提交者',
      width: 200,
      renderCell: (params: GridCellParams) => (<>
         {(params.value as User).nameC + getTitleDisplay(params.value as User)}
      </>)
   },
   { field: 'title', headerName: '主題', width: 350 },
   {
      field: 'creDttm',
      headerName: '建立時間',
      width: 200,
      renderCell: (params: GridCellParams) => (<>
         {moment(params.value?.toString()).format('YYYY-MM-DD')}
      </>)
   }
]

export default function PostManage() {

   const globalClasses = useGlobalStyles()

   const [data, setData] = useState<GridRowsProp>([])
   const [selectionModel, setSelectionModel] = useState<GridRowId[]>([]);

   const [setDecisionMessage, setTitle, setPositiveFn] = RootStore.useDecisionStore(state => [state.setMessage, state.setTitle, state.setPositiveFn], shallow)
   const [setMessage, handleError] = RootStore.useMuiModalStore(state => [state.setMessage, state.setError], shallow)

   const { data: pData, loading, refetch } = useAllPostsQuery({ notifyOnNetworkStatusChange: true })
   const [deletePosts, { loading: deleteLoading }] = useDeletePostsMutation()

   useEffect(() => {
      if (pData) {
         setData(pData.allPosts.map((x, i) => ({ ...x, id: i })))
      }
   }, [pData])

   const handleDelete = useCallback(() => {
      if (selectionModel.length === 0) {
         setMessage("請選取記錄")
         return
      }
      setTitle("提示")
      setDecisionMessage("確認刪除?")
      setPositiveFn(() => deletePosts({
         variables: {
            input: data.filter(x => selectionModel.includes(x.id)).map(x => x._id)
         }
      }).then(res => {
         refetch()
         setSelectionModel([])
      }).catch(handleError))

   }, [refetch, data, deletePosts, handleError, selectionModel, setMessage, setPositiveFn, setDecisionMessage, setTitle])

   return <>
      <RouterBreadcrumbs />
      <Typography className={globalClasses.adminPageTitle} variant="h5">待審閱文章</Typography>
      <Grow in={selectionModel.length > 0}>
         <ExtendColorButton
            className="my-3"
            color="danger"
            variant="contained"
            startIcon={<Delete />}
            onClick={handleDelete}
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