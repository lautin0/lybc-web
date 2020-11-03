import { Worship } from "generated/graphql"

export const SET_FORM = 'SET_FORM'

// export type AdminWorshipForm = {
//     worshipId: string,
//     type: string,
//     title: string,
//     note?: string,
//     verse?: string,
//     link?: string,
//     messenger: string,
//     docs: AdminWorshipFormDoc[]
// }

export type AdminWorshipFormDoc = {
    title: string,
    link: string,
    type: string
}

export interface AdminAction {
    type: typeof SET_FORM,
    form: Worship
}

export type AdminActionTypes = AdminAction