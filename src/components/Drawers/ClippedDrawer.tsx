import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import React, { FC, ReactElement, useContext } from 'react';
import { Collapse, Hidden } from '@material-ui/core';
import { ExpandLess, ExpandMore, StarBorder } from '@material-ui/icons';
import LayoutContext from 'context/LayoutContext';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
   drawer: {
      [theme.breakpoints.up('sm')]: {
         width: drawerWidth,
         flexShrink: 0,
      },
   },
   drawerPaper: {
      width: drawerWidth,
   },
   drawerContainer: {
      overflow: 'auto',
   },
   nested: {
      paddingLeft: theme.spacing(4),
   },
}));

interface Props {
   window?: any
}

const ClippedDrawer: FC<Props> = (props): ReactElement => {
   const classes = useStyles();
   const { window } = props;
   const theme = useTheme();
   const { mobileOpen, setMobileOpen } = useContext(LayoutContext)

   const handleDrawerToggle = () => {
      setMobileOpen && setMobileOpen(!mobileOpen);
   };

   const [open, setOpen] = React.useState(false);

   const handleClick = () => {
      setOpen(!open);
   };

   const container = window !== undefined ? () => window().document.body : undefined;

   const drawer = (
      <>
         <Toolbar />
         <div className={classes.drawerContainer}>
            <List>
               {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                  text === 'Inbox' ? <div key={text}>
                     <ListItem button onClick={handleClick}>
                        <ListItemIcon>
                           <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Inbox" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                     </ListItem>
                     <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                           <ListItem button className={classes.nested}>
                              <ListItemIcon>
                                 <StarBorder />
                              </ListItemIcon>
                              <ListItemText primary="Starred" />
                           </ListItem>
                        </List>
                     </Collapse>
                  </div> :
                     <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                     </ListItem>
               ))}
            </List>
            <Divider />
            <List>
               {['All mail', 'Trash', 'Spam'].map((text, index) => (
                  <ListItem button key={text}>
                     <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                     <ListItemText primary={text} />
                  </ListItem>
               ))}
            </List>
         </div>
      </>
   )

   return (
      <nav className={classes.drawer} aria-label="mailbox folders">
         <Hidden smUp implementation="css">
            <Drawer
               container={container}
               anchor={theme.direction === 'rtl' ? 'right' : 'left'}
               variant="temporary"
               classes={{
                  paper: classes.drawerPaper,
               }}
               open={!!mobileOpen}
               onClose={handleDrawerToggle}
               ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
               }}
            >
               {drawer}
            </Drawer>
         </Hidden>
         <Hidden xsDown implementation="css">
            <Drawer
               className={classes.drawer}
               classes={{
                  paper: classes.drawerPaper,
               }}
               variant="permanent"
               open
            >
               {drawer}
            </Drawer>
         </Hidden>
      </nav>
   );
}

export default ClippedDrawer;