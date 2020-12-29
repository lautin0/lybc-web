import { AttributeType, ItemAttribute, FilterItemType, FilterType } from 'components/QueryFilter/types';
import { useState } from 'react'

export const locationType: AttributeType =
{
  value: 'bkLocation',
  label: '館藏點',
  filterMode: "OR"
}
export const categoryType: AttributeType =
{
  value: 'bkCategory',
  label: '類別',
  filterMode: "OR"
}

const dataSrc = [
  {
    id: 1, title: 'The meaning of Marriage', author: 'Timothy Keller', isbn: '9780525952473',
    attributes: [
      { value: "CHRH", label: "Church", itemType: "book", attrType: locationType },
      { value: "ELIB", label: "EE Library", itemType: "book", attrType: locationType },
      { value: "RELAT", label: "EE Library", itemType: "book", attrType: categoryType }
    ]
  },
  {
    id: 2, title: 'The Power of Significance', author: 'John C. Maxwell', isbn: '9781478921950',
    attributes: [
      { value: "CHRH", label: "Church", itemType: "book", attrType: locationType },
      { value: "DEVLM", label: "EE Library", itemType: "book", attrType: categoryType }
    ]
  },
  {
    id: 3, title: 'The Power of Your Potential', author: 'John C. Maxwell', isbn: '9781549198427',
    attributes: [
      { value: "ELIB", label: "EE Library", itemType: "book", attrType: locationType },
      { value: "DEVLM", label: "EE Library", itemType: "book", attrType: categoryType }
    ]
  }
]

function useQueryFilter() {
  const [data, setData] = useState(dataSrc)
  const [textFilter, setTextFilter] = useState('')
  const [filters, setFilters] = useState<Array<FilterType>>([] as Array<FilterType>)

  const handleQueryFilterChange = (itemList: Array<FilterItemType>, attrType?: AttributeType) => {
    let idx = -1;
    filters.map((x, i) => {
      if (x.attrType?.value === attrType?.value)
        idx = i;
    })

    let cloneFilter = [...filters]
    if (attrType == null || itemList.length === 0) {
      if (idx > -1)
        cloneFilter.splice(idx, 1)
    } else {
      let filterToBe: FilterType = {
        filterList: itemList,
        attrType: attrType
      }
      if (idx > -1) {
        cloneFilter[idx] = filterToBe
      } else {
        cloneFilter.push(filterToBe)
      }
    }

    setFilters(cloneFilter)

    let cloneData = [...dataSrc]
    cloneFilter.forEach(q => {
      if (q == null || q.attrType == null)
        return
      let at = q.attrType
      switch (q.attrType.filterMode) {
        case "AND":
          cloneData = cloneData.filter(x => q.filterList
            .map(y => y.value)
            .every(r => x.attributes.filter(z => z.attrType.value === at.value).map(z => z.value).includes(r))
          )
          break;

        case "OR":
          cloneData = cloneData.filter(x => q.filterList
            .map(y => y.value)
            .some(r => x.attributes.filter(z => z.attrType.value === at.value).map(z => z.value).includes(r))
          )
          break;
      }
    })
    setData(cloneData)
  }

  const filterBooks = (book: typeof dataSrc[0]): boolean => {
    const f = textFilter.toUpperCase()
    return textFilter.length === 0 || (
      book.author.toUpperCase().includes(f) ||
      book.title.toUpperCase().includes(f) ||
      book.isbn.toUpperCase().includes(f)
    )
  }

  const handleFilterChange = (evt: any) => {
    setTextFilter(evt.target.value)
  }

  const hasAttribute = (attr: string, attrTypeName: string, attrList: Array<ItemAttribute>) => {
    return attrList.filter(x => x.attrType.value === attrTypeName).map(x => x.value).includes(attr)
  }

  return { data, filterBooks, handleFilterChange, handleQueryFilterChange, hasAttribute }
}

export default useQueryFilter

export const getMockFilterDataList = (v: string): Array<FilterItemType> => {
  if (v === 'bkLocation') {
    return [
      { value: "CHRH", label: "Church", checked: false },
      { value: "ELIB", label: "EE Library", checked: false }
    ]
  } else if (v === 'bkCategory') {
    return [
      { value: "FAITH", label: "Faith", checked: false },
      { value: "RELAT", label: "Relationship", checked: false },
      { value: "FAMIL", label: "Family", checked: false },
      { value: "DEVLM", label: "Personal Development", checked: false }
    ]
  } else {
    return []
  }
}