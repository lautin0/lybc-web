import { LinearProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
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
  },
}))

export default function CustomLinearProgress() {

  const classes = useStyles()

  return <LinearProgress className={classes.progress} />
}