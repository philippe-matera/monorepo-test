import { COLORS } from '@matera-tech/utils'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { AbstractClickableElement } from 'src/shared/AbstractClickableElement'
import { Icon } from 'ui/icons/Icon'
import { Text } from 'ui/typography/Text'

// prettier-ignore
const StyledLink = styled(AbstractClickableElement)`
  background-color: transparent;

  border: 0;

  text-decoration: none;
  color: ${COLORS.primary.normal};
  font: inherit;
  font-weight: 500;
  cursor: pointer;

  text-align: inherit;

  padding: 0;
  transition-duration: 0.2s;
  
  &:hover,
  &:active,
  &:focus {
    outline: 0;
  }

  &:hover {
    color: ${COLORS.primary.hover};
  }

  &:active,
  &:focus {
    color: ${COLORS.primary.darker};
  }

  ${({color, hover_color, icon, hover_level, color_level}) =>
    color && icon?.props?.name !== "times" &&
    `
      color: ${COLORS[color][color_level || "normal"]};
      &:hover {
        color: ${COLORS[hover_color || color][hover_level || "hover"]};
      }
      &:active, &:focus {
        color: ${COLORS[hover_color || color][hover_level || "dark"]};
      }
    `
  }

    ${({disabled}) =>
    disabled &&
    `
      opacity: .5;
      cursor: not-allowed !important;
    `
  }
`

const Link = ({ children, icon, icon_before, disabled, ...props }) => {
  const renderIcon = icon_props => {
    if (typeof icon === 'string') return <Icon {...icon_props} name={icon} />

    return icon
  }

  return (
    <StyledLink disabled={disabled} icon={icon} {...props}>
      {icon && icon_before && renderIcon({ space_after: true })}
      <Text>{children}</Text>
      {icon && !icon_before && renderIcon({ space_before: true })}
    </StyledLink>
  )
}

Link.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.node]),
  color: PropTypes.string,
  color_level: PropTypes.string,
  hover_color: PropTypes.string,
  hover_level: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  icon_before: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  to: PropTypes.string,
}

Link.defaultProps = {
  color: 'primary',
  color_level: 'normal',
  hover_level: 'hover',
  icon_before: false,
}

export { Link }
