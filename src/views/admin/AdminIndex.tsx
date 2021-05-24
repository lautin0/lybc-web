import { Card, CardActions, CardContent, Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    width: '60%',
    marginLeft: 20
  },
  upperGrid: {
    backgroundColor: '#0e1e25',
    height: '30vh'
  },
  lowerGrid: {
    marginTop: -theme.spacing(5),
  }
}))

export default function AdminIndex() {

  const classes = useStyles()

  return (
    <>
      <Grid className={classes.upperGrid}>

      </Grid>
      <Grid className={classes.lowerGrid}>
        <Card className={classes.root} variant="outlined">
          <CardContent>
            您可能會想...
          </CardContent>
          <CardActions>
          </CardActions>
        </Card>
      </Grid>
    </>
  )
}