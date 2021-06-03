import { Card, CardContent, createStyles, Grid, makeStyles, Typography } from '@material-ui/core'
import Computer from '../../assets/img/computer.png'
import { Link, useLocation } from 'react-router-dom'
import { Mail } from '@material-ui/icons'
import { AccountStatus, PostStatus, useNameCardsQuery, usePendingPostsQuery } from 'generated/graphql'
import { useEffect } from 'react'

const useStyles = makeStyles((theme) => (
  createStyles({
    root: {
      paddingTop: 50
    },
    img: {
      width: 600,
      height: 'auto'
    },
    rebootLinks: {
      color: 'unset'
    },
    linkIndicator: {
      borderLeft: `.5rem solid ${theme.palette.secondary.main}`,
      paddingLeft: '1rem'
    },
    cardMargins: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
    },
    cardButtonMargins: {
      marginTop: theme.spacing(2),
    }
  })
))

export default function AdminIndex() {
  const classes = useStyles()

  const location = useLocation()

  const { data: pendingPosts, refetch: pendingPostsRefetch } = usePendingPostsQuery({ notifyOnNetworkStatusChange: true })
  const { data: namecards, refetch: namecardsRefetch } = useNameCardsQuery({ notifyOnNetworkStatusChange: true })

  useEffect(() => {
    if (pendingPostsRefetch)
      pendingPostsRefetch()
    if (namecardsRefetch)
      namecardsRefetch()
  }, [location, pendingPostsRefetch, namecardsRefetch])

  return <Grid container spacing={3} className={classes.root}>
    <Grid container item xs={12} lg={6} justify="center" alignItems="center" direction="column">
      <Typography variant="h4">歡迎回來✨</Typography>
      <img className={classes.img} alt="background" src={Computer}></img>
    </Grid>
    <Grid item xs={12} lg={6} >
      <Grid item xs={6} className={classes.cardMargins}>
        <Card variant="outlined">
          <CardContent>
            <Typography style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} variant="h5">待辦事項<Mail /></Typography>
            {(!pendingPosts?.pendingPosts || pendingPosts.pendingPosts.filter(x => x.status === PostStatus.Pending).length === 0) && <Typography style={{ marginTop: 15, marginBottom: 15 }} variant="h6" color="textSecondary">待審閱文章(0)篇</Typography>}
            {(pendingPosts?.pendingPosts && pendingPosts.pendingPosts.filter(x => x.status === PostStatus.Pending).length > 0) && <Link to="/admin/post/pending" className={classes.rebootLinks}>
              <Typography style={{ marginTop: 15, marginBottom: 15 }} variant="h6" color="secondary">
                {`待審閱文章(${pendingPosts.pendingPosts.filter(x => x.status === PostStatus.Pending).length})篇`}
              </Typography>
            </Link>}
            {(!namecards?.nameCards || namecards.nameCards.filter(x => x.status === AccountStatus.Pending).length === 0) && <Typography style={{ marginTop: 15, marginBottom: 15 }} variant="h6" color="textSecondary">新來賓待接觸(0)位</Typography>}
            {(namecards?.nameCards && namecards.nameCards.filter(x => x.status === AccountStatus.Pending).length > 0) && <Link to="/admin/namecards" className={classes.rebootLinks}>
              <Typography style={{ marginTop: 15 }} variant="h6" color="secondary">
                {`新來賓待接觸(${namecards.nameCards.filter(x => x.status === AccountStatus.Pending).length})位`}
              </Typography>
            </Link>}
            {/* <Typography style={{ marginTop: 15 }} variant="h6" color="textSecondary">代禱請求(0)則</Typography> */}
          </CardContent>
        </Card>
      </Grid>
      <Grid className={classes.cardMargins}>
        <Card variant="outlined">
          <CardContent>
            <Typography className={classes.linkIndicator} variant="h5">崇拜管理</Typography>
            <Grid className={classes.cardButtonMargins} container direction="row" spacing={2}>
              <Grid item><Typography color="primary" variant="h6"><Link className={classes.rebootLinks} to="/admin/worship/new">新增崇拜</Link></Typography></Grid>
              <Grid item><Typography color="primary" variant="h6"><Link className={classes.rebootLinks} to="/admin/worships">崇拜一覽</Link></Typography></Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid className={classes.cardMargins}>
        <Card variant="outlined">
          <CardContent>
            <Typography className={classes.linkIndicator} variant="h5">會員管理</Typography>
            <Grid className={classes.cardButtonMargins} container direction="row" spacing={2}>
              <Grid item><Typography color="primary" variant="h6"><Link className={classes.rebootLinks} to="/admin/user/new">新增會員</Link></Typography></Grid>
              <Grid item><Typography color="primary" variant="h6"><Link className={classes.rebootLinks} to="/admin/users">會員列表</Link></Typography></Grid>
              <Grid item><Typography color="primary" variant="h6"><Link className={classes.rebootLinks} to="/admin/namecards">新來賓名片</Link></Typography></Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid className={classes.cardMargins}>
        <Card variant="outlined">
          <CardContent>
            <Typography className={classes.linkIndicator} variant="h5">通告管理</Typography>
            <Grid className={classes.cardButtonMargins} container direction="row" spacing={2}>
              <Grid item><Typography color="primary" variant="h6"><Link className={classes.rebootLinks} to="/admin/news/new">新增最新消息</Link></Typography></Grid>
              <Grid item><Typography color="primary" variant="h6"><Link className={classes.rebootLinks} to="/admin/other">更改通告</Link></Typography></Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Grid>
}