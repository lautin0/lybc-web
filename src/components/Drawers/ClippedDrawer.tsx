import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import React, { FC, ReactElement, useContext } from 'react';
import { Hidden } from '@material-ui/core';
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
   drawer: any
}

const ClippedDrawer: FC<Props> = (props): ReactElement => {
   const classes = useStyles();
   const { window, drawer } = props;
   const theme = useTheme();
   const { mobileOpen, setMobileOpen } = useContext(LayoutContext)

   const handleDrawerToggle = () => {
      setMobileOpen && setMobileOpen(!mobileOpen);
   };

   const container = window !== undefined ? () => window().document.body : undefined;

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