import { createStyles, Grid, makeStyles, Typography } from '@material-ui/core'
import peekOutside from '../../assets/img/peeking-outside.png'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import useGlobalStyles from 'styles/styles'

const useStyles = makeStyles((theme) => (
  createStyles({
    root: {
      paddingTop: 50
    },
    img: {
      width: 480,
      height: 'auto'
    },
    linkMargins: {
      display: 'flex',
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(5),
    },
    linkIndicator: {
      borderLeft: `.5rem solid ${theme.palette.secondary.main}`,
      paddingLeft: '1rem'
    }
  })
))

function PersonalOther() {
  const globalClasses = useGlobalStyles()
  const classes = useStyles()

  return <Grid container spacing={3} className={classes.root}>
    <Grid container item xs={12} lg={6} justify="center" alignItems="center">
      <img className={classes.img} alt="background" src={peekOutside}></img>
    </Grid>
    <Grid item xs={12} lg={6}>
      <Typography variant="h3">探索</Typography>
      <Typography className={classes.linkIndicator} color="primary" variant="h4"><Link className={clsx(globalClasses.rebootLinks, classes.linkMargins)} to="/sharing-list">瀏覽分享文章</Link></Typography>
      <Typography className={classes.linkIndicator} color="primary" variant="h4"><Link className={clsx(globalClasses.rebootLinks, classes.linkMargins)} to="/personal/sharing">發表您的分享</Link></Typography>
      <Typography className={classes.linkIndicator} color="primary" variant="h4"><Link className={clsx(globalClasses.rebootLinks, classes.linkMargins)} to="/apply-activity">活動報名</Link></Typography>
    </Grid>
  </Grid>
}

export default PersonalOther