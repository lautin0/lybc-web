import React, { useEffect } from 'react'
import LayoutContext from 'context/LayoutContext';
import AdminLayout from 'layouts/AdminLayout';
import useLayout from 'hooks/useLayout';
import { useHistory, useLocation } from 'react-router-dom';
import AdminHeader from '../AdminHeader';
import MemberManage from '../MemberManage';
import NameCardManage from '../NameCardManage';
import NewsCreate from '../NewsCreate';
import OtherFunc from '../OtherFunc';
import PageManage from '../PageManage';
import PendingPostEdit from '../PendingPostEdit';
import PendingPostManage from '../PendingPostManage';
import PostCreate from '../PostCreate';
import WorshipCreate from '../WorshipCreate';
import WorshipEdit from '../WorshipEdit';
import WorshipManage from '../WorshipManage';
import { makeStyles, Toolbar } from '@material-ui/core';
import WorshipManage2 from './WorshipManage2';
import PendingPostManage2 from './PendingPostManage2';
import NameCardManage2 from './NameCardManage2';
import PendingPostEdit2 from './PendingPostEdit2';

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
         <div className={classes.panel}>
            <div>
               {(
                  // props.func == null
                  // || props.func === 'worships'
                  // || props.func === 'other'
                  props.func === 'members'
                  || props.func === 'page-management'
                  || props.func === 'books')
                  && <AdminHeader func={props.func} />}
               {props.func == null && <div>
                  <h2 style={{ color: 'gray' }}><em>管理控制台 主頁 <span role="img" aria-label="cog image">⚙️</span></em></h2>
               </div>}
               <div>
                  {props.func === 'new-worship' && <WorshipCreate />}
                  {props.func === 'edit-worship' && <WorshipEdit />}
                  {props.func === 'worships' && <WorshipManage2 />}
                  {props.func === 'members' && <MemberManage />}
                  {props.func === 'other' && <OtherFunc />}
                  {props.func === 'page-management' && <PageManage />}
                  {props.func === 'new-post' && <PostCreate />}
                  {props.func === 'namecards' && <NameCardManage2 />}
                  {props.func === 'pending-posts' && <PendingPostManage2 />}
                  {props.func === 'new-proxy-posts' && <PendingPostEdit2 />}
                  {props.func === 'new-latests' && <NewsCreate />}
                  {/* {props.func === 'new-book' && <BooksCreate />}
                     {props.func === 'books' && <BooksManage />} */}
               </div>
            </div>
         </div>
      </AdminLayout>
   )
}