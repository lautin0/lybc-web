import { Person } from "actions/new-comer/types";

export interface NewComerSaveState {
    isPending: number,
    person: Person
}

export interface NewComerFetchState {
    newComers: Array<Person>,
    isFetching: boolean,
}