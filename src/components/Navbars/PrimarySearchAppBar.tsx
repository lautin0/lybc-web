import React, { useContext, useState } from 'react';
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
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { Brightness4, Comment, ThumbUp } from '@material-ui/icons';
import LayoutContext from 'context/LayoutContext';
import { useHistory } from 'react-router-dom';
import { Avatar, ClickAwayListener, Divider, Grid, Grow, Link, MenuList, Paper, Popper } from '@material-ui/core';
import { useMutation, useQuery } from '@apollo/client';
import { GET_NOTIFICATIONS, GET_USER_PROFILE_PIC_URI, READ_NOTIFICATIONS } from 'graphqls/graphql';
import UNIVERSALS from 'Universals';
import { getKeyValue, getTimePastStr, getTokenValue } from 'utils/utils';
import { Notification, NotificationType, User } from 'generated/graphql';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'reducers';
import * as presets from '../../assets/data/data.json'
import { setSystemFailure } from 'actions';
import moment from 'moment';

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
   },
   bellMenuRoot: {
      whiteSpace: 'pre-wrap'
   },
   bellMenuText: {
      maxWidth: 190,
   }
}));

export default function PrimarySearchAppBar() {
   const classes = useStyles();
   const [anchorEl, setAnchorEl] = useState(null);
   const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
   const { mobileOpen, setMobileOpen, darkMode, setDarkMode } = useContext(LayoutContext)

   const history = useHistory()

   const dispatch = useDispatch()

   const { loading, data: profilePicData } = useQuery<
      { user: User },
      { username: string }
   >(
      GET_USER_PROFILE_PIC_URI,
      {
         variables: {
            username: localStorage.getItem('token') != null ? getTokenValue(localStorage.getItem('token')).username : ''
         },
         notifyOnNetworkStatusChange: true
      }
   )

   const tokenPair = useSelector((state: RootState) => state.auth.tokenPair);

   const { loading: notiLoading, data, refetch } = useQuery<{ notifications: Notification[] }, { toUsername: string }>
      (GET_NOTIFICATIONS, { variables: { toUsername: getTokenValue(tokenPair?.token).username }, notifyOnNetworkStatusChange: true });
   const [readNotification] = useMutation<
      { readNotification: string },
      { input: string }
   >(READ_NOTIFICATIONS, {
      refetchQueries: [
         { query: GET_NOTIFICATIONS, variables: { toUsername: getTokenValue(tokenPair?.token).username } }
      ]
   })

   const [open, setOpen] = React.useState(false);
   const anchorRef = React.useRef<HTMLButtonElement>(null);

   const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
   };

   const handleClose = (event: React.MouseEvent<EventTarget>) => {
      if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
         return;
      }

      setOpen(false);
   };

   const handleReadClick = (i: number) => {
      if (data?.notifications[i].isRead)
         return
      const update = data?.notifications.map((e, idx) => {
         if (idx === i)
            return { ...e, isRead: true }
         return e
      })
      readNotification({
         variables: {
            input: update?.[i]._id
         }
      }).catch(e => {
         dispatch(setSystemFailure(e))
      })
   }

   function handleListKeyDown(event: React.KeyboardEvent) {
      if (event.key === 'Tab') {
         event.preventDefault();
         setOpen(false);
      }
   }

   // return focus to the button when we transitioned from !open -> open
   const prevOpen = React.useRef(open);
   React.useEffect(() => {
      if (prevOpen.current === true && open === false) {
         anchorRef.current!.focus();
      }

      prevOpen.current = open;
   }, [open]);

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
         <MenuItem onClick={() => history.push('/personal/')}>個人中心</MenuItem>
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
         <MenuItem>
            <IconButton aria-label="show 4 new mails" color="inherit">
               <Badge badgeContent={4} color="secondary">
                  <MailIcon />
               </Badge>
            </IconButton>
            <p>Messages</p>
         </MenuItem>
         <MenuItem>
            <IconButton aria-label="show 11 new notifications" color="inherit">
               <Badge badgeContent={11} color="secondary">
                  <NotificationsIcon />
               </Badge>
            </IconButton>
            <p>Notifications</p>
         </MenuItem>
         <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton
               aria-label="account of current user"
               aria-controls="primary-search-account-menu"
               aria-haspopup="true"
               color="inherit"
            >
               <AccountCircle />
            </IconButton>
            <p>Profile</p>
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
                  <Link onClick={() => history.push('/admin/')}>
                     管理控制台
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
                     className={classes.formLabel} label={<Brightness4 className={classes.switchIcon} />}
                  />
                  {/* <IconButton aria-label="show 4 new mails" color="inherit">
                     <Badge badgeContent={4} color="secondary">
                        <MailIcon />
                     </Badge>
                  </IconButton> */}
                  <div>
                     <IconButton
                        aria-label="show 17 new notifications"
                        color="inherit"
                        ref={anchorRef}
                        onClick={handleToggle}
                     >
                        <Badge badgeContent={data && data.notifications.filter(x => !x.isRead).length} color="secondary">
                           <NotificationsIcon />
                        </Badge>
                     </IconButton>
                     <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                        {({ TransitionProps, placement }) => (
                           <Grow
                              {...TransitionProps}
                              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom', width: 300 }}
                           >
                              <Paper>
                                 <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                       {(!loading && data && data.notifications.length > 0) && data.notifications.map((e: Notification, idx: number) => {
                                          return <div key={e._id}>
                                             <MenuItem
                                                className={classes.bellMenuRoot}
                                                onClick={(evt) => {
                                                   history.push(`/${getKeyValue(presets.COMMON.NOTIFICATION_TYPE, e.type).PATH}/${e.param != null ? e.param : ''}`)
                                                   handleReadClick(idx)
                                                   handleClose(evt)
                                                }}
                                             >
                                                <Grid container spacing={3} alignItems="center">
                                                   <Grid item>
                                                      {e.type === NotificationType.Reaction ? <ThumbUp /> : <Comment />}
                                                   </Grid>
                                                   <Grid item>
                                                      <Grid container alignItems="center" className={classes.bellMenuText}>
                                                         <Typography>{(e.fromUsername == null ? "" : e.fromUsername) + " " + getKeyValue(presets.COMMON.NOTIFICATION_TYPE, e.type).LABEL}</Typography>
                                                      </Grid>
                                                      <Typography variant="body2">{getTimePastStr(moment(e.creDttm))}</Typography>
                                                   </Grid>
                                                   <Grid item className="ml-auto">
                                                      {!e.isRead && <Badge variant="dot" color="secondary"></Badge>}
                                                   </Grid>
                                                </Grid>
                                             </MenuItem>
                                             <Divider />
                                          </div>
                                       })}
                                    </MenuList>
                                 </ClickAwayListener>
                              </Paper>
                           </Grow>
                        )}
                     </Popper>
                  </div>
                  <IconButton
                     edge="end"
                     aria-label="account of current user"
                     aria-controls={menuId}
                     aria-haspopup="true"
                     onClick={handleProfileMenuOpen}
                     color="inherit"
                  >
                     {(loading || profilePicData?.user.profilePicURI == null) && <AccountCircle />}
                     {(!loading && profilePicData?.user.profilePicURI != null) && <Avatar className={classes.small} alt={profilePicData?.user.username} src={UNIVERSALS.GOOGLE_STORAGE_ENDPOINT + profilePicData?.user.profilePicURI} />}
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