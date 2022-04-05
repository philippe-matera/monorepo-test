import PropTypes from 'prop-types'
import React from 'react'

import { Link } from 'ui/links/Link'

const BackLink = ({ children, ...props }) => (
  <Link id="back-link" {...props} icon="long_arrow_left" icon_before>
    {children}
  </Link>
)

BackLink.propTypes = {
  children: PropTypes.string.isRequired,
}

export { BackLink }
