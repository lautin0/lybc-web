import { Grid, Typography } from "@material-ui/core"
import RouterBreadcrumbs from "components/Breadcrumbs/RouterBreadcrumbs"
import React from "react"
import { Link } from "react-router-dom"
import useGlobalStyles from "styles/styles"

const contentTypes = [
   { link: "/admin/page/notice", title: "教會通告" },
   { link: "/admin/page/careers", title: "招聘頁" }
]

export default function PageManage() {

   const globalClasses = useGlobalStyles()

   return <>
      <RouterBreadcrumbs />
      <Typography className={globalClasses.adminPageTitle} variant="h5">頁面管理</Typography>
      <Grid container direction="column" spacing={3}>
         {contentTypes.map(x => (
            <Grid item><Typography variant="h6" color="primary"><Link className={globalClasses.rebootLinks} key={x.title} to={x.link}>•{" "}{x.title}</Link></Typography></Grid>
         ))}
      </Grid>
   </>
}