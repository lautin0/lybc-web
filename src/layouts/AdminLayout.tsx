import { createMuiTheme, CssBaseline, makeStyles, ThemeOptions, ThemeProvider } from '@material-ui/core';
import ClippedDrawer from 'components/Drawers/ClippedDrawer';
import PrimarySearchAppBar from 'components/Navbars/PrimarySearchAppBar';
import LayoutContext from 'context/LayoutContext';
import React, { FC, ReactElement, useContext } from 'react'

const useStyles = makeStyles((theme) => ({
   root: {
      display: 'flex',
   },
   content: {
      flexGrow: 1,
      padding: theme.spacing(3),
   },
}));

interface Props {

}

const AdminLayout: FC<Props> = (props): ReactElement<Props> => {
   const classes = useStyles();
   const { darkMode } = useContext(LayoutContext)

   const light: ThemeOptions = {

      palette: {

         type: 'light',

         primary: {
            light: '#48ad88',
            main: '#007d5b',
            dark: '#005032',
            contrastText: '#fff',
         },

         secondary: {
            light: '#7b7bd5',
            main: '#494fa3',
            dark: '#0d2774',
            contrastText: '#fff',
         },

      },

   }

   const dark: ThemeOptions = {

      palette: {

         type: 'dark',
         
         primary: {
            light: '#48ad88',
            main: '#007d5b',
            dark: '#005032',
            contrastText: '#fff',
         },

         secondary: {
            light: '#7b7bd5',
            main: '#494fa3',
            dark: '#0d2774',
            contrastText: '#fff',
         },

      },

   }

   const appliedTheme = createMuiTheme(darkMode ? dark : light)

   return <ThemeProvider theme={appliedTheme}>
      <div className={classes.root}>
         <CssBaseline />
         <PrimarySearchAppBar />
         <ClippedDrawer />
         <main className={classes.content}>
            {props.children}
         </main>
      </div>
   </ThemeProvider>
}

export default AdminLayout;