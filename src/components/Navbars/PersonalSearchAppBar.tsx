import { useContext, useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { NightsStay, WbSunny } from '@material-ui/icons';
import LayoutContext from 'context/LayoutContext';
import { useHistory } from 'react-router-dom';
import { Avatar, Link } from '@material-ui/core';
import UNIVERSALS from 'Universals';
import { getTokenValue, hasRole } from 'utils/utils';
import { Role, useUserProfilePicUriQuery } from 'generated/graphql';
import { useDispatch, useSelector } from 'react-redux';
import NotificationBell2 from 'components/Notification/NotificationBell2';
import NotificationContext from 'context/NotificationContext';
import { RootState } from 'reducers';
import { signOut } from 'actions';

const useStyles = makeStyles((theme) => ({
   appBar: {
      zIndex: theme.zIndex.drawer + 1,
   },
   grow: {
      flexGrow: 1,
   },
   menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
         display: 'none',
      },
   },
   title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
         display: 'block',
      },
      cursor: 'pointer'
   },
   search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
         backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
         marginLeft: theme.spacing(3),
         width: 'auto',
      },
   },
   searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
   },
   inputRoot: {
      color: 'inherit',
   },
   inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
         width: '20ch',
      },
   },
   sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
         display: 'flex',
      },
   },
   sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
         display: 'none',
      },
   },
   switchIcon: {
      display: 'inline-flex',
      verticalAlign: 'middle'
   },
   formLabel: {
      marginBottom: 0
   },
   small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
   }
}));

