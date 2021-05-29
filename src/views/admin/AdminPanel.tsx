import { useEffect } from 'react'
import AdminLayout from 'layouts/AdminLayout';
import { makeStyles } from '@material-ui/core';
// import PendingPostEdit2 from './PendingPostEdit2';
import useNotification from 'hooks/useNotification';
import NotificationContext from 'context/NotificationContext';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
   panel: {
      [theme.breakpoints.up('sm')]: {
         paddingLeft: drawerWidth
      },
   }
}))

export default function AdminPanel(props: React.PropsWithChildren<{}>) {

   const classes = useStyles();

   const methods = useNotification()

   useEffect(() => {
      document.body.classList.add("sidebar-collapse");
      document.documentElement.classList.remove("nav-open");
      return function cleanup() {
         document.body.classList.remove("sidebar-collapse");
      };
   });

   useEffect(() => {
      document.title = "管理控制台"
   }, [])

   return (
      <NotificationContext.Provider value={methods}>
         <AdminLayout>
            <div className={classes.panel}>
               {props.children}
            </div>
         </AdminLayout>
      </NotificationContext.Provider>
   )
}