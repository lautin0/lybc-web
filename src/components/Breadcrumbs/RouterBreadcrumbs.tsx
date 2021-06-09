import { Link, makeStyles } from "@material-ui/core"
import Breadcrumbs from "@material-ui/core/Breadcrumbs"
import { Home, NavigateNext } from "@material-ui/icons"
import React, { useMemo } from "react"
import { useHistory, useLocation } from "react-router-dom"
import { getKeyValue } from "utils/utils"

const useStyles = makeStyles((theme) => ({
   anchor: {
      display: 'flex',
      "&:hover": {
         color: theme.palette.primary.main
      }
   },
   linkIcons: {
      marginRight: theme.spacing(.5)
   }
}))

export default function RouterBreadcrumbs() {

   const classes = useStyles()
   const location = useLocation()
   const history = useHistory()

   const mappings: any = useMemo(() => ({
      "admin": ["/admin/", "管理控制台", <Home className={classes.linkIcons} />],
      "user": ["/admin/users/", "會員"],
      "users": [null, "用戶管理"],
      "new": [null, "新增"],
      "worship": ["/admin/worships", "崇拜管理"],
      "worships": [null, "崇拜管理"],
      "namecards": ["/admin/namecards", "新來賓名片"],
      "news": [null, "最新消息"],
      "post": [null, "文章"],
      "posts": [null, "文章"],
      "pending": [null, "待處理"],
      "contact": [null, "跟進"],
      "notifications": [null, "通知"],
      "content": ['/admin/content', "內容"],
      "pending-posts": [null, "待審閱文章"]
   }), [classes])

   return <Breadcrumbs separator={<NavigateNext fontSize="small" />}>
      {location.pathname.split('/').slice(1).map((s, i) => (
         Object.keys(mappings).includes(s) && <Link key={s + Math.random().toFixed(2)} className={classes.anchor} href={(!getKeyValue(mappings, s)[0]) ? undefined : "#"} onClick={(e: any) => { e.preventDefault(); if (!getKeyValue(mappings, s)[0]) return; history.push(getKeyValue(mappings, s)[0]); }}>{getKeyValue(mappings, s)[2]}{getKeyValue(mappings, s)[1]}</Link>
      ))}
   </Breadcrumbs>
}