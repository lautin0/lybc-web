import { Add, ViewQuilt, RecentActors, Spellcheck, NoteAdd, Person, Build } from "@material-ui/icons";
import { AccountStatus, PostStatus, Role, User } from "generated/graphql";
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

export function getTitleDisplay(u?: User) {
   if (!u || u.role === Role.Admin || u.role === Role.Super)
      return ""
   let result = ""
   if (u.role === 'WORKER') {
      result = u.titleC ? u.titleC : ""
   } else if (u.gender === 'MALE') {
      result = '弟兄'
   } else if (u.gender === 'FEMALE') {
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
         { title: "新增崇拜", path: '/admin/worship/new', roles: [Role.Admin, Role.Super], icon: <Add />, hideFromMenu: false, quickAccess: true },
         { title: "管理崇拜", path: '/admin/worships', roles: [Role.Admin, Role.Super], icon: <ViewQuilt />, hideFromMenu: false, quickAccess: true }
      ]
   },
   {
      title: "會員管理", path: '/admin/users', children: [
         { title: "新增會員", path: '/admin/user/new', roles: [Role.Admin, Role.Super], icon: <Add />, hideFromMenu: true, quickAccess: true },
         { title: "會員管理", path: '/admin/users', roles: [Role.Admin, Role.Super], icon: <Person />, hideFromMenu: false, quickAccess: true },
         { title: "新來賓名片", path: '/admin/namecards', roles: [Role.Admin, Role.Super, Role.Worker], icon: <RecentActors />, hideFromMenu: false, quickAccess: true }
      ]
   },
   {
      title: "頁面管理", path: '/admin/page', children: [
         { title: "新增文章", path: '/admin/post/new', roles: [Role.Admin, Role.Super], icon: <Add />, hideFromMenu: false, quickAccess: false },
         { title: "審閱文章", path: '/admin/post/pending', roles: [Role.Admin, Role.Super, Role.Worker], icon: <Spellcheck />, hideFromMenu: false, quickAccess: false },
         { title: "新增消息", path: '/admin/news/new', roles: [Role.Admin, Role.Super, Role.Worker], icon: <NoteAdd />, hideFromMenu: false, quickAccess: false },
         { title: "頁面設定", path: '/admin/page', roles: [Role.Admin, Role.Super, Role.Worker], icon: <Build />, hideFromMenu: false, quickAccess: false }
      ]
   },
   {
      title: "通告管理", path: '/admin/page', children: [
         { title: "新增最新消息", path: '/admin/news/new', roles: [Role.Admin, Role.Super, Role.Worker], icon: <Add />, hideFromMenu: true, quickAccess: true },
         { title: "更改通告", path: '/admin/other', roles: [Role.Admin, Role.Super, Role.Worker], icon: <Build />, hideFromMenu: true, quickAccess: true }
      ]
   },
   {
      title: "頂層功能", path: '/admin/other', children: [
         { title: "內容管理", path: '/admin/content', roles: [Role.Super], icon: <Build />, hideFromMenu: false, quickAccess: false },
         { title: "系統設定", path: '/admin/other', roles: [Role.Super], icon: <Build />, hideFromMenu: false, quickAccess: false }
      ]
   }
]

export const getAccountStatus = (s: AccountStatus) => {
   switch (s) {
      case AccountStatus.Active:
         return "已處理"
      case AccountStatus.Inactive:
         return "擱置"
      case AccountStatus.Pending:
         return "待接觸"
      case AccountStatus.Suspended:
         return "暫緩申請"
      case AccountStatus.Contacting:
         return "跟進中"
   }
}

export const getPostStatus = (s: PostStatus) => {
   switch (s) {
      case PostStatus.Approved:
         return "已發佈"
      case PostStatus.Rejected:
         return "已拒絕"
      case PostStatus.Pending:
         return "待審閱"
      case PostStatus.Withhold:
         return "暫緩發佈"
      case PostStatus.Withdraw:
         return "已撤回"
   }
}

export const getRoleDisplay = (role?: Role) => {
   if (!role)
      return ""
   switch (role) {
      case Role.Admin:
         return '網站管理人員'
      case Role.Super:
         return '頂層管理人員'
      case Role.Worker:
         return '教會同工'
      default:
         return ""
   }
}


export const getRoleColorKey = (role?: Role) => {
   if (!role)
      return undefined
   switch (role) {
      case Role.Admin:
         return 'gold'
      case Role.Super:
         return 'platinum'
      case Role.Worker:
         return 'info'
      default:
         return undefined
   }
}

export const getAccountBadgeColorKey = (s: AccountStatus) => {
   switch (s) {
      case AccountStatus.Active:
         return 'success'
      case AccountStatus.Pending:
         return 'danger'
      case AccountStatus.Suspended:
         return 'warning'
      case AccountStatus.Contacting:
         return 'info'
   }
}

export const getPostBadgeColorKey = (s: PostStatus) => {
   switch (s) {
      case PostStatus.Approved:
         return 'success'
      case PostStatus.Rejected:
      case PostStatus.Withdraw:
         return 'danger'
      case PostStatus.Pending:
         return 'warning'
   }
}