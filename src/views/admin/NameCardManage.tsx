import { CardContent, Typography, CardActions, Card, Collapse, makeStyles, Chip, IconButton, Grid, LinearProgress, Tooltip } from '@material-ui/core';
import { cyan, green, red, yellow } from '@material-ui/core/colors';
import { Edit, ExpandMore, PersonAdd } from '@material-ui/icons';
import clsx from 'clsx';
import RouterBreadcrumbs from 'components/Breadcrumbs/RouterBreadcrumbs';
import { AccountStatus, Gender, useNameCardsQuery } from 'generated/graphql';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import useGlobalStyles from 'styles/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  gridRoot: {
    flexGrow: 1
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  success: {
    backgroundColor: green[600],
    color: theme.palette.primary.contrastText
  },
  danger: {
    backgroundColor: red[600],
    color: theme.palette.primary.contrastText
  },
  warning: {
    backgroundColor: yellow[600],
    color: theme.palette.primary.contrastText
  },
  primary: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  info: {
    backgroundColor: cyan[800],
    color: theme.palette.primary.contrastText
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  progress: {
    marginTop: -20,
    position: 'fixed',
    width: 'calc(100% - 300px)',
    zIndex: 1,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginTop: -30,
      left: 0
    }
  }
}))

const getStatus = (s: AccountStatus) => {
  switch (s) {
    case AccountStatus.Active:
      return "已處理"
    case AccountStatus.Inactive:
      return "取消申請"
    case AccountStatus.Pending:
      return "待接觸"
    case AccountStatus.Suspended:
      return "暫緩申請"
    case AccountStatus.Contacting:
      return "跟進中"
  }
}

export default function NameCardManage() {

  const globalClasses = useGlobalStyles()
  const classes = useStyles()

  const location = useLocation()
  const history = useHistory()

  const { data, loading, refetch } = useNameCardsQuery({ notifyOnNetworkStatusChange: true })

  const [expanded, setExpanded] = useState<any>({});

  const handleClick = (id: string) => {
    setExpanded({
      ...expanded,
      [id]: !expanded[id]
    });
  }

  useEffect(() => {
    if (data && refetch)
      refetch()
  }, [refetch, location, data])

  const getBadgeClassName = (s: AccountStatus) => {
    switch (s) {
      case AccountStatus.Active:
        return classes.success
      case AccountStatus.Inactive:
        return classes.danger
      case AccountStatus.Pending:
        return classes.danger
      case AccountStatus.Suspended:
        return classes.warning
      case AccountStatus.Contacting:
        return classes.info
    }
  }

  return (
    <>
      {loading && <LinearProgress className={classes.progress} />}
      {!loading && <>
        <RouterBreadcrumbs />
        <Typography className={globalClasses.adminPageTitle} variant="h5">新來賓名片</Typography>
        <Grid container spacing={2} className={classes.gridRoot}>
          {data!.nameCards.map((n) => (
            <Grid key={n._id} item xs={12} sm={6}>
              <Card className={classes.root} variant="outlined">
                <CardContent>
                  <Typography className={classes.title} color="textSecondary" gutterBottom style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>名字:</span><span>{moment(n.lupdDttm).format('LLL')}</span>
                  </Typography>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {n.name}{` `}{n.gender === Gender.Male ? "先生" : (n.gender === Gender.Female ? "女士" : "")}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary" gutterBottom>
                    聯絡電話:
                  </Typography>
                  <Typography variant="h5" component="p" gutterBottom>
                    {n.phone}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary" gutterBottom>
                    電郵:
                  </Typography>
                  <Typography variant="h6" component="p" gutterBottom>
                    {n.email}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <div>
                    <Chip label={getStatus(n.status)} className={getBadgeClassName(n.status)} />
                    {n.status !== AccountStatus.Pending && <Tooltip title="編輯" aria-label="edit namecard">
                      <IconButton onClick={() => history.push('/admin/namecards/contact/' + n._id)}>
                        <Edit />
                      </IconButton>
                    </Tooltip>}
                    {n.status === AccountStatus.Pending && <Tooltip title="跟進" aria-label="start contacting">
                      <IconButton onClick={() => history.push('/admin/namecards/contact/' + n._id)}>
                        <PersonAdd />
                      </IconButton>
                    </Tooltip>}
                  </div>
                  <IconButton
                    className={clsx(classes.expand, {
                      [classes.expandOpen]: expanded[n._id],
                    })}
                    onClick={() => handleClick(n._id)}
                    aria-expanded={expanded[n._id]}
                    aria-label="show more"
                  >
                    <ExpandMore />
                  </IconButton>
                </CardActions>
                <Collapse in={expanded[n._id]} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography paragraph>備註:</Typography>
                    <Typography paragraph>
                      {n.remarks}
                    </Typography>
                  </CardContent>
                </Collapse>
              </Card>
            </Grid>
          ))}
        </Grid>
      </>}
    </>
  )
}