import React, { useEffect } from 'react'
import useNotification from 'hooks/useNotification';
import NotificationContext from 'context/NotificationContext';
import { makeStyles } from '@material-ui/core';
import PersonalLayout from 'layouts/PersonalLayout';
import NotificationPage from 'views/admin/revamp/NotificationPage';
import PersonalOther from '../PersonalOther';
import PersonalMain from './PersonalMain';
import PersonalSetting from './PersonalSetting';
import PersonalSharingSubmit from '../PersonalSharingSubmit';

type PersonalPageProps = {
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

export default function PersonalPage2(props: PersonalPageProps) {
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
      document.title = "個人中心"
   }, [])

   return (
      <NotificationContext.Provider value={methods}>
         <PersonalLayout>
            <div className={classes.panel}>
               <div>
                  {!props.func && <PersonalMain />}
                  {props.func === 'settings' && <PersonalSetting />}
                  {props.func === 'other' && <PersonalOther />}
                  {props.func === 'notifications' && <NotificationPage />}
                  {props.func === 'sharing' && <PersonalSharingSubmit />}
               </div>
            </div>
         </PersonalLayout>
      </NotificationContext.Provider>
   )
}