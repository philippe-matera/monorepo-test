import PropTypes from 'prop-types'
import React from 'react'

import { Link } from 'ui/links/Link'

const HelpCenterLink = ({ children, icon, ...props }) => (
  <Link
    color="primary"
    target_blank
    icon={icon ? 'external_link' : null}
    rel="noopener noreferrer"
    {...props}
  >
    {children}
  </Link>
)

HelpCenterLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  icon: PropTypes.bool,
}

HelpCenterLink.defaultProps = {
  icon: true,
}

export { HelpCenterLink }
