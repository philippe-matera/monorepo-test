import PropTypes from 'prop-types'
import React from 'react'

import { Text } from 'ui/typography/Text'

const EmptyList = ({ children }) => (
  <Text italic bold>
    {children}
  </Text>
)

EmptyList.propTypes = {
  children: PropTypes.string.isRequired,
}

export { EmptyList }
