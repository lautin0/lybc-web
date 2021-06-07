import { Add, ViewQuilt, RecentActors, Spellcheck, NoteAdd, Person, Build } from "@material-ui/icons";
import { Post, Role } from "generated/graphql";
import jwt_decode from "jwt-decode";
import { Moment } from "moment";
import React from "react";
import { Tooltip } from "react-bootstrap";
import UNIVERSALS from "Universals";

export function getMenuHierarchy(id: any, obj: any, array: any, foundObj: any) {
   if (!foundObj)
      foundObj = { isFound: false }
   let isCurrent = false;
   let currId: any;
   if (!array)
      array = []
   if (!obj)
      obj = UNIVERSALS.MENU_HIERARCHY
   if (Object.keys(obj).includes(id)) {
      array.unshift({ title: obj[id].title, link: null })
      isCurrent = true;
      foundObj.isFound = true;
   }
   Object.keys(obj).forEach(e => {
      if (obj[e] != null && obj[e].child != null) {
         if (!foundObj.isFound) {
            currId = e
            return getMenuHierarchy(id, obj[e].child, array, foundObj)
         }
      }
   });
   if (foundObj.isFound && !isCurrent) {
      array.unshift({ title: obj[currId].title, link: obj[currId].link })
   }
   return array
}

export function getNullableString(s: string | null | undefined): string {
   if (!s)
      return ''
   else
      return s
}

export function getTokenValue(jwt: any) {
   let authObject: any
   if (jwt) {
      try {
         authObject = jwt_decode(jwt);
      } catch {
         return null
      }
   }
   return authObject
}

export function isTokenExpired(jwt: any) {
   let token = getTokenValue(jwt)
   if (!token)
      return true
   return Date.now() >= token.exp * 1000
}

export function hasRole(jwt: any, roles: Role[]) {
   let token = getTokenValue(jwt)
   if (!token)
      return false
   return roles.some(r => r.toString().toUpperCase() === token.role.toUpperCase())
}

export function nullOrEmpty(checkee: any) {
   if (typeof checkee === "string")
      return !checkee || checkee === ''
   if (typeof checkee === "object")
      return !checkee || Object.keys(checkee).length === 0
}

export function getTimePastStr(target: Moment) {
   return target.fromNow()
}

export const getKeyValue = <T, K extends keyof T>(obj: T, key: K): T[K] => obj[key];

export const renderTooltip = (props: any, type: string, currUser: string, reactions: Array<any>, lang: string) => {

   let usernames: any[] = reactions
      .filter((r: any) =>
         r.type === type.toUpperCase()
      )
      .map((x: any) => {
         return x.username
      })
   let text = ''
   if (type === 'pray')
      text = lang === "zh" ? '記念' : 'Pray'
   else
      text = lang === "zh" ? '哈利路亞' : 'Hallelujah'

   let sentence = (lang === "zh" ? "{0}{1}表示 " : "{0}{1}: ") + text
   let userClause = ""
   usernames.slice(0, 2).map((user: any) => {
      if (userClause.length > 0)
         userClause += ", "
      userClause += user
      return user
   })

   if (userClause.length > 0)
      sentence = sentence.replace('{0}', userClause)
   if (usernames.length - 2 > 0)
      sentence = sentence.replace('{1}', `${lang === "zh" ? "和另外" : "and other"} ${usernames.length - 2} ${lang === "zh" ? "人" : "people"}`)
   else
      sentence = sentence.replace('{1}', '')

   return <Tooltip {...props}> {usernames.length > 0 ? sentence : text}</Tooltip>

};

export function getTitleDisplay(p: Post) {
   if (p.user.role === Role.Admin)
      return ""
   let result = ""
   if (p.user.role === 'WORKER') {
      result = p.user.titleC ? p.user.titleC : ""
   } else if (p.user.gender === 'MALE') {
      result = '弟兄'
   } else if (p.user.gender === 'FEMALE') {
      result = '姊妹'
   }
   return result
}

export function stripGCSFileName(s: string) {
   if (!s) return ""
   const word = '/lybcstorage/'
   return decodeURI(s.substring(word.length, s.length))
}

export const funcList = [
   {
      title: "崇拜管理", path: '/admin/worships', children: [
         { title: "新增崇拜", path: '/admin/worship/new', roles: [Role.Admin], icon: <Add />, hideFromMenu: false, quickAccess: true },
         { title: "管理崇拜", path: '/admin/worships', roles: [Role.Admin], icon: <ViewQuilt />, hideFromMenu: false, quickAccess: true }
      ]
   },
   {
      title: "會員管理", path: '/admin/users', children: [
         { title: "新增會員", path: '/admin/user/new', roles: [Role.Admin], icon: <Add />, hideFromMenu: true, quickAccess: true },
         { title: "會員管理", path: '/admin/users', roles: [Role.Admin], icon: <Person />, hideFromMenu: false, quickAccess: true },
         { title: "新來賓名片", path: '/admin/namecards', roles: [Role.Admin, Role.Worker], icon: <RecentActors />, hideFromMenu: false, quickAccess: true }
      ]
   },
   {
      title: "頁面管理", path: '/admin/page-management', children: [
         { title: "新增文章", path: '/admin/post/new', roles: [Role.Admin], icon: <Add />, hideFromMenu: false, quickAccess: false },
         { title: "審閱文章", path: '/admin/post/pending', roles: [Role.Admin, Role.Worker], icon: <Spellcheck />, hideFromMenu: false, quickAccess: false },
         { title: "新增消息", path: '/admin/news/new', roles: [Role.Admin, Role.Worker], icon: <NoteAdd />, hideFromMenu: false, quickAccess: false },
         { title: "頁面設定", path: '/admin/other', roles: [Role.Admin, Role.Worker], icon: <Build />, hideFromMenu: false, quickAccess: false }
      ]
   },
   {
      title: "通告管理", path: '/admin/page-management', children: [
         { title: "新增最新消息", path: '/admin/news/new', roles: [Role.Admin, Role.Worker], icon: <Add />, hideFromMenu: true, quickAccess: true },
         { title: "更改通告", path: '/admin/other', roles: [Role.Admin, Role.Worker], icon: <Build />, hideFromMenu: true, quickAccess: true }
      ]
   },
   {
      title: "其他功能", path: '/admin/other', children: [
         { title: "系統設定", path: '/admin/other', roles: [Role.Admin], icon: <Build />, hideFromMenu: false, quickAccess: false }
      ]
   }
]
