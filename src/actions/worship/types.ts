export const SET_IMAGE = 'SET_IMAGE'

export interface WorshipAction {
    type: typeof SET_IMAGE,
    dataUrl: any
}

export type WorshipActionTypes = WorshipAction