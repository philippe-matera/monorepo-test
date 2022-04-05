import PropTypes from 'prop-types'
import React from 'react'

import { HeaderFilterRow } from 'resource/data_table/components/HeaderFilterRow'
import { HeaderRow } from 'resource/data_table/components/HeaderRow'

const Header = props => {
  const header_row = <HeaderRow onClickSortColumn={props.onClickSortColumn} />
  const filter_row = props.filtering && (
    <HeaderFilterRow placeholder={props.filter_placeholder} updateFilter={props.updateFilter} />
  )

  return (
    <thead>
      {header_row}
      {filter_row}
    </thead>
  )
}

Header.propTypes = {
  filtering: PropTypes.bool,
  filter_placeholder: PropTypes.string,
  updateFilter: PropTypes.func,
  onClickSortColumn: PropTypes.func,
}

Header.defaultProps = {
  filtering: false,
}

export { Header }
