import { makeStyles } from "@material-ui/core";
import { green, red, yellow, grey, cyan } from "@material-ui/core/colors";

export class css {

  public static adminPanelInput = "";

  public static queryFilterBtn = "mx-1 btn-warning";
  public static queryFilterBtnOff = "mx-1 btn-outline-filter-off";

  public static linkBtn = "btn-link"

  public static blog = "d-flex justify-content-between"
  public static blogText = "blog-text w-100"
  public static blogOP = "original-poster"
  public static blogHeader = "header"
  public static blogQuote = "quote"
  public static blogFooter = "footer"
  public static blogImg = "d-none d-md-block mt-1 blog-img"
  public static blogImgMobile = "d-block d-md-none mt-3 blog-img"

}

const useGlobalStyles = makeStyles((theme) => ({
  adminPageTitle: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4)
  },
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
  success: {
    backgroundColor: `${green[600]} !important`,
    color: `${theme.palette.primary.contrastText} !important`
  },
  danger: {
    backgroundColor: `${red[600]} !important`,
    color: `${theme.palette.primary.contrastText} !important`
  },
  warning: {
    backgroundColor: `${yellow[600]} !important`,
    color: `${theme.palette.secondary.contrastText} !important`
  },
  default: {
    backgroundColor: `${grey[500]} !important`,
    color: `${theme.palette.primary.contrastText} !important`
  },
  primary: {
    backgroundColor: `${theme.palette.primary.main} !important`,
    color: `${theme.palette.primary.contrastText} !important`
  },
  info: {
    backgroundColor: `${cyan[800]} !important`,
    color: `${theme.palette.primary.contrastText} !important`
  },
  dangerButton: {
    backgroundColor: red[600],
    color: theme.palette.primary.contrastText,
    "&.MuiButton-contained:hover": {
      backgroundColor: red[500],
    }
  },
  warningButton: {
    backgroundColor: yellow[700],
    color: theme.palette.primary.contrastText,
    "&.MuiButton-contained:hover": {
      backgroundColor: yellow[600],
    }
  },
}))

export default useGlobalStyles