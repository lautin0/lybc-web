import { IconButton, Popper, Grow, Paper, ClickAwayListener, MenuList, MenuItem, Grid, Typography, Divider, Badge, makeStyles, Link } from '@material-ui/core';
import { Comment, Notifications, ThumbUp } from '@material-ui/icons';
import NotificationContext from 'context/NotificationContext';
import { Notification, NotificationType } from 'generated/graphql';
import moment from 'moment';
import { useContext } from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { getKeyValue, getTimePastStr } from 'utils/utils';
import * as presets from '../../assets/data/data.json'


const useStyles = makeStyles((theme) => ({
  // small: {
  //   width: theme.spacing(3),
  //   height: theme.spacing(3),
  // },
  bellMenuNoRecordRow: {
    display: 'flex',
    alignItems: 'center',
    minHeight: 50,
    width: '100%',
    justifyContent: 'center'
  },
  bellMenuViewAllRow: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(3)
  },
  bellMenuRoot: {
    minHeight: 65,
    whiteSpace: 'pre-wrap'
  },
  bellMenuText: {
    maxWidth: 290,
  }
}));

function NotificationBell2() {

  const classes = useStyles()

  const history = useHistory()

  const intl = useIntl()

  const { loading, data, handleClose, handleReadClick, anchorRef, handleToggle, handleListKeyDown, open } = useContext(NotificationContext)!

  return <div>
    <IconButton
      aria-label="show new notifications"
      color="inherit"
      ref={anchorRef}
      onClick={handleToggle}
    >
      <Badge badgeContent={data && data.notifications.filter(x => !x.isRead).length} color="secondary">
        <Notifications />
      </Badge>
    </IconButton>
    <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom', width: 400 }}
        >
          <Paper>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                {data && data.notifications.length === 0 && <Typography className={classes.bellMenuNoRecordRow}>{intl.formatMessage({ id: "app.notification.no-record" })}</Typography>}
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
                    {(idx !== data.notifications.length - 1) && <Divider />}
                  </div>
                })}
                {data && data.notifications.length > 0 && <Typography className={classes.bellMenuViewAllRow} component={Link} href="#"
                  onClick={(e: any) => {
                    e.preventDefault()
                    history.push('/personal/notifications')
                  }}
                >查看全部</Typography>}
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  </div>
}

export default NotificationBell2;