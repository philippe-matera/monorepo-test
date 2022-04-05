import { COLORS } from '@matera-tech/utils'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { CONSTANTS } from 'src/constants'
import { AbstractClickableElement } from 'src/shared/AbstractClickableElement'
import { CircularSpinner } from 'ui/loaders/CircularSpinner'
import { Tooltip } from 'ui/tooltips/Tooltip'

const COLOR_HASH = {
  primary: {
    default: {
      background_color: COLORS.primary.normal,
      color: 'white',
    },
    hover: {
      background_color: COLORS.primary.hover,
      box_shadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
    },
    active: {
      background_color: COLORS.primary.dark,
    },
  },
  default: {
    default: {
      background_color: 'white',
      box_shadow: `0px 0px 0px 1px ${COLORS.gray[400]}`,
      color: COLORS.gray[900],
    },
    hover: {
      box_shadow: `0px 0px 0px 1px ${COLORS.gray[400]}, 0px 1px 3px 1px ${COLORS.gray[400]};`,
    },
    active: {
      background_color: COLORS.gray[100],
      color: COLORS.gray[900],
    },
  },
  danger: {
    default: {
      background_color: COLORS.danger.normal,
      color: 'white',
    },
    hover: {
      background_color: COLORS.danger.dark,
      box_shadow: `0px 4px 6px ${COLORS.gray[1000]}1A`,
    },
    active: {
      background_color: COLORS.danger.darker,
    },
  },
  tertiary: {
    default: {
      color: COLORS.gray[900],
      background_color: COLORS.white.normal,
    },
    hover: {
      background_color: COLORS.gray[200],
    },
    active: {
      background_color: COLORS.gray[350],
    },
  },
  admin: {
    default: {
      background_color: COLORS.admin.normal,
      color: 'white',
    },
    hover: {
      background_color: COLORS.admin.dark,
      box_shadow: `0px 4px 6px ${COLORS.gray[1000]}1A`,
    },
    active: {
      background_color: COLORS.admin.darker,
    },
  },
  warning: {
    default: {
      background_color: COLORS.warning.normal,
      color: 'white',
    },
    hover: {
      background_color: COLORS.warning.dark,
      box_shadow: `0px 4px 6px ${COLORS.gray[1000]}1A`,
    },
    active: {
      background_color: COLORS.warning.darker,
    },
  },
}

// prettier-ignore
const StyledButton = styled(AbstractClickableElement).withConfig({
  shouldForwardProp: prop => !["sm", "lg", "color", "loading", "block"].includes(prop),
})`
  border-radius: ${CONSTANTS.spacing.xxs};
  border: none;
  padding: ${CONSTANTS.spacing.xs} ${CONSTANTS.spacing.s};
  font-weight: 500;
  font-size: ${CONSTANTS.spacing.s};
  line-height: ${CONSTANTS.spacing.m};
  cursor: pointer;
  white-space: normal;
  display: inline-block;
  user-select: none;
  touch-action: manipulation;
  transition: color 0.20s ease-in-out, background-color 0.20s ease-in-out, box-shadow 0.20s ease-in-out;
  outline: none !important;
  position: relative;
  text-decoration: none;
  font-family: inherit;
  color: ${({color}) => COLOR_HASH[color].default.color};

  background-color: ${({color}) => COLOR_HASH[color].default.background_color};
  box-shadow: ${({color}) => COLOR_HASH[color].default.box_shadow && COLOR_HASH[color].default.box_shadow};

  ${({disabled}) => disabled && `
    opacity: .5;
    cursor: not-allowed !important;
  `}

  ${({loading, color}) => loading && `
    opacity: 1;
    color: ${COLOR_HASH[color].default.background_color};
  `}
  
  :hover,
  :focus {
    ${({disabled, color}) => !disabled && `
    color: ${COLOR_HASH[color].hover.color || COLOR_HASH[color].default.color};
    background-color: ${COLOR_HASH[color].hover.background_color || COLOR_HASH[color].default.background_color};
    box-shadow: ${(COLOR_HASH[color].hover.box_shadow || COLOR_HASH[color].default.box_shadow) &&
      (COLOR_HASH[color].hover.box_shadow || COLOR_HASH[color].default.box_shadow)};
      `}
  
    ${({active, color}) => active &&` 
      color: ${COLOR_HASH[color].active.color || COLOR_HASH[color].default.color};
      background-color: ${COLOR_HASH[color].active.background_color || COLOR_HASH[color].default.background_color};
      box-shadow: ${(COLOR_HASH[color].active.box_shadow || COLOR_HASH[color].default.box_shadow) &&
        (COLOR_HASH[color].active.box_shadow || COLOR_HASH[color].default.box_shadow)};
    `}
  }

  :active,
  :active:focus,
  :active:hover {
    ${({disabled, color}) => !disabled && `
      color: ${COLOR_HASH[color].active.color || COLOR_HASH[color].default.color};
      background-color: ${COLOR_HASH[color].active.background_color || COLOR_HASH[color].default.background_color};
      box-shadow: ${(COLOR_HASH[color].active.box_shadow || COLOR_HASH[color].default.box_shadow) &&
        (COLOR_HASH[color].active.box_shadow || COLOR_HASH[color].default.box_shadow)};
    `}
  }

  ${({lg}) => lg && `
    padding: 12px 32px;
    font-size: 16px;
    line-height: 32px;
  `}

  ${({block}) => block && `
    width: 100%;
  `}
`

// prettier-ignore
const ButtonSpinner = styled(CircularSpinner)`
  position: absolute;

  top: calc(50% - 10px);
  left: calc(50% - 10px);
`

const COLOR_OVERRIDE = {
  success: 'primary',
  warning: 'danger',
}
const Button = React.forwardRef(
  (
    { children, className, color, disabled, active, disabled_tooltip, loading, tooltip, ...props },
    ref,
  ) => {
    const overridden_color = COLOR_OVERRIDE[color] ?? color
    const button = (
      <StyledButton
        {...props}
        className={`button ${className}`}
        color={overridden_color}
        disabled={disabled || loading}
        loading={loading}
        ref={ref}
        active={active}
      >
        {loading && (
          <ButtonSpinner
            color={['primary', 'danger'].includes(overridden_color) ? 'white' : 'black'}
          />
        )}
        {children}
      </StyledButton>
    )

    if (disabled && disabled_tooltip) {
      return <Tooltip text={disabled_tooltip}>{button}</Tooltip>
    }

    if (tooltip) {
      return <Tooltip {...tooltip}>{button}</Tooltip>
    }

    return button
  },
)

Button.displayName = 'Button'

Button.propTypes = {
  block: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.oneOf(['primary', 'success', 'danger', 'default', 'tertiary', 'admin']),
  disabled: PropTypes.bool,
  disabled_tooltip: PropTypes.string,
  href: PropTypes.string,
  id: PropTypes.string,
  lg: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  sm: PropTypes.bool,
  to: PropTypes.string,
  active: PropTypes.bool,
  // we're just passing this through to Tooltip.jsx who'll handle the check
  // eslint-disable-next-line react/forbid-prop-types
  tooltip: PropTypes.any,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
}

Button.defaultProps = {
  className: '',
  color: 'primary',
  lg: false,
  loading: false,
  sm: false,
  active: false,
}

export { Button }
