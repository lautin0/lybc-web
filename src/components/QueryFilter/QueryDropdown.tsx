import { getMockFilterDataList } from 'hooks/useQueryFilter'
import React, { useState } from 'react'
import { Dropdown, Button, Form, Col } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { css } from 'styles/styles'
import { AttributeType, FilterItemType } from './types'

type QueryDropdownType = {
  attrType: AttributeType
  change: (itemList: Array<FilterItemType>, attrType?: AttributeType) => void
}

function QueryDropdown(props: QueryDropdownType) {

  const { attrType, change } = props;

  const initialFilterState = getMockFilterDataList(attrType.value)
    .map(x => {
      let key: string = x.value;
      let value: boolean | undefined = x.checked;
      return { [key]: value }
    })
    .reduce((a, b, i, []) => {
      return {
        ...a,
        ...b
      }
    })

  const { register, handleSubmit, reset } = useForm()

  const [filter, setFilter] = useState(initialFilterState)

  const handleClick = (e: any) => {
    document.dispatchEvent(new MouseEvent('click'));
  }

  const handleClearClick = (e: any) => {
    setFilter(initialFilterState)
    reset();
    change([], attrType);
    document.dispatchEvent(new MouseEvent('click'));
  }

  const onSubmit = (data: any) => {
    setFilter(data)
    change(Object.keys(data).map(x => { return { value: x, checked: data[x] } }).filter(y => y.checked), attrType)
  }

  const countActiveFilter = () => {
    return Object.values(filter).filter(x => x).length
  }

  return <Dropdown>
    <Dropdown.Toggle
      id=""
      as={Button}
      className={countActiveFilter() > 0 ? css.queryFilterBtn : css.queryFilterBtnOff}
      style={{ fontSize: 16, fontWeight: 'bolder' }}
    >
      {attrType.label + (countActiveFilter() > 0 ? `(${countActiveFilter()})` : "")}
    </Dropdown.Toggle>
    <Dropdown.Menu>
      <form id="locationFilterForm" style={{ minWidth: 300, padding: 10 }} onSubmit={handleSubmit(onSubmit)}>
        <Form.Row>
          <Form.Group as={Col}>
            {getMockFilterDataList(attrType.value).map(x => {
              return <Form.Check
                key={x.value}
                className="form-check mx-2"
                type="checkbox"
                ref={register}
                id={x.value}
                name={x.value}
                label={<><span className="form-check-sign"></span>{x.label}</>}
              ></Form.Check>
            })}
          </Form.Group>
        </Form.Row>
        <Form.Row className="d-flex justify-content-between px-3">
          <Button type="button" className={css.linkBtn} style={{ color: 'gray' }} onClick={handleClearClick}>清除</Button>
          <Button type="submit" className={css.linkBtn} onClick={handleClick}>確定</Button>
        </Form.Row>
      </form>
    </Dropdown.Menu>
  </Dropdown>
}

export default QueryDropdown