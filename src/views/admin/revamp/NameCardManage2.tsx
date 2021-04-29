import classes from '*.module.css';
import { useQuery } from '@apollo/client';
import { CardContent, Typography, CardActions, Card, Button, Collapse, makeStyles, Chip, IconButton, Grid } from '@material-ui/core';
import { cyan, green, red, yellow } from '@material-ui/core/colors';
import { ExpandMore } from '@material-ui/icons';
import clsx from 'clsx';
import { AccountStatus, Gender, NameCard } from 'generated/graphql';
import { GET_NAMECARDS } from 'graphqls/graphql';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';


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
}))

function NameCardManage2() {

  const classes = useStyles()
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const { data, loading, refetch } = useQuery<{ nameCards: NameCard[] }>(GET_NAMECARDS, { notifyOnNetworkStatusChange: true })

  const [expanded, setExpanded] = useState<any>({});

  const handleClick = (id: string) => {
    setExpanded({
      ...expanded,
      [id]: !expanded[id]
    });
  }

  useEffect(() => {
    if (data != null)
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
        return "接觸中"
    }
  }

  return (
    <>
      <Typography className="my-3" variant="h4">網上新來賓名單</Typography>
      <hr></hr>
      {loading && <Container>
        <div className="text-center">
          <div className="spinner-grow text-secondary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </Container>}
      {!loading && <Grid container spacing={3} className={classes.gridRoot}>
        {data!.nameCards.map((n, i) => (
          <Grid key={n._id} item xs={12} sm={4}>
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  名字:
                  </Typography>
                <Typography variant="h5" component="h2">
                  {n.name}{` `}{n.gender === Gender.Male ? "先生" : (n.gender === Gender.Female ? "女士" : "")}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  聯絡電話:
                  </Typography>
                <Typography variant="body2" component="p">
                  {n.phone}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  電郵:
                  </Typography>
                <Typography variant="body2" component="p">
                  {n.email}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <Chip label={getStatus(n.status)} className={getBadgeClassName(n.status)} />
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
                  <Typography>
                    {moment(n.lupdDttm).format('LLL')}
                  </Typography>
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
        ))}
      </Grid>}
    </>
  )
}

export default NameCardManage2;