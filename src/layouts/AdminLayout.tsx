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
import { FC, ReactElement, useContext, useState } from 'react'
import PersonIcon from '@material-ui/icons/Person';
import BuildIcon from '@material-ui/icons/Build';
import { useHistory } from 'react-router-dom';
import MuiCommonModal from 'components/Modals/revamp/MuiCommonModal';

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
         { title: "會員管理", path: '/admin/other', icon: <PersonIcon /> },
         { title: "新來賓名片", path: '/admin/namecards', icon: <RecentActors /> }
      ]
   },
   {
      title: "頁面管理", path: '/admin/page-management', children: [
         { title: "新增文章", path: '/admin/post/new', icon: <Add /> },
         { title: "審閱文章", path: '/admin/post/pending', icon: <Spellcheck /> },
         { title: "新增消息", path: '/admin/latests/new', icon: <NoteAdd /> },
         { title: "頁面設定", path: '/admin/other', icon: <BuildIcon /> }
      ]
   },
   {
      title: "其他功能", path: '/admin/other', children: [
         { title: "系統設定", path: '/admin/other', icon: <BuildIcon /> }
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
                        <ListItemText primary={<Typography className={classes.menuItem}>{item.title}</Typography>} className={classes.menuItem} />
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
         <MuiCommonModal />
         <AdminSearchAppBar />
         <ClippedDrawer drawer={drawer} />
         <main className={classes.content}>
            {props.children}
         </main>
      </div>
   </ThemeProvider>
}

export default AdminLayout;