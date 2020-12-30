import useQueryFilter, { categoryType, locationType } from 'hooks/useQueryFilter'
import React from 'react'
import { Button, Row } from 'react-bootstrap'
import { css } from 'styles/styles'
import QueryDropdown from './QueryDropdown'

type QueryFilterProps = {
  hooks: ReturnType<typeof useQueryFilter>
}

function QueryFilter(props: QueryFilterProps) {

  const { handleQueryFilterChange } = props.hooks

  return <Row>
    <QueryDropdown
      change={handleQueryFilterChange}
      attrType={locationType}
    />
    <QueryDropdown
      change={handleQueryFilterChange}
      attrType={categoryType}
    />
  </Row>
}

export default QueryFilter