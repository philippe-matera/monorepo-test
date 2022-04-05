import { COLORS } from '@matera-tech/utils'
import PropTypes from 'prop-types'
import React, { useCallback } from 'react'
import styled from 'styled-components'

import { Tooltip } from 'ui/tooltips/Tooltip'

const color_hash = color => ({
  primary: {
    selected: {
      background: COLORS.white.normal,
      text: COLORS[color].normal,
    },
    selectedHover: {
      text: COLORS[color].normal,
    },
    default: {
      border: COLORS.gray[500],
      text: COLORS.gray[1000],
    },
    hover: {
      background: COLORS.white.normal,
    },
  },
  admin: {
    selected: {
      background: COLORS[color].normal,
      text: COLORS.white.normal,
    },
    selectedHover: {
      text: COLORS.white.normal,
    },
    default: {
      border: COLORS[color].normal,
      text: COLORS[color].normal,
    },
    hover: {
      background: COLORS[color].lighter,
    },
  },
})

const StyledType = styled.label`
  display: inline-block;

  padding: 10px 16px;
  border: 1px solid ${({ color }) => color_hash(color) [color].default.border};

  color: ${({ color }) => color_hash(color) [color].default.text};
  border-radius: 8px;
  font-weight: 400;
  cursor: pointer;

  text-align: center;
  user-select: none;

  ${({ full_width }) => full_width && 'width: calc(50% - 16px);'}

  &::after {
    content: attr(data-title);
    display: block;
    overflow: hidden;
    visibility: hidden;

    height: 0px;

    color: transparent;
    font-weight: bold;
  }

  ${({ disabled, color, selected }) =>
    disabled
      ? `
    color: ${COLORS.gray[600]};
    border-color: ${COLORS.gray[500]};
    cursor: no-drop;
  `
      : `
    &:hover {
      background-color: ${
        selected
          ? color_hash(color)[color].selected.background
          : color_hash(color)[color].hover.background
      }
      border-color: ${COLORS[color].normal};
      color: ${selected ? color_hash(color)[color].selectedHover.text : COLORS[color].normal};
    }

    &:active {
      background-color: ${COLORS[color].lighter};
      color: ${COLORS[color].normal};
    }
  `}

  ${({ selected, color }) =>
    selected &&
    `
    background-color: ${color_hash(color)[color].selected.background};
    border-color: ${COLORS[color].normal};
    color: ${color_hash(color)[color].selected.text};
    font-weight: bold;
  `}
`

const Type = ({
  name,
  full_width,
  value,
  label,
  selected,
  color,
  tooltip,
  disabled,
  disabled_tooltip,
  onChange,
}) => {
  const onClick = useCallback(() => {
    if (!disabled) onChange(value, name)
  }, [name, onChange, value, disabled])

  const content = (
    <StyledType
      htmlFor={`${name}${value}`}
      selected={selected}
      disabled={disabled}
      full_width={full_width}
      data-title={label}
      color={color}
      onClick={onClick}
    >
      {label}
    </StyledType>
  )

  if (disabled && disabled_tooltip) return <Tooltip text={disabled_tooltip}>{content}</Tooltip>
  if (tooltip) return <Tooltip text={tooltip}>{content}</Tooltip>

  return content
}

Type.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  color: PropTypes.oneOf(['primary', 'admin']),
  tooltip: PropTypes.string,
  disabled: PropTypes.bool,
  full_width: PropTypes.bool,
  disabled_tooltip: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

Type.defaultProps = {
  disabled: false,
}

export { Type }