export default function PersonalSearchAppBar() {
   const classes = useStyles();
   const [anchorEl, setAnchorEl] = useState(null);
   const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
   const { mobileOpen, setMobileOpen, darkMode, setDarkMode } = useContext(LayoutContext)

   const history = useHistory()

   const dispatch = useDispatch()

   const tokenPair = useSelector((state: RootState) => state.auth.tokenPair);

   const { data: notificationData } = useContext(NotificationContext)!

   // const { loading, data: profilePicData } = useQuery<
   //    { user: User },
   //    QueryUserArgs
   // >(
   //    GET_USER_PROFILE_PIC_URI,
   //    {
   //       variables: {
   //          username: localStorage.getItem('token') != null ? getTokenValue(localStorage.getItem('token')).username : ''
   //       },
   //       notifyOnNetworkStatusChange: true
   //    }
   // )

   const { loading, data: profilePicData } = useUserProfilePicUriQuery({
      variables: {
         username: localStorage.getItem('token') != null ? getTokenValue(localStorage.getItem('token')).username : ''
      },
      notifyOnNetworkStatusChange: true
   })

   const handleDrawerToggle = () => {
      setMobileOpen && setMobileOpen(!mobileOpen);
   };

   const isMenuOpen = Boolean(anchorEl);
   const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

   const handleProfileMenuOpen = (event: any) => {
      setAnchorEl(event.currentTarget);
   };

   const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
   };

   const handleMenuClose = () => {
      setAnchorEl(null);
      handleMobileMenuClose();
   };

   const handleMobileMenuOpen = (event: any) => {
      setMobileMoreAnchorEl(event.currentTarget);
   };

   const handleChange = (event: any) => {
      setDarkMode && setDarkMode(!darkMode)
   };

   const menuId = 'primary-search-account-menu';
   const renderMenu = (
      <Menu
         anchorEl={anchorEl}
         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
         id={menuId}
         keepMounted
         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
         open={isMenuOpen}
         onClose={handleMenuClose}
      >
         <MenuItem onClick={() => history.push('/')} >回主頁</MenuItem>
         {(tokenPair && hasRole(tokenPair.token, Role.Admin)) && <MenuItem onClick={() => history.push('/admin/')}>管理控制台</MenuItem>}
         <MenuItem
            onClick={() => {
               dispatch(signOut())
               window.location.href = './'
            }}
            alignItems="center"
         >
            登出
         </MenuItem>
      </Menu>
   );

   const mobileMenuId = 'primary-search-account-menu-mobile';
   const renderMobileMenu = (
      <Menu
         anchorEl={mobileMoreAnchorEl}
         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
         id={mobileMenuId}
         keepMounted
         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
         open={isMobileMenuOpen}
         onClose={handleMobileMenuClose}
      >
         {/* <MenuItem>
            <IconButton aria-label="show 4 new mails" color="inherit">
               <Badge badgeContent={4} color="secondary">
                  <MailIcon />
               </Badge>
            </IconButton>
            <p>Messages</p>
         </MenuItem> */}
         <MenuItem onClick={() => history.push('/personal/notifications')}>
            <IconButton aria-label="show new notifications" color="inherit">
               <Badge badgeContent={notificationData && notificationData.notifications.filter(x => !x?.isRead).length} color="secondary">
                  <NotificationsIcon />
               </Badge>
            </IconButton>
            <Typography>Notifications</Typography>
         </MenuItem>
         <MenuItem onClick={handleProfileMenuOpen} alignItems="center">
            <IconButton
               aria-label="account of current user"
               aria-controls="primary-search-account-menu"
               aria-haspopup="true"
               color="inherit"
            >
               {(loading || profilePicData?.user?.profilePicURI == null) && <AccountCircle />}
               {(!loading && profilePicData?.user?.profilePicURI != null) && <Avatar className={classes.small} alt="profile pic" src={UNIVERSALS.GOOGLE_STORAGE_ENDPOINT + profilePicData?.user.profilePicURI} />}</IconButton>
            <Typography>Profile</Typography>
         </MenuItem>
      </Menu>
   );

   return (

      <div className={classes.grow}>
         <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
               <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerToggle}
               >
                  <MenuIcon />
               </IconButton>
               <Typography className={classes.title} variant="h6" noWrap>
                  <Link onClick={() => history.push('/personal/center')}>
                     個人中心
                  </Link>
               </Typography>
               <div className={classes.search}>
                  <div className={classes.searchIcon}>
                     <SearchIcon />
                  </div>
                  <InputBase
                     placeholder="Search…"
                     classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                     }}
                     inputProps={{ 'aria-label': 'search' }}
                  />
               </div>
               <div className={classes.grow} />
               <div className={classes.sectionDesktop}>
                  <FormControlLabel
                     control={<Switch color="default" checked={!!darkMode} onChange={handleChange} name="cbDarkMode" />}
                     className={classes.formLabel} label={!!darkMode ? <WbSunny className={classes.switchIcon} /> : <NightsStay className={classes.switchIcon} />}
                  />
                  {/* <IconButton aria-label="show 4 new mails" color="inherit">
                     <Badge badgeContent={4} color="secondary">
                        <MailIcon />
                     </Badge>
                  </IconButton> */}
                  <NotificationBell2 />
                  <IconButton
                     edge="end"
                     aria-label="account of current user"
                     aria-controls={menuId}
                     aria-haspopup="true"
                     onClick={handleProfileMenuOpen}
                     color="inherit"
                  >
                     {(loading || profilePicData?.user?.profilePicURI == null) && <AccountCircle />}
                     {(!loading && profilePicData?.user?.profilePicURI != null) && <Avatar className={classes.small} alt="profile pic" src={UNIVERSALS.GOOGLE_STORAGE_ENDPOINT + profilePicData?.user.profilePicURI} />}
                  </IconButton>
               </div>
               <div className={classes.sectionMobile}>
                  <IconButton
                     aria-label="show more"
                     aria-controls={mobileMenuId}
                     aria-haspopup="true"
                     onClick={handleMobileMenuOpen}
                     color="inherit"
                  >
                     <MoreIcon />
                  </IconButton>
               </div>
            </Toolbar>
         </AppBar>
         {renderMobileMenu}
         {renderMenu}
      </div>
   );
}