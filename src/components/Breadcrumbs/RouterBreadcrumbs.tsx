import { Link } from "@material-ui/core"
import Breadcrumbs from "@material-ui/core/Breadcrumbs"
import { NavigateNext } from "@material-ui/icons"
import React from "react"
import { useHistory, useLocation } from "react-router-dom"
import { getKeyValue } from "utils/utils"

const mappings: any = {
   "admin": ["/admin/", "管理控制台"],
   "user": ["/admin/users/", "用戶管理"],
   "users": [null, "用戶管理"],
   "new": [null, "新增"],
   "worship": ["/admin/worships", "崇拜管理"],
   "worships": [null, "崇拜管理"]   
}

export default function RouterBreadcrumbs() {

   const location = useLocation()
   const history = useHistory()

   return <Breadcrumbs separator={<NavigateNext fontSize="small" />}>
      {location.pathname.split('/').slice(1).map((s, i) => (
         Object.keys(mappings).includes(s) && <Link href={getKeyValue(mappings, s)[0] == null ? undefined : "#"} onClick={(e: any) => { e.preventDefault(); if(getKeyValue(mappings, s)[0] == null) return; history.push(getKeyValue(mappings, s)[0]); }}>{getKeyValue(mappings, s)[1]}</Link>
      ))}
   </Breadcrumbs>
}