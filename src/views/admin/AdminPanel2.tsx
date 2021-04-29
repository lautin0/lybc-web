import React, { useEffect } from 'react'
import LayoutContext from 'context/LayoutContext';
import AdminLayout from 'layouts/AdminLayout';
import useLayout from 'hooks/useLayout';
import { useHistory, useLocation } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import MemberManage from './MemberManage';
import NameCardManage from './NameCardManage';
import NewsCreate from './NewsCreate';
import OtherFunc from './OtherFunc';
import PageManage from './PageManage';
import PendingPostEdit from './PendingPostEdit';
import PendingPostManage from './PendingPostManage';
import PostCreate from './PostCreate';
import WorshipCreate from './WorshipCreate';
import WorshipEdit from './WorshipEdit';
import WorshipManage from './WorshipManage';
import { makeStyles, Toolbar } from '@material-ui/core';
import WorshipManage2 from './WorshipManage2';

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

   const history = useHistory()

   const location = useLocation()

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
      <AdminLayout>
         <Toolbar />
         <div className={classes.panel}>
            <div style={{ margin: '0px 48px 24px' }}>
               {(props.func == null
                  // || props.func === 'worships'
                  || props.func === 'other'
                  || props.func === 'members'
                  || props.func === 'page-management'
                  || props.func === 'books')
                  && <AdminHeader func={props.func} />}
               {props.func == null && <div style={{ marginLeft: 25, marginTop: 120 }}>
                  <h2 style={{ color: 'gray' }}><em>選擇想使用的功能 <span role="img" aria-label="cog image">⚙️</span></em></h2>
               </div>}
               <div className="content-panel">
                  {props.func === 'new-worship' && <WorshipCreate />}
                  {props.func === 'edit-worship' && <WorshipEdit />}
                  {props.func === 'worships' && <WorshipManage2 />}
                  {props.func === 'members' && <MemberManage />}
                  {props.func === 'other' && <OtherFunc />}
                  {props.func === 'page-management' && <PageManage />}
                  {props.func === 'new-post' && <PostCreate />}
                  {props.func === 'namecards' && <NameCardManage />}
                  {props.func === 'pending-posts' && <PendingPostManage />}
                  {props.func === 'new-proxy-posts' && <PendingPostEdit />}
                  {props.func === 'new-latests' && <NewsCreate />}
                  {/* {props.func === 'new-book' && <BooksCreate />}
                     {props.func === 'books' && <BooksManage />} */}
               </div>
            </div>
         </div>
      </AdminLayout>
   )
}