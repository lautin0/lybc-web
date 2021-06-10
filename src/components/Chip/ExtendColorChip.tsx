import { Chip, ChipTypeMap, makeStyles, PropTypes } from "@material-ui/core";
import { CommonProps } from "@material-ui/core/OverridableComponent";
import clsx from "clsx";
import React, { ReactNode, useCallback, useEffect, useState } from "react";

const useStyles = makeStyles((theme) => ({
   success: {
      backgroundColor: theme.palette.success.main,
      color: `${theme.palette.primary.contrastText} !important`
   },
   danger: {
      backgroundColor: theme.palette.error.main,
      color: `${theme.palette.primary.contrastText} !important`
   },
   warning: {
      backgroundColor: theme.palette.warning.light,
      color: `${theme.palette.secondary.contrastText} !important`
   },
   info: {
      backgroundColor: theme.palette.info.main,
      color: `${theme.palette.primary.contrastText} !important`
   },
   platinum: {
      background: 'linear-gradient(120deg, rgba(189,215,245,1) 22%, rgba(238,174,202,1) 50%, rgba(189,215,245,1) 80%)',
      color: theme.palette.primary.contrastText
   },
   gold: {
      backgroundColor: 'gold',
      color: theme.palette.primary.contrastText
   }
}))

export default function ExtendColorChip(props: Omit<CommonProps<ChipTypeMap>, 'color'> &
{ label?: ReactNode } &
{ color?: 'primary' | 'secondary' | 'danger' | 'warning' | 'info' | 'success' | 'gold' | 'platinum' }
) {

   const classes = useStyles()

   const { className, color } = props

   const [chipColor, setChipColor] = useState<Exclude<PropTypes.Color, 'inherit'>>()

   const getColor = useCallback(() => {
      switch (color) {
         case "success":
            return classes.success
         case "danger":
            return classes.danger
         case "info":
            return classes.info
         case "warning":
            return classes.warning
         case "gold":
            return classes.gold
         case "platinum":
            return classes.platinum
      }
   }, [color, classes])

   useEffect(() => {
      if (color && (typeof chipColor).includes(color))
         setChipColor(color as (typeof chipColor))
   }, [color, chipColor])

   return <>
      {getColor() && <Chip
         {...props}
         className={clsx(className, getColor())}
         color={chipColor}
      />}
      {!getColor() && <Chip
         {...props}
         color={chipColor}
      />}
   </>
}