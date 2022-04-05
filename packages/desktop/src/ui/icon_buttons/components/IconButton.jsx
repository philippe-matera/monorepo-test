import { COLORS } from '@matera-tech/utils'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { CONSTANTS } from 'src/constants'
import { Icon } from 'ui/icons/Icon'
import { Link } from 'ui/links/Link'
import { Tooltip } from 'ui/tooltips/Tooltip'
import { Text } from 'ui/typography/Text'

const CustomLink = styled(Link)`
  display: inline-block !important;

  color: ${COLORS.gray[900]};
  &:hover {
    color: ${COLORS.gray[1000]};
  }

  /* all other icons */
  ${({ icon, color }) =>
    icon.props.name !== 'times' &&
    icon.props.name !== 'search' &&
    icon.props.name !== 'smile' &&
    color !== 'admin' &&
    `
      border-radius: ${CONSTANTS.spacing.xxs};
      padding: ${CONSTANTS.spacing.xs};
      &:hover {
        color: ${COLORS.gray[900]};
        background-color: ${COLORS.gray[300]};
      }
      &:active,
      &:focus {
        color: ${COLORS.gray[900]};
        background-color: ${COLORS.gray[350]};
      }
    `}
  ${({ color }) =>
    color &&
    `
    color: ${COLORS[color].normal};
    padding: 0;
    &:hover {
      color:${COLORS[color].dark};
    }
  `}
`
const IconButton = ({
  icon,
  tooltip_text,
  no_tooltip,
  className,
  to,
  href,
  target_blank,
  cursor,
  loading,
  onClick,
  hover_color,
  icon_props,
  ...props
}) => {
  const link_props = {}
  if (!loading) {
    if (onClick) link_props.onClick = onClick
    if (to) link_props.to = to
    if (href) link_props.href = href
    if (target_blank) link_props.target = '_blank'
    if (hover_color) link_props.hover_color = hover_color
  }

  const link_class_name = loading ? 'disabled' : ''

  const link = (
    <CustomLink
      className={link_class_name}
      {...link_props}
      style={{ cursor }}
      icon={<Icon name={icon} {...icon_props} />}
      {...props}
    />
  )

  return no_tooltip ? (
    <Text className={className}>{link}</Text>
  ) : (
    <Tooltip html={tooltip_text} className={className}>
      {link}
    </Tooltip>
  )
}

IconButton.defaultProps = {
  className: '',
  loading: false,
  target_blank: false,
  no_tooltip: false,
  cursor: 'pointer',
  icon_props: {},
}

IconButton.propTypes = {
  icon: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['success', 'danger', 'primary', 'admin', 'default', 'warning']),
  hover_color: PropTypes.oneOf(['success', 'danger', 'primary', 'admin', 'default']),
  tooltip_text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  no_tooltip: PropTypes.bool,
  icon_props: PropTypes.shape({
    x2: PropTypes.bool,
    x3: PropTypes.bool,
    lg: PropTypes.bool,
    outlined: PropTypes.bool,
    className: PropTypes.string,
    space_after: PropTypes.bool,
    space_before: PropTypes.bool,
    disabled: PropTypes.bool,
  }),
  className: PropTypes.string,
  cursor: PropTypes.string,

  loading: PropTypes.bool,

  to: PropTypes.string,
  href: PropTypes.string,
  target_blank: PropTypes.bool,
  onClick: PropTypes.func,
}

export { IconButton }
