import React, { useCallback, useContext, useEffect, useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Avatar, Button, Card, CardActions, CardContent, Chip, Collapse, Divider, Grid, IconButton, Link } from '@material-ui/core';
import { FavouritePost, FavouritePostsDocument, PostStatus, useFavouritePostsQuery, usePendingPostsByUsernameQuery, useRemoveFavouritePostMutation, useUserQuery } from 'generated/graphql';
import { getTitleDisplay, getTokenValue } from 'utils/utils';
import UNIVERSALS from 'Universals';
import { AccountCircle, Delete, Edit, ExpandMore, GetApp, Visibility } from '@material-ui/icons';
import { useHistory, useLocation } from 'react-router-dom';
import { setSystemFailure } from 'actions';
import moment from 'moment';
import { FormattedDate } from 'react-intl';
import { css } from 'styles/styles';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
// import { usePendingPostStore } from 'store';
import { green, red, yellow, cyan, grey } from '@material-ui/core/colors';
import { Skeleton } from '@material-ui/lab';
import AuthContext from 'context/AuthContext';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  gridRowRoot: {
    marginTop: theme.spacing(2)
  },
  infoRoot: {
    padding: theme.spacing(5)
  },
  tabRoot: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(1.5),
    paddingLeft: '0px !important',
    paddingRight: '0px !important',
    paddingTop: '0px !important'
  },
  avatar: {
    border: '.1rem lightgray solid',
    width: theme.spacing(14),
    height: theme.spacing(14)
  },
  iconBtn: {
    width: theme.spacing(5),
    height: theme.spacing(5)
  },
  divider: {
    width: '100%'
  },
  postDateText: {
    marginLeft: theme.spacing(3),
    color: 'gray'
  },
  linkGrid: {
    cursor: 'pointer'
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
    color: theme.palette.secondary.contrastText
  },
  default: {
    backgroundColor: grey[500],
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
  circleLoading: {
    width: theme.spacing(14),
    height: theme.spacing(14)
  },
}));

const trimSubtitle = (txt: string) => {
  if (txt.length <= 100) {
    return txt
  } else {
    return txt.substring(0, 100) + '...'
  }
}

