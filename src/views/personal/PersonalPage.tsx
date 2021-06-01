import React, { useEffect } from 'react'
import useNotification from 'hooks/useNotification';
import NotificationContext from 'context/NotificationContext';
import { makeStyles } from '@material-ui/core';
import PersonalLayout from 'layouts/PersonalLayout';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
   panel: {
      [theme.breakpoints.up('sm')]: {
         paddingLeft: drawerWidth
      },
   }
}))

export default function PersonalPage(props: React.PropsWithChildren<{}>) {
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
                  {props.children}
               </div>
            </div>
         </PersonalLayout>
      </NotificationContext.Provider>
   )
}