export const SET_IMAGE = 'SET_IMAGE'

export function setImage(dataUrl) {
    return {
        type: SET_IMAGE,
        dataUrl
    }
}