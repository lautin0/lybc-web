export const SET_FORM = 'SET_FORM'

export type AdminWorshipForm = {
    id: string,
    type: string,
    title: string,
    note: string,
    verse: string,
    link: string,
    docs: any[]
}

export interface AdminAction {
    type: typeof SET_FORM,
    form: AdminWorshipForm
}

export type AdminActionTypes = AdminAction