import PropTypes from 'prop-types'
import React from 'react'

import { Icon } from 'ui/icons/Icon'
import { Text } from 'ui/typography/Text'

const NoteInfo = props => (
  <Text color="primary">
    <Icon name="info_circle" space_after />
    {props.content}
  </Text>
)

NoteInfo.propTypes = {
  content: PropTypes.string,
}

export { NoteInfo }
