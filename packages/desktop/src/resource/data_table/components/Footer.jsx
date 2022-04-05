import PropTypes from 'prop-types'
import React from 'react'

import { FooterRow } from 'resource/data_table/components/FooterRow'

const Footer = ({ footer_rows }) => {
  const rows = footer_rows.map(row => <FooterRow key={row.key} row={row} />)

  return <tfoot>{rows}</tfoot>
}

Footer.propTypes = {
  footer_rows: PropTypes.arrayOf(PropTypes.object),
}

export { Footer }
