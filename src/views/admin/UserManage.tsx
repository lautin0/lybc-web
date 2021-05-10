import { Button, Chip, makeStyles, Typography } from "@material-ui/core";
import { blue, yellow } from "@material-ui/core/colors";
import { DataGrid, GridCellParams, GridColDef, GridColumnHeaderParams, GridRowsProp } from "@material-ui/data-grid";
import { Block, Build } from "@material-ui/icons";
import { useUsersQuery } from "generated/graphql";
import { SyntheticEvent, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

const useStyles = makeStyles(theme => ({
   badgeAdmin: {
      backgroundColor: yellow[800],
      color: theme.palette.primary.contrastText
   },
   badgeWorker: {      
      backgroundColor: blue[500],
      color: theme.palette.primary.contrastText
   }
}))

export default function UserManage() {

   const classes = useStyles()

   const history = useHistory()
   const location = useLocation()

   const { loading, data: uData, refetch } = useUsersQuery({ notifyOnNetworkStatusChange: true })

   const [data, setData] = useState<GridRowsProp>([])

   const columns: GridColDef[] = [
      { field: 'username', headerName: '用戶名稱', width: 200 },
      { field: 'name', headerName: '英文名稱', width: 200 },
      { field: 'nameC', headerName: '中文名稱', width: 200 },
      { field: 'title', headerName: '英文頭銜', hide: true, width: 200 },
      { field: 'titleC', headerName: '中文頭銜', width: 200 },
      {
         field: 'role',
         headerName: '角色',
         width: 200,
         renderCell: (params: GridCellParams) => {
            if (params.value === "WORKER")
               return <Chip className={classes.badgeWorker} label="教會同工" />
            else if (params.value === "ADMIN")
               return <Chip className={classes.badgeAdmin} label="網站管理員" />
            else
               return <></>
         }
      },
      {
         field: 'gender',
         headerName: '性別',
         width: 100,
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
               <Button
                  disabled={params.row['role'] == "ADMIN"}
                  variant="contained"
                  color="secondary"
                  size="small"
                  style={{ marginLeft: 16 }}
                  startIcon={<Block />}
                  // onClick={(e) => onEditClicked(e, params.row['username'])}
               >
                  停用
               </Button>
            </div>
         ),
      },
   ];

   function onEditClicked(e: SyntheticEvent, username: any) {
      e.preventDefault();
      history.push('/admin/user/' + username)
   }

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
         <Typography className="my-3" variant="h4">會員管理</Typography>
         <div style={{ width: '100%' }}>
            <DataGrid loading={loading} autoHeight pageSize={10} rows={data} columns={columns} />
         </div>
      </>
   )
}