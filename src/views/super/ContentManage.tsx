import { Grid, Typography } from "@material-ui/core"
import RouterBreadcrumbs from "components/Breadcrumbs/RouterBreadcrumbs"
import React from "react"
import { Link } from "react-router-dom"
import useGlobalStyles from "styles/styles"

const contentTypes = [
   { link: "/admin/content/pending-posts", title: "待審閱文章" },
   { link: "/admin/content/posts", title: "文章" },
   { link: "/admin/content/notifications", title: "通知" }   
]

export default function ContentManage() {

   const globalClasses = useGlobalStyles()

   return <>
      <RouterBreadcrumbs />
      <Typography className={globalClasses.adminPageTitle} variant="h5">內容管理</Typography>
      <Grid container direction="column" spacing={3}>
         {contentTypes.map(x => (
            <Grid item><Typography variant="h6" color="primary"><Link className={globalClasses.rebootLinks} key={x.title} to={x.link}>•{" "}{x.title}</Link></Typography></Grid>
         ))}
      </Grid>
   </>
}