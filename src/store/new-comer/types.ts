export interface SaveState {
    isPending: number,
    person: any
}

export interface FetchState {
    newComers: Array<any>,
    isFetching: boolean,
}

export interface NewComerState {
    saveState: SaveState
    fetchState: FetchState
}