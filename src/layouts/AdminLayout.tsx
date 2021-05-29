import {
   Collapse,
   createMuiTheme,
   CssBaseline,
   List,
   ListItem,
   ListItemIcon,
   ListItemText,
   makeStyles,
   ThemeOptions,
   ThemeProvider,
   Toolbar,
   Typography
} from '@material-ui/core';
import { Add, ExpandLess, ExpandMore, NoteAdd, RecentActors, Spellcheck, ViewQuilt } from '@material-ui/icons';
import ClippedDrawer from 'components/Drawers/ClippedDrawer';
import AdminSearchAppBar from 'components/Navbars/AdminSearchAppBar';
import LayoutContext from 'context/LayoutContext';
import React, { FC, ReactElement, useContext, useState } from 'react'
import PersonIcon from '@material-ui/icons/Person';
import BuildIcon from '@material-ui/icons/Build';
import { useHistory } from 'react-router-dom';
import MuiSharingModal from 'components/Modals/revamp/MuiSharingModal';
import MuiCommonModal from 'components/Modals/revamp/MuiCommonModal';
import MuiDecisionModal from 'components/Modals/revamp/MuiDecisionModal';
import { Role } from 'generated/graphql';
import AuthContext from 'context/AuthContext';
import { getTokenValue } from 'utils/utils';

const useStyles = makeStyles((theme) => ({
   root: {
      display: 'flex',
   },
   content: {
      flexGrow: 1,
      padding: theme.spacing(3),
   },
   drawerContainer: {
      overflow: 'auto',
   },
   nested: {
      paddingLeft: theme.spacing(4),
   },
   menuItem: {
      paddingLeft: theme.spacing(1),
      fontWeight: 600
   },
}));

const funcList = [
   {
      title: "崇拜管理", path: '/admin/worships', roles: [Role.Admin], children: [
         { title: "新增崇拜", path: '/admin/worship/new', roles: [Role.Admin], icon: <Add /> },
         { title: "管理崇拜", path: '/admin/worships', roles: [Role.Admin], icon: <ViewQuilt /> }
      ]
   },
   {
      title: "會員管理", path: '/admin/users', roles: [Role.Admin, Role.Worker], children: [
         { title: "會員管理", path: '/admin/users', roles: [Role.Admin], icon: <PersonIcon /> },
         { title: "新來賓名片", path: '/admin/namecards', roles: [Role.Admin, Role.Worker], icon: <RecentActors /> }
      ]
   },
   {
      title: "頁面管理", path: '/admin/page-management', roles: [Role.Admin, Role.Worker], children: [
         { title: "新增文章", path: '/admin/post/new', roles: [Role.Admin], icon: <Add /> },
         { title: "審閱文章", path: '/admin/post/pending', roles: [Role.Admin, Role.Worker], icon: <Spellcheck /> },
         { title: "新增消息", path: '/admin/news/new', roles: [Role.Admin, Role.Worker], icon: <NoteAdd /> },
         { title: "頁面設定", path: '/admin/other', roles: [Role.Admin, Role.Worker], icon: <BuildIcon /> }
      ]
   },
   {
      title: "其他功能", path: '/admin/other', roles: [Role.Admin], children: [
         { title: "系統設定", path: '/admin/other', roles: [Role.Admin], icon: <BuildIcon /> }
      ]
   }
]

interface Props {

}

const AdminLayout: FC<Props> = (props): ReactElement<Props> => {
   const classes = useStyles();
   const { darkMode } = useContext(LayoutContext)

   const { tokenPair } = useContext(AuthContext)

   const history = useHistory()
   const [expanded, setExpanded] = useState<any>({});

   const handleClick = (id: string) => {
      setExpanded({
         ...expanded,
         [id]: !expanded[id]
      });
   }
   const drawer = (
      <>
         <Toolbar />
         <div className={classes.drawerContainer}>
            <List>
               {funcList.filter(x => x.roles.includes(getTokenValue(tokenPair?.token).role as Role)).map((item, index) => (
                  item.children != null ? <div key={item.title}>
                     <ListItem button onClick={() => handleClick(item.title)}>
                        {/* <ListItemIcon>
                           {item.icon}
                        </ListItemIcon> */}
                        <ListItemText primary={<Typography className={classes.menuItem}>{item.title}</Typography>} className={classes.menuItem} />
                        {expanded[item.title] ? <ExpandLess /> : <ExpandMore />}
                     </ListItem>
                     <Collapse in={expanded[item.title]} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                           {item.children.filter(y => y.roles.includes(getTokenValue(tokenPair?.token).role as Role)).map((subItem, idx) => (
                              <ListItem key={idx} button className={classes.nested} onClick={() => { history.push(subItem.path!) }}>
                                 <ListItemIcon>
                                    {subItem.icon}
                                 </ListItemIcon>
                                 <ListItemText primary={subItem.title} />
                              </ListItem>
                           ))}
                        </List>
                     </Collapse>
                  </div> :
                     <ListItem button key={item.title} onClick={() => { history.push(item.path!) }}>
                        {/* <ListItemIcon>
                           {item.icon}
                        </ListItemIcon> */}
                        <ListItemText primary={<Typography className={classes.menuItem}>{item.title}</Typography>} className={classes.menuItem} />
                     </ListItem>
               ))}
            </List>
         </div>
      </>
   )

   const light: ThemeOptions = {

      palette: {

         type: 'light',

         // primary: {
         //    light: '#48ad88',
         //    main: '#007d5b',
         //    dark: '#005032',
         //    contrastText: '#fff',
         // },

         // secondary: {
         //    light: '#7b7bd5',
         //    main: '#494fa3',
         //    dark: '#0d2774',
         //    contrastText: '#fff',
         // },

      },

   }

   const dark: ThemeOptions = {

      palette: {

         type: 'dark',

         // primary: {
         //    light: '#48ad88',
         //    main: '#007d5b',
         //    dark: '#005032',
         //    contrastText: '#fff',
         // },

         // secondary: {
         //    light: '#7b7bd5',
         //    main: '#494fa3',
         //    dark: '#0d2774',
         //    contrastText: '#fff',
         // },

      },

   }

   const appliedTheme = createMuiTheme(darkMode ? dark : light)

   return <ThemeProvider theme={appliedTheme}>
      <div className={classes.root}>
         <CssBaseline />
         <MuiSharingModal />
         <MuiCommonModal />
         <MuiDecisionModal />
         <AdminSearchAppBar />
         <ClippedDrawer drawer={drawer} />
         <main className={classes.content}>
            {props.children}
         </main>
      </div>
   </ThemeProvider>
}

export default AdminLayout;