export default function PersonalMain() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const location = useLocation()
  const dispatch = useDispatch()
  const history = useHistory()

  const { tokenPair } = useContext(AuthContext)

  const { loading, data: userData, refetch } = useUserQuery({
    variables: { username: getTokenValue(tokenPair?.token).username }, notifyOnNetworkStatusChange: true
  })

  const { loading: favLoading, data: favPostData } = useFavouritePostsQuery({
    notifyOnNetworkStatusChange: true
  })

  const [removeFavPost, { loading: removeFavLoading }] = useRemoveFavouritePostMutation({
    refetchQueries: [
      { query: FavouritePostsDocument }
    ]
  })

  const [expanded, setExpanded] = useState<any>({});

  const handleExpandedClick = (id: string) => {
    setExpanded({
      ...expanded,
      [id]: !expanded[id]
    });
  }

  // const setPendingPostID = usePendingPostStore(state => state.setPendingPostID)
  // const setModalOpen = usePendingPostStore(state => state.setOpen)
  // const setTitle = usePendingPostStore(state => state.setTitle)

  const { data, loading: pPostLoading, refetch: pPostRefetch } = usePendingPostsByUsernameQuery({
    variables: { username: getTokenValue(tokenPair?.token).username }, notifyOnNetworkStatusChange: true
  })
  useEffect(() => {
    if (data != null)
      pPostRefetch()
  }, [pPostRefetch, location, data])

  const getStatus = (s: PostStatus) => {
    switch (s) {
      case PostStatus.Approved:
        return "已發佈"
      case PostStatus.Rejected:
        return "已拒絕"
      case PostStatus.Pending:
        return "待審閱"
      case PostStatus.Withhold:
        return "暫緩發佈"
      case PostStatus.Withdraw:
        return "已撤回"
    }
  }

  const handleClick = (id: any) => {
    // if ([PostStatus.Rejected, PostStatus.Withdraw, PostStatus.Approved].includes(status))
    //   return
    // setPendingPostID(id)
    // setModalOpen(true)
    // setTitle("app.modal.header.edit-sharing-record")
    history.push('/personal/sharing-status/' + id)
  }

  const handleRemoveFavPost = useCallback((id: string) => {
    if (loading || removeFavLoading)
      return
    removeFavPost({
      variables: {
        input: {
          postID: id
        },
      }
    }).catch(e => {
      dispatch(setSystemFailure(e))
    })
  }, [removeFavPost, dispatch, loading, removeFavLoading])

  useEffect(() => {
    favPostData && refetch();
  }, [location, refetch, favPostData])

  const navigate = (id: string) => {
    history.push('/sharing/' + id)
  }

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const getBadgeClassName = (s: PostStatus) => {
    switch (s) {
      case PostStatus.Approved:
        return classes.success
      case PostStatus.Rejected:
      case PostStatus.Withdraw:
        return classes.danger
      case PostStatus.Pending:
        return classes.warning
      case PostStatus.Withhold:
        return classes.default
    }
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Card variant="outlined">
          {loading && <CardContent>
            <Grid container spacing={3}>
              <Grid container item xs={12} justify="center">
                <Skeleton animation="wave" variant="circle" className={classes.circleLoading} />
              </Grid>
              <Grid container item justify="center">
                <Grid item xs={7}><Typography variant="h5"><Skeleton animation="wave" /></Typography></Grid>
                <Grid item xs={7}><Typography variant="h5"><Skeleton animation="wave" /></Typography></Grid>
              </Grid>
              <Grid container item justify="center" spacing={1}>
                <Grid item xs={9}>
                  <Typography variant="body2"><Skeleton animation="wave" /></Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="body2"><Skeleton animation="wave" /></Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="body2"><Skeleton animation="wave" /></Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="body2"><Skeleton animation="wave" /></Typography>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>}
          {!loading && <CardContent>
            <Grid container spacing={3}>
              <Grid container justify="flex-end">
                <Grid item>
                  <IconButton className={classes.iconBtn} onClick={() => history.push('/personal/settings')}>
                    <Edit />
                  </IconButton>
                </Grid>
              </Grid>
              <Grid container item xs={12} justify="center">
                {!userData?.user && <AccountCircle />}
                {userData?.user && <Avatar className={classes.avatar} src={UNIVERSALS.GOOGLE_STORAGE_ENDPOINT + userData.user.profilePicURI} />}
              </Grid>
              <Grid container item justify="center">
                <Typography variant="h5">{userData?.user?.name}</Typography>
              </Grid>
              <Grid container spacing={1} className={classes.infoRoot}>
                <Grid container item alignItems="center">
                  <Grid item xs={3}>
                    <Typography variant="body2">用戶名稱: </Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography>{userData?.user?.username}</Typography>
                  </Grid>
                </Grid>
                <Grid container item alignItems="center">
                  <Grid item xs={3}>
                    <Typography variant="body2">中文名字: </Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography>{userData?.user?.nameC}</Typography>
                  </Grid>
                </Grid>
                <Grid container item alignItems="center">
                  <Grid item xs={3}>
                    <Typography variant="body2">性別: </Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography>{userData?.user?.gender.toString() === "MALE" ? "男" : "女"}</Typography>
                  </Grid>
                </Grid>
                <Grid container item alignItems="center">
                  <Grid item xs={3}>
                    <Typography variant="body2">聯絡電話: </Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography>{userData?.user?.phone}</Typography>
                  </Grid>
                </Grid>
                <Grid container item alignItems="center">
                  <Grid item xs={3}>
                    <Typography variant="body2">電郵地址: </Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography>{userData?.user?.email}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container item direction="row" alignItems="center" spacing={1}>
                <Grid item>
                  <Typography>徽章: </Typography>
                </Grid>
                <Grid item>
                  {(userData?.user && (userData.user.role === "ADMIN" || userData?.user?.role === "WORKER")) && <Chip color="secondary" label={userData.user.role === "ADMIN" ? "網站管理人員" : (userData.user.role === "WORKER" ? "教會同工" : "")} />}
                </Grid>
              </Grid>
              <Grid container item direction="row" alignItems="center" spacing={1}>
                <Grid item>
                  <Typography>團隊: </Typography>
                </Grid>
                <Grid item>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>}
        </Card>
      </Grid>
      <Grid item xs={12} md={8} className={classes.tabRoot}>
        <AppBar position="static" color="default">
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" indicatorColor="primary" textColor="primary">
            <Tab label="喜愛列表" {...a11yProps(0)} />
            <Tab label="文章狀態" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          {(!favLoading && favPostData?.favouritePosts.length === 0) && <Grid container direction="column" spacing={3} style={{ color: 'gray' }}>
            <Grid container item xs={12} justify="center">
              <Typography variant="h5">
                沒有記錄
              </Typography>
            </Grid>
            <Grid container item xs={12} justify="center">
              <Typography>
                你可以在分享欄列表添加你喜愛的文章
              </Typography>
            </Grid>
          </Grid>}
          {favLoading && <Grid container direction="row" spacing={3} className={classes.gridRowRoot}>
            <Grid container item direction="column" xs={8} spacing={1}>
              <Grid container item direction="row" alignItems="center" spacing={2}>
                <Typography>
                  <Skeleton animation="wave" variant="circle" height={40} width={40} />
                </Typography>
                <Grid item>
                  <Typography variant="body2">
                    <Skeleton animation="wave" width={120} />
                  </Typography>
                  <Typography variant="body2">
                    <Skeleton animation="wave" width={100} />
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Skeleton height={30} animation="wave" />
              </Grid>
              <Grid item>
                <Skeleton height={30} animation="wave" />
              </Grid>
              <Grid item>
                <Skeleton height={30} animation="wave" />
              </Grid>
              <Grid item>
                <Skeleton height={25} width="70%" animation="wave" />
              </Grid>
            </Grid>
            <Grid xs={4} item>
              <Skeleton animation="wave" variant="rect" height={190} />
            </Grid>
          </Grid>}
          {(!favLoading && favPostData != null && favPostData?.favouritePosts?.length > 0) && favPostData?.favouritePosts.map((f, i) => {
            let p = f as FavouritePost
            return <Grid container key={p._id} direction="row" spacing={3} className={classes.gridRowRoot}>
              {i > 0 && <Divider className={classes.divider} />}
              <Grid container item direction="column" xs={8} spacing={3}>
                <Grid container item onClick={() => { navigate(p.post?._id) }} direction="row" className={classes.linkGrid}>
                  <Typography>
                    {p.post?.user.nameC}{getTitleDisplay(p.post!)}
                  </Typography>
                  <Typography className={classes.postDateText} variant="body2">
                    {<FormattedDate
                      value={moment(p.post?.creDttm, 'YYYY-MM-DDTHH:mm:ssZ').toDate()}
                      year="numeric"
                      month="short"
                      day="numeric"
                    />}
                  </Typography>
                </Grid>
                <Grid item style={{ fontSize: 18 }} className={clsx(css.blogHeader, classes.linkGrid)} onClick={() => { navigate(p.post?._id) }}>
                  <b>{p.post?.title}</b>
                </Grid>
                <Grid item className={clsx(css.blogQuote, classes.linkGrid)} onClick={() => { navigate(p.post?._id) }}>
                  {p.post?.subtitle && trimSubtitle(p.post?.subtitle)}
                </Grid>
                <Grid item>
                  <Button
                    size="small"
                    variant="contained"
                    color="default"
                    onClick={() => handleRemoveFavPost(p.post?._id)}
                    startIcon={<Delete />}
                  >
                    移除
                  </Button>
                </Grid>
              </Grid>
              <Grid xs={4} item className={css.blogImg} onClick={() => { navigate(p.post?._id) }}>
                {p.post?.imageURI != null && <img alt="blog cover" style={{ height: 150, width: 200 }} src={`${UNIVERSALS.GOOGLE_STORAGE_ENDPOINT}${p.post?.imageURI}`}></img>}
              </Grid>
              <Grid item className={css.blogImgMobile} onClick={() => { navigate(p.post?._id) }}>
                {p.post?.imageURI != null && <img alt="blog cover" src={`${UNIVERSALS.GOOGLE_STORAGE_ENDPOINT}${p.post?.imageURI}`}></img>}
              </Grid>
            </Grid>
          })}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {pPostLoading && <Grid container direction="row" spacing={3} className={classes.gridRowRoot}>
            <Grid container item direction="column" xs={8} spacing={1}>
              <Grid container item direction="row" alignItems="center" spacing={2}>
                <Typography>
                  <Skeleton animation="wave" variant="circle" height={40} width={40} />
                </Typography>
                <Grid item>
                  <Typography variant="body2">
                    <Skeleton animation="wave" width={120} />
                  </Typography>
                  <Typography variant="body2">
                    <Skeleton animation="wave" width={100} />
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Skeleton height={30} animation="wave" />
              </Grid>
              <Grid item>
                <Skeleton height={30} animation="wave" />
              </Grid>
              <Grid item>
                <Skeleton height={30} animation="wave" />
              </Grid>
              <Grid item>
                <Skeleton height={25} width="70%" animation="wave" />
              </Grid>
            </Grid>
            <Grid xs={4} item>
              <Skeleton animation="wave" variant="rect" height={190} />
            </Grid>
          </Grid>}
          {(!pPostLoading && data?.pendingPosts.length === 0) && <Grid container direction="column" spacing={3} style={{ color: 'gray' }}>
            <Grid container item xs={12} justify="center">
              <Typography variant="h5">
                沒有記錄
              </Typography>
            </Grid>
            <Grid container item xs={12} justify="center">
              <Typography>
                你可以在分享欄提交你的文章
              </Typography>
            </Grid>
          </Grid>}
          {(!loading) && <Grid container spacing={2}>
            {data?.pendingPosts && data!.pendingPosts.map((p) => {
              return (
                <Grid item key={p._id} xs={12}>
                  <Card variant="outlined">
                    <CardContent>
                      <Grid container spacing={1}>
                        <Grid container item justify="space-between" alignItems="center">
                          <Grid item>
                            狀態: <Chip className={getBadgeClassName(p.status)} label={getStatus(p.status)}></Chip>
                          </Grid>
                          <Grid item>
                            <IconButton onClick={() => handleClick(p._id)}>
                              <Visibility />
                            </IconButton>
                            <IconButton disabled={p.status !== PostStatus.Withhold} onClick={() => handleClick(p._id)}>
                              <Edit />
                            </IconButton>
                          </Grid>
                        </Grid>
                        <Grid container item justify="space-between">
                          <Grid item>
                            <Typography variant="h4">{p.title}</Typography>
                          </Grid>
                          <Grid item>
                            <Typography>
                              <FormattedDate
                                value={moment(p.creDttm, 'YYYY-MM-DDTHH:mm:ssZ').toDate()}
                                year="numeric"
                                month="short"
                                day="numeric"
                              />
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Typography variant="h5">{p.subtitle}</Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                    <CardActions disableSpacing>
                      <Link target="_blank" href={UNIVERSALS.GOOGLE_STORAGE_ENDPOINT + p.documentURI}>
                        <GetApp />
                      </Link>
                      <IconButton
                        className={clsx(classes.expand, {
                          [classes.expandOpen]: expanded[p._id],
                        })}
                        onClick={() => handleExpandedClick(p._id)}
                        aria-expanded={expanded[p._id]}
                        aria-label="show more"
                      >
                        <ExpandMore />
                      </IconButton>
                    </CardActions>
                    <Collapse in={expanded[p._id]} timeout="auto" unmountOnExit>
                      <CardContent>
                        <Typography paragraph>備註:</Typography>
                        <Typography paragraph>
                          {p.remarks != null ? p.remarks : "---"}
                        </Typography>
                      </CardContent>
                    </Collapse>
                  </Card>
                </Grid>
              )
            })}
          </Grid>}
        </TabPanel>
      </Grid>
    </Grid>
  );
}