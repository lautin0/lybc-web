import { useEffect } from 'react'
import AdminLayout from 'layouts/AdminLayout';
import NewsCreate from '../NewsCreate';
import OtherFunc from '../OtherFunc';
import PageManage from '../PageManage';
import PostCreate from '../PostCreate';
import WorshipCreate from '../WorshipCreate';
import WorshipEdit from '../WorshipEdit';
import { makeStyles } from '@material-ui/core';
import WorshipManage2 from './WorshipManage2';
import PendingPostManage2 from './PendingPostManage2';
import NameCardManage2 from './NameCardManage2';
import PendingPostEdit2 from './PendingPostEdit2';
import useNotification from 'hooks/useNotification';
import NotificationContext from 'context/NotificationContext';
import UserManage from '../UserManage';
import UserEdit from '../UserEdit';
import UserCreate from '../UserCreate';
import AdminIndex from '../AdminIndex';

type AdminPanelProps = {
   func: string
}

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
   panel: {
      [theme.breakpoints.up('sm')]: {
         paddingLeft: drawerWidth
      },
   }
}))

export default function AdminPanel2(props: AdminPanelProps) {

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
            {!props.func && <div className={classes.panel}><AdminIndex /></div>}
            {props.func && <div className={classes.panel}>
               {props.func === 'new-worship' && <WorshipCreate />}
               {props.func === 'edit-worship' && <WorshipEdit />}
               {props.func === 'worships' && <WorshipManage2 />}
               {props.func === 'users' && <UserManage />}
               {props.func === 'user' && <UserEdit />}
               {props.func === 'new-user' && <UserCreate />}
               {props.func === 'other' && <OtherFunc />}
               {props.func === 'page-management' && <PageManage />}
               {props.func === 'new-post' && <PostCreate />}
               {props.func === 'namecards' && <NameCardManage2 />}
               {props.func === 'pending-posts' && <PendingPostManage2 />}
               {props.func === 'new-proxy-posts' && <PendingPostEdit2 />}
               {props.func === 'new-news' && <NewsCreate />}
               {/* {props.func === 'notifications' && <NotificationPage />} */}
               {/* {props.func === 'new-book' && <BooksCreate />}
                     {props.func === 'books' && <BooksManage />} */}
            </div>}
         </AdminLayout>
      </NotificationContext.Provider >
   )
}