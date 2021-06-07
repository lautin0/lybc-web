import { Card, CardContent, createStyles, Grid, makeStyles, Typography } from '@material-ui/core'
import Computer from '../../assets/img/computer.png'
import { Link, useLocation } from 'react-router-dom'
import { Mail } from '@material-ui/icons'
import { AccountStatus, PostStatus, Role, useNameCardsQuery, usePendingPostsQuery } from 'generated/graphql'
import { useContext, useEffect } from 'react'
import { funcList, getTokenValue } from 'utils/utils'
import AuthContext from 'context/AuthContext'

const useStyles = makeStyles((theme) => (
  createStyles({
    root: {
      paddingTop: 20
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
  const { tokenPair } = useContext(AuthContext)
  const location = useLocation()

  const { data: pendingPostsData, refetch: pendingPostsRefetch } = usePendingPostsQuery({ notifyOnNetworkStatusChange: true })
  const { data: namecardsData, refetch: namecardsRefetch } = useNameCardsQuery({ notifyOnNetworkStatusChange: true })

  useEffect(() => {
    if (pendingPostsRefetch)
      pendingPostsRefetch()
    if (namecardsRefetch)
      namecardsRefetch()
  }, [location, pendingPostsRefetch, namecardsRefetch])

  return <Grid container spacing={2} className={classes.root}>
    <Grid container item xs={12} lg={6} justify="center" alignItems="center" direction="column">
      <Typography variant="h4">歡迎回來✨</Typography>
      <img className={classes.img} alt="background" src={Computer}></img>
    </Grid>
    <Grid item xs={12} lg={6} >
      <Grid item xs={6} className={classes.cardMargins}>
        <Card variant="outlined">
          <CardContent>
            <Typography style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} variant="h5">待辦事項<Mail /></Typography>
            {(!pendingPostsData?.pendingPosts || pendingPostsData.pendingPosts.filter(x => x.status === PostStatus.Pending).length === 0) && <Typography style={{ marginTop: 15, marginBottom: 15 }} variant="h6" color="textSecondary">待審閱文章(0)篇</Typography>}
            {(pendingPostsData?.pendingPosts && pendingPostsData.pendingPosts.filter(x => x.status === PostStatus.Pending).length > 0) && <Link to="/admin/post/pending" className={classes.rebootLinks}>
              <Typography style={{ marginTop: 15, marginBottom: 15 }} variant="h6" color="secondary">
                {`待審閱文章(${pendingPostsData.pendingPosts.filter(x => x.status === PostStatus.Pending).length})篇`}
              </Typography>
            </Link>}
            {(!namecardsData?.nameCards || namecardsData.nameCards.filter(x => x.status === AccountStatus.Pending).length === 0) && <Typography style={{ marginTop: 15, marginBottom: 15 }} variant="h6" color="textSecondary">新來賓待接觸(0)位</Typography>}
            {(namecardsData?.nameCards && namecardsData.nameCards.filter(x => x.status === AccountStatus.Pending).length > 0) && <Link to="/admin/namecards" className={classes.rebootLinks}>
              <Typography style={{ marginTop: 15 }} variant="h6" color="secondary">
                {`新來賓待接觸(${namecardsData.nameCards.filter(x => x.status === AccountStatus.Pending).length})位`}
              </Typography>
            </Link>}
            {/* <Typography style={{ marginTop: 15 }} variant="h6" color="textSecondary">代禱請求(0)則</Typography> */}
          </CardContent>
        </Card>
      </Grid>
      {funcList.filter(x =>
        x.children.flatMap(y => y.roles).includes(getTokenValue(tokenPair?.token).role as Role) &&
        x.children.some(y => y.quickAccess)
      ).map((item, idx) => (
        <Grid key={item.title} className={classes.cardMargins}>
          <Card variant="outlined">
            <CardContent>
              <Typography className={classes.linkIndicator} variant="h5">{item.title}</Typography>
              <Grid className={classes.cardButtonMargins} container direction="row" spacing={2}>
                {item.children.filter(y => y.roles.includes(getTokenValue(tokenPair?.token).role as Role) && y.quickAccess).map((subItem, idx) => (
                  <Grid key={idx} item><Typography color="primary" variant="h6"><Link className={classes.rebootLinks} to={subItem.path}>{subItem.title}</Link></Typography></Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Grid>
}