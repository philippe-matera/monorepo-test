import { COLORS } from '@matera-tech/utils'
import PropTypes from 'prop-types'
import React, { useCallback } from 'react'
import styled from 'styled-components'

import { CONSTANTS } from 'src/constants'
import { Icon } from 'ui/icons/Icon'
import { Clickable } from 'ui/links/Clickable'
import { Badge } from 'ui/tags/Badge'

const COLOR_HASH = {
  default: {
    default: {
      color: 'inherit',
    },
    hover: {
      color: COLORS.primary.normal,
    },
    active: {
      color: COLORS.primary.darker,
    },
  },
  admin: {
    default: {
      color: COLORS.admin.normal,
    },
    hover: {
      color: COLORS.admin.dark,
    },
    active: {
      color: COLORS.admin.darker,
    },
  },
}

const StyledTabHeader = styled.li`
  display: inline-block;

  padding: 0 ${CONSTANTS.spacing.xs} ${CONSTANTS.spacing.s} ${CONSTANTS.spacing.xs};
  cursor: pointer;
  font-weight: 500;

  font-size: 16px;
  color: ${({ color }) => COLOR_HASH[color].default.color};

  &:hover {
    color: ${({ color }) => COLOR_HASH[color].hover.color};
  }

  &:active {
    color: ${({ color }) => COLOR_HASH[color].active.color};
  }

  ${({ active, color }) =>
    active &&
    `
    color: ${COLOR_HASH[color].hover.color};

    &:after {
      content: "";
      display: block;
      width: 100%;
      position: relative;
      top: 16px;
      border-bottom: 2px solid ${COLOR_HASH[color].hover.color};
    }
  `}
`

const TabHeader = ({
  tab_key,
  active,
  title,
  icon,
  badge,
  badge_color,
  color,
  to,
  href,
  onClick,
}) => {
  const onHeaderClick = useCallback(() => {
    if (onClick) onClick(tab_key)
  }, [onClick, tab_key])

  return (
    <Clickable onClick={onHeaderClick} to={to} href={href}>
      <StyledTabHeader active={active} color={color}>
        {icon && (
          <>
            <Icon name={icon} />
            &nbsp;&nbsp;
          </>
        )}
        {title}
        {!!badge && (
          <>
            &nbsp;&nbsp;
            <Badge color={badge_color}>{badge}</Badge>
          </>
        )}
      </StyledTabHeader>
    </Clickable>
  )
}

TabHeader.defaultProps = {
  badge_color: 'primary',
  color: 'default',
}

TabHeader.propTypes = {
  tab_key: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,

  icon: PropTypes.string,

  badge: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  badge_color: PropTypes.string,

  color: PropTypes.oneOf(['default', 'admin']),

  to: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
}

export { TabHeader }
