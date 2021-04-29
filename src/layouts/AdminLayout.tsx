import {
   Collapse,
   createMuiTheme,
   CssBaseline,
   Divider,
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
import { Add, ExpandLess, ExpandMore, NoteAdd, RecentActors, Spellcheck, StarBorder, ViewQuilt } from '@material-ui/icons';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ClippedDrawer from 'components/Drawers/ClippedDrawer';
import PrimarySearchAppBar from 'components/Navbars/PrimarySearchAppBar';
import LayoutContext from 'context/LayoutContext';
import React, { FC, ReactElement, useCallback, useContext, useState } from 'react'
import MicIcon from '@material-ui/icons/Mic';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import BuildIcon from '@material-ui/icons/Build';
import { useHistory } from 'react-router-dom';

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
      title: "崇拜管理", path: '/admin/worships', children: [
         { title: "新增崇拜", path: '/admin/worship/new', icon: <Add /> },
         { title: "管理崇拜", path: '/admin/worships', icon: <ViewQuilt /> }
      ]
   },
   {
      title: "會員管理", path: '/admin/members', children: [
         { title: "會員管理", path: '/admin/members', icon: <PersonIcon /> },
         { title: "新來賓名片", path: '/admin/namecards', icon: <RecentActors /> }
      ]
   },
   {
      title: "頁面管理", path: '/admin/page-management', children: [
         { title: "新增文章", path: '/admin/post/new', icon: <Add /> },
         { title: "審閱文章", path: '/admin/post/pending', icon: <Spellcheck /> },
         { title: "新增消息", path: '/admin/latests/new', icon: <NoteAdd /> },
         { title: "頁面設定", icon: <BuildIcon /> }
      ]
   },
   {
      title: "其他功能", path: '/admin/other', children: [
         { title: "系統設定", icon: <BuildIcon /> }
      ]
   }
]

interface Props {

}

const AdminLayout: FC<Props> = (props): ReactElement<Props> => {
   const classes = useStyles();
   const { darkMode } = useContext(LayoutContext)

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
               {funcList.map((item, index) => (
                  item.children != null ? <div key={item.title}>
                     <ListItem button onClick={() => handleClick(item.title)}>
                        {/* <ListItemIcon>
                           {item.icon}
                        </ListItemIcon> */}
                        <ListItemText primary={<Typography variant="body1" className={classes.menuItem}>{item.title}</Typography>} className={classes.menuItem}/>
                        {expanded[item.title] ? <ExpandLess /> : <ExpandMore />}
                     </ListItem>
                     <Collapse in={expanded[item.title]} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                           {item.children.map((subItem, idx) => (
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
                        <ListItemText primary={<Typography variant="body1" className={classes.menuItem}>{item.title}</Typography>} className={classes.menuItem}/>
                     </ListItem>
               ))}
            </List>
            {/* <Divider />
            <List>
               {['All mail', 'Trash', 'Spam'].map((text, index) => (
                  <ListItem button key={text}>
                     <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                     <ListItemText primary={text} />
                  </ListItem>
               ))}
            </List> */}
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
         <PrimarySearchAppBar />
         <ClippedDrawer drawer={drawer} />
         <main className={classes.content}>
            {props.children}
         </main>
      </div>
   </ThemeProvider>
}

export default AdminLayout;