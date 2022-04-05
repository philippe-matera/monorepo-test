import PropTypes from 'prop-types'
import React from 'react'

import { TextInput } from 'ui/forms/TextInput'

const HeaderFilterCell = ({ column, filter, placeholder, updateFilter }) => (
  <td className={column.headerClass}>
    {column.filterable && (
      <TextInput
        name={column.key}
        value={filter}
        placeholder={placeholder}
        onChange={updateFilter}
        xs
      />
    )}
  </td>
)

HeaderFilterCell.propTypes = {
  column: PropTypes.shape({
    key: PropTypes.string,
    headerClass: PropTypes.string,
    filterable: PropTypes.bool,
  }).isRequired,
  filter: PropTypes.string,
  placeholder: PropTypes.string,
  updateFilter: PropTypes.func.isRequired,
}

export { HeaderFilterCell }
