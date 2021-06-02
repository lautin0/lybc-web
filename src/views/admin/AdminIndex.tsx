import { Card, CardContent, createStyles, Grid, makeStyles, Typography } from '@material-ui/core'
import Computer from '../../assets/img/computer.png'
import { Link } from 'react-router-dom'

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

  return <Grid container spacing={3} className={classes.root}>
    <Grid container item xs={12} lg={6} justify="center" alignItems="center" direction="column">
      <Typography variant="h4">歡迎回來✨</Typography>
      <img className={classes.img} alt="background" src={Computer}></img>
    </Grid>
    <Grid item xs={12} lg={6} >
      {/* <Grid item xs={6} className={classes.cardMargins}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5">您有(0)件待辦事項</Typography>
          </CardContent>
        </Card>
      </Grid> */}
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