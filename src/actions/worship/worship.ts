import { WorshipActionTypes, SET_IMAGE } from "./types";

export function setImage(dataUrl: any): WorshipActionTypes {
    return {
        type: SET_IMAGE,
        dataUrl
    }
}