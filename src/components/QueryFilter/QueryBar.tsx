import useQueryFilter, { categoryType, locationType } from 'hooks/useQueryFilter'
import { Row } from 'react-bootstrap'
import QueryCheckboxDropdown from './QueryCheckboxDropdown'

type QueryFilterProps = {
  hooks: ReturnType<typeof useQueryFilter>
}

function QueryFilter(props: QueryFilterProps) {

  const { handleQueryFilterChange } = props.hooks

  return <Row>
    <QueryCheckboxDropdown
      change={handleQueryFilterChange}
      attrType={locationType}
    />
    <QueryCheckboxDropdown
      change={handleQueryFilterChange}
      attrType={categoryType}
    />
  </Row>
}

export default QueryFilter