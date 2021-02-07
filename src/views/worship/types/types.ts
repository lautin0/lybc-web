import { Moment } from "moment"

export type ComponentToPrintProps = {
    content: any
}

export type WorshipListItemType = {
    worshipId: string,
    date: Moment,
    title: string,
    messenger: string,
    type: string
  }