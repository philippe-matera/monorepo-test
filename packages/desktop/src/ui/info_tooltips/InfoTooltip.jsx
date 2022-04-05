import PropTypes from 'prop-types'
import React from 'react'

import { Icon } from 'ui/icons/Icon'
import { Tooltip } from 'ui/tooltips/Tooltip'
import { Text } from 'ui/typography/Text'
import { Block } from 'ui/wrappers/Block'

const ICONS = {
  admin: 'question_circle',
  primary: 'question_circle',
  warning: 'exclamation_triangle',
  danger: 'exclamation_circle',
}

const InfoTooltip = ({ color, text }) => (
  <Block inline>
    <Tooltip text={text}>
      <Text color={color}>
        <Icon name={ICONS[color]} space_before space_after />
      </Text>
    </Tooltip>
  </Block>
)

InfoTooltip.defaultProps = {
  color: 'primary',
}

InfoTooltip.propTypes = {
  color: PropTypes.oneOf(['primary', 'warning', 'danger', 'admin']),
  text: PropTypes.string,
}

export { InfoTooltip }
