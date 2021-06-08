import { CardContent, Typography, CardActions, Card, Collapse, makeStyles, Chip, IconButton, Grid, Tooltip } from '@material-ui/core';
import { Edit, ExpandMore, PersonAdd } from '@material-ui/icons';
import clsx from 'clsx';
import RouterBreadcrumbs from 'components/Breadcrumbs/RouterBreadcrumbs';
import CustomLinearProgress from 'components/Loading/CustomLinearProgress';
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
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
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
  }
}))

const getStatus = (s: AccountStatus) => {
  switch (s) {
    case AccountStatus.Active:
      return "已處理"
    case AccountStatus.Inactive:
      return "擱置"
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
        return globalClasses.success
      case AccountStatus.Inactive:
        return globalClasses.default
      case AccountStatus.Pending:
        return globalClasses.danger
      case AccountStatus.Suspended:
        return globalClasses.warning
      case AccountStatus.Contacting:
        return globalClasses.info
    }
  }

  return (
    <>
      {loading && <CustomLinearProgress />}
      <RouterBreadcrumbs />
      <Typography className={globalClasses.adminPageTitle} variant="h5">新來賓名片</Typography>
      {(!loading && !data) && <Typography style={{ display: 'flex', justifyContent: 'center' }} variant="h5" color="textSecondary">沒有記錄</Typography>}
      {(!loading && data) && <>
        <Grid container spacing={2} className={classes.gridRoot}>
          {data!.nameCards.map((n) => (
            <Grid key={n._id} item xs={12} sm={6}>
              <Card className={classes.root} variant="outlined">
                <CardContent>
                  <Typography className={classes.title} color="textSecondary" gutterBottom style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>名字:</span><span>最後更新{moment(n.lupdDttm).format('LLL')}</span>
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