import { Card, CardActions, CardContent, Grid, makeStyles, Typography } from "@material-ui/core";
import AuthContext from "context/AuthContext";
import { useContext } from "react";
import { getTokenValue } from "utils/utils";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    width: '65%',
    marginLeft: 20
  },
  nameHeader: {
    marginBottom: theme.spacing(3)
  },
  upperGrid: {
    backgroundColor: '#0e1e25',
    height: '30vh'
  },
  lowerGrid: {
    marginTop: -theme.spacing(10),
  },
  lowerCard: {
    width: '50%',
    marginLeft: 20,
    marginTop: theme.spacing(3)
  }
}))

export default function AdminIndex() {

  const classes = useStyles()

  const { tokenPair } = useContext(AuthContext)

  return (
    <>
      <Grid className={classes.upperGrid}>

      </Grid>
      <Grid className={classes.lowerGrid}>
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Typography className={classes.nameHeader} variant="h4">{getTokenValue(tokenPair?.token).username}</Typography>      
            <Typography>歡迎回來✨</Typography>
          </CardContent>
          <CardActions>
          </CardActions>
        </Card>
        <Card className={classes.lowerCard} variant="outlined">
          <CardContent>
            <Typography variant="h5">Work in progress🛠</Typography>
          </CardContent>
        </Card>
      </Grid>
    </>
  )
}