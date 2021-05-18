import { Badge, Card, CardContent, Divider, Grid, makeStyles, MenuItem, Typography } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { Comment, ThumbUp } from "@material-ui/icons";
import NotificationContext from "context/NotificationContext";
import { Notification, NotificationType } from "generated/graphql";
import moment from 'moment';
import { useContext } from "react";
import { useHistory } from 'react-router-dom';
import { getKeyValue, getTimePastStr } from 'utils/utils';
import * as presets from '../../../assets/data/data.json'

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 80
  },
  listRoot: {
    // whiteSpace: 'pre-wrap'
    // overflowX: 'auto'
  },
  listText: {
    // maxWidth: 290,
  },
  noRecord: {
    color: grey[600],
    display: 'flex',
    fontSize: 24,
    justifyContent: 'center'
  }
}));

export default function NotificationPage() {

  const classes = useStyles()
  const history = useHistory()

  const { loading, data, handleReadClick } = useContext(NotificationContext)!

  return (
    <Grid container justify="center">
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Typography className="mb-3" variant="h5">通知</Typography>
            {(!loading && data && data.notifications.length === 0) && <Typography className={classes.noRecord}>沒有通知</Typography>}
            {(!loading && data && data.notifications.length > 0) && data.notifications.map((n, idx) => {
              let e = n as Notification
              return <MenuItem
                key={e._id}
                className={classes.listRoot}
                onClick={(evt) => {
                  history.push(`/${getKeyValue(presets.COMMON.NOTIFICATION_TYPE, e.type).PATH}/${e.param != null ? e.param : ''}`)
                  handleReadClick(idx)
                }}
              >
                <Grid className={classes.root} container spacing={3} alignItems="center">
                  <Grid container justify="center" item xs={2}>
                    {e.type === NotificationType.Reaction ? <ThumbUp /> : <Comment />}
                  </Grid>
                  <Grid item xs={8}>
                    <Grid container alignItems="center" className={classes.listText}>
                      <Typography>{(e.fromUsername == null ? "" : e.fromUsername) + " " + getKeyValue(presets.COMMON.NOTIFICATION_TYPE, e.type).LABEL}</Typography>
                    </Grid>
                    <Typography variant="body2">{getTimePastStr(moment(e.creDttm))}</Typography>
                  </Grid>
                  <Grid item xs={1} className="ml-auto">
                    {!e.isRead && <Badge variant="dot" color="secondary"></Badge>}
                  </Grid>
                </Grid>
                {(idx !== data.notifications.length - 1) && <Divider />}
              </MenuItem>
            })}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}