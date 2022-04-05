import PropTypes from 'prop-types'
import React from 'react'

import { CircularSpinner } from 'ui/loaders/CircularSpinner'

const LoadingWrapper = ({ loading, children, small }) => {
  if (loading) {
    return <CircularSpinner xl={!small ?? true} />
  }

  return children || null
}

LoadingWrapper.propTypes = {
  loading: PropTypes.bool.isRequired,
  children: PropTypes.node,
  small: PropTypes.bool,
}

LoadingWrapper.defaultProps = {
  small: false,
}

export { LoadingWrapper }
