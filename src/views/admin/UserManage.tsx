import { Button, Typography } from "@material-ui/core";
import { GridCellParams, GridColDef, GridColumnHeaderParams, GridRowData, GridRowsProp } from "@material-ui/data-grid";
import { AddCircle, Block, Build } from "@material-ui/icons";
import RouterBreadcrumbs from "components/Breadcrumbs/RouterBreadcrumbs";
import ExtendColorButton from "components/Buttons/ExtendColorButton";
import ExtendColorChip from "components/Chip/ExtendColorChip";
import CustomDataGrid from "components/DataGrid/CustomDataGrid";
import CustomLinearProgress from "components/Loading/CustomLinearProgress";
import { AccountStatus, Role, useChangeAccountStatusMutation, useUsersQuery } from "generated/graphql";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { RootStore } from "store";
import useGlobalStyles from "styles/styles";
import { getRoleColorKey, getRoleDisplay } from "utils/utils";
import shallow from "zustand/shallow";

export default function UserManage() {

   const globalClasses = useGlobalStyles()

   const history = useHistory()
   const location = useLocation()

   const [setMessage, { setError: setModalError }] = RootStore.useMuiModalStore(state => [state.setMessage, { setError: state.setError }], shallow)
   const decision = RootStore.useDecisionStore()

   const { loading, data: uData, refetch } = useUsersQuery({ notifyOnNetworkStatusChange: true })
   const [changeStatus, { loading: changeStatLoading }] = useChangeAccountStatusMutation()

   const [data, setData] = useState<GridRowsProp>([])


   const onEditClicked = useCallback((e: any, username: any) => {
      history.push('/admin/user/' + username)
   }, [history])

   const onSuspendClicked = useCallback((row: GridRowData) => {
      decision.setMessage("確定停用帳戶?")
      decision.setPositiveFn(() => {
         changeStatus({
            variables: {
               username: row['username'],
               status: AccountStatus.Suspended
            }
         })
            .then(e => {
               setMessage('app.sys.save-success')
               history.push('/admin/users')
            }).catch(setModalError)
      })
   }, [decision, setModalError, history, changeStatus, setMessage])

   const columns: GridColDef[] = useMemo(() => [
      { field: 'dob', hide: true },
      { field: 'email', hide: true },
      { field: 'phone', hide: true },
      { field: 'username', headerName: '用戶名稱', width: 200 },
      { field: 'name', headerName: '英文名稱', width: 200 },
      { field: 'nameC', headerName: '中文名稱', width: 200 },
      { field: 'title', headerName: '英文頭銜', hide: true, width: 200 },
      { field: 'titleC', headerName: '中文頭銜', hide: true, width: 200 },
      {
         field: 'role',
         headerName: '角色',
         width: 150,
         renderCell: (params: GridCellParams) => {
            if (params.value === "WORKER" || params.value === "ADMIN" || params.value === "SUPER")
               return <ExtendColorChip color={getRoleColorKey(params.value as Role)} label={getRoleDisplay(params.value as Role)} />
            else
               return <></>
         }
      },
      {
         field: 'gender',
         headerName: '性別',
         width: 150,
         renderCell: (params: GridCellParams) => (
            <Typography>{params.value === "MALE" ? "男" : "女"}</Typography>
         ),
      },
      {
         field: '_id',
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
                  startIcon={<Build />}
                  onClick={(e) => onEditClicked(e, params.row['username'])}
               >
                  檢視
               </Button>
               {params.row['role'] !== "ADMIN" && <Button
                  disabled={params.row['status'] === "SUSPENDED"}
                  variant="contained"
                  color="secondary"
                  size="small"
                  style={{ marginLeft: 16 }}
                  startIcon={<Block />}
                  onClick={() => onSuspendClicked(params.row)}
               >
                  停用帳戶
               </Button>}
            </div>
         ),
      },
      {
         field: 'status',
         headerName: '狀態',
         width: 150,
         renderCell: (params: GridCellParams) => {
            if (params.value === "SUSPENDED")
               return <ExtendColorChip label="已停用" />
            else
               return <></>
         }
      },
   ], [onSuspendClicked, onEditClicked]);

   useEffect(() => {
      if (uData === undefined)
         return
      setData(uData.users.map((x, i) => ({ ...x, id: i })))
   }, [uData])

   useEffect(() => {
      uData && refetch();
   }, [location, refetch, uData])

   return (
      <>
         {changeStatLoading && <CustomLinearProgress />}
         <RouterBreadcrumbs />
         <Typography className={globalClasses.adminPageTitle} variant="h5">會員管理</Typography>
         <ExtendColorButton
            className="my-3"
            color="success"
            startIcon={<AddCircle />}
            onClick={() => history.push('/admin/user/new')}
         >建立</ExtendColorButton>
         <div style={{ width: '100%' }}>
            <CustomDataGrid loading={loading} autoHeight pageSize={10} rows={data} columns={columns} />
         </div>
      </>
   )
}