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
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import ClippedDrawer from 'components/Drawers/ClippedDrawer';
import AdminSearchAppBar from 'components/Navbars/AdminSearchAppBar';
import LayoutContext from 'context/LayoutContext';
import { FC, ReactElement, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom';
import MuiCommonModal from 'components/Modals/revamp/MuiCommonModal';
import MuiDecisionModal from 'components/Modals/revamp/MuiDecisionModal';
import { Role } from 'generated/graphql';
import AuthContext from 'context/AuthContext';
import { funcList, getTokenValue } from 'utils/utils';

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

const AdminLayout: FC = (props): ReactElement<{}> => {
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
               {funcList.filter(x => 
                  x.children.flatMap(y => y.roles).includes(getTokenValue(tokenPair?.token).role as Role) &&
                  x.children.some(y => !y.hideFromMenu)
               ).map((item, index) => (
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
                           {item.children.filter(y => y.roles.includes(getTokenValue(tokenPair?.token).role as Role) && !y.hideFromMenu).map((subItem, idx) => (
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