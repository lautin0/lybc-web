import { Button, Grow, makeStyles, Typography } from "@material-ui/core";
import red from "@material-ui/core/colors/red";
import { DataGrid, GridColDef, GridCellParams, GridRowsProp, GridRowId } from "@material-ui/data-grid";
import { Delete } from "@material-ui/icons";
import clsx from "clsx";
import RouterBreadcrumbs from "components/Breadcrumbs/RouterBreadcrumbs";
import { useAllNotificationsQuery, useDeleteNotificationsMutation } from "generated/graphql";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { RootStore } from "store";
import useGlobalStyles from "styles/styles";
import shallow from "zustand/shallow";

const columns: GridColDef[] = [
   { field: '_id', hide: true },
   { field: 'toUsername', headerName: '致用戶', width: 200 },
   { field: 'fromUsername', headerName: '從用戶', width: 200 },
   { field: 'type', headerName: '類型', width: 200 },
   { field: 'isRead', headerName: '已讀', width: 200 },
   {
      field: 'creDttm',
      headerName: '建立時間',
      width: 200,
      renderCell: (params: GridCellParams) => (<>
         {moment(params.value?.toString()).format('YYYY-MM-DD')}
      </>)
   },
]


const useStyles = makeStyles(theme => ({
   danger: {
      backgroundColor: red[600],
      color: theme.palette.primary.contrastText,
      "&:hover": {
         backgroundColor: red[500]
      }
   }
}))

export default function NotificationManage() {

   const globalClasses = useGlobalStyles()
   const classes = useStyles()

   const [data, setData] = useState<GridRowsProp>([])
   const [selectionModel, setSelectionModel] = useState<GridRowId[]>([]);

   const { data: nData, loading, refetch } = useAllNotificationsQuery({ notifyOnNetworkStatusChange: true })
   const [deleteNotifications, { loading: deleteLoading }] = useDeleteNotificationsMutation()

   const { handleError, setMessage } = RootStore.useMuiModalStore(state => ({ handleError: state.setError, setMessage: state.setMessage }), shallow)
   const { setPositiveFn, setDecisionMessage, setTitle } = RootStore.useDecisionStore(state => ({
      setPositiveFn: state.setPositiveFn,
      setDecisionMessage: state.setMessage,
      setTitle: state.setTitle
   }), shallow)

   useEffect(() => {
      if (nData) {
         setData(nData.allNotifications.map((x, i) => ({ ...x, id: i })))
      }
   }, [nData])

   const handleDelete = useCallback(() => {
      if (selectionModel.length === 0) {
         setMessage("請選取記錄")
         return
      }
      setTitle("提示")
      setDecisionMessage("確認刪除?")
      setPositiveFn(() => deleteNotifications({
         variables: {
            input: data.filter(x => selectionModel.includes(x.id)).map(x => x._id)
         }
      }).then(res => {
         refetch()
         setSelectionModel([])
      }).catch(handleError))

   }, [refetch, data, deleteNotifications, handleError, selectionModel, setMessage, setPositiveFn, setDecisionMessage, setTitle])

   return <>
      <RouterBreadcrumbs />
      <Typography className={globalClasses.adminPageTitle} variant="h5">通知管理</Typography>
      <Grow in={selectionModel.length > 0}>
         <Button
            className={clsx(classes.danger, "my-3")}
            variant="contained"
            startIcon={<Delete />}
            onClick={handleDelete}
         >刪除</Button>
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