import { Role } from "generated/graphql";
import jwt_decode from "jwt-decode";
import { Moment } from "moment";
import UNIVERSALS from "Universals";

export function getMenuHierarchy(id: any, obj: any, array: any, foundObj: any) {
    if (foundObj == null)
        foundObj = { isFound: false }
    let isCurrent = false;
    let currId: any;
    if (array == null)
        array = []
    if (obj == null)
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
    if (token == null)
        return true
    return Date.now() >= token.exp * 1000
}

export function hasRole(jwt: any, role: Role) {
    let token = getTokenValue(jwt)
    if (token == null)
        return false
    return role.toString().toUpperCase() === token.role.toUpperCase()
}

export function nullOrEmpty(checkee: any) {
    if (typeof checkee === "string")
        return checkee == null || checkee === ''
    if (typeof checkee === "object")
        return checkee == null || Object.keys(checkee).length === 0
}

export function getTimePastStr(target: Moment) {
    return target.fromNow()
}

export const getKeyValue = <T, K extends keyof T>(obj: T, key: K): T[K] => obj[key];
