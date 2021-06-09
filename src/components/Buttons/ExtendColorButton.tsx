import { Button, ButtonProps, makeStyles, PropTypes } from "@material-ui/core";
import clsx from "clsx";
import React, { useCallback, useEffect, useState } from "react";

const useStyles = makeStyles((theme) => ({
   dangerButton: {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.primary.contrastText,
      "&.MuiButton-contained:hover": {
         backgroundColor: theme.palette.error.dark
      }
   },
   warningButton: {
      backgroundColor: theme.palette.warning.light,
      color: theme.palette.primary.contrastText,
      "&.MuiButton-contained:hover": {
         backgroundColor: theme.palette.warning.main
      }
   },
   infoButton: {
      backgroundColor: theme.palette.info.main,
      color: theme.palette.primary.contrastText,
      "&.MuiButton-contained:hover": {
         backgroundColor: theme.palette.info.dark
      }
   },
   successButton: {
      backgroundColor: theme.palette.success.main,
      color: theme.palette.primary.contrastText,
      "&.MuiButton-contained:hover": {
         backgroundColor: theme.palette.success.dark
      }
   }
}))

export default function ExtendColorButton(props: React.PropsWithChildren<
   Omit<ButtonProps, 'color' | 'variant'> &
   { color?: 'primary' | 'secondary' | 'danger' | 'warning' | 'info' | 'success' }
>) {

   const classes = useStyles()

   const { className, color } = props

   const [buttonColor, setButtonColor] = useState<PropTypes.Color>()

   const getColor = useCallback(() => {
      switch (color) {
         case "success":
            return classes.successButton
         case "danger":
            return classes.dangerButton
         case "info":
            return classes.infoButton
         case "warning":
            return classes.warningButton
      }
   }, [color, classes])

   useEffect(() => {
      if (color && (typeof buttonColor).includes(color))
         setButtonColor(color as (typeof buttonColor))
   }, [color, buttonColor])

   return <>
      {getColor() && <Button
         {...props}
         variant="contained"
         className={clsx(className, getColor())}
         color={buttonColor}
      >{props.children}</Button>}
      {!getColor() && <Button
         {...props}
         variant="contained"
         color={buttonColor}
      >{props.children}</Button>}
   </>
}