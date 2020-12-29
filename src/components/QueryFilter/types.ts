export type ItemAttribute = {
  value: string,
  label: string,
  itemType: string,
  attrType: AttributeType,
}

export type FilterItemType = {
  value: string,
  label?: string,
  checked?: boolean
}

export type FilterType = {
  filterList: Array<FilterItemType>,
  attrType?: AttributeType
}

export type AttributeType = {
  value: string,
  label?: string,
  filterMode: "AND" | "OR"
}
