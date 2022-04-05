import { COLORS } from '@matera-tech/utils'
import PropTypes from 'prop-types'
import React, { useCallback, useMemo } from 'react'
import styled from 'styled-components'

import { CONSTANTS } from 'src/constants'
import { Radio } from 'ui/forms/Radio'
import { Tooltip } from 'ui/tooltips/Tooltip'
import { Text } from 'ui/typography/Text'
import { Block } from 'ui/wrappers/Block'

const StyledDetailedType = styled.div`
  display: inline-block;

  padding: 10px 16px;
  border: 1px solid ${COLORS.gray[500]};
  border-radius: 12px;
  cursor: pointer;
  user-select: none;
  ${({ full_width }) => (full_width ? 'width: 100%;' : 'width: calc(50% - 16px);')}

  ${({ selected }) =>
    selected &&
    `
      &:hover {
        box-shadow: 0px 2px 3px rgba(64, 96, 128, 0.1);
      }
    `}

  &:active {
    label {
      ${({ color }) => `color: ${COLORS[color].dark};`}
    }
  }

  &:hover {
    label {
      ${({ color }) => `color: ${COLORS[color].normal};`}
    }
  }

  ${({ selected, color }) =>
    selected &&
    `
    border-color: ${COLORS[color].normal};

    label {
      color: ${COLORS[color].normal};
    }
  `}
`
const StyledHelpText = styled.div`
  margin-top: ${CONSTANTS.spacing.xxs};
  line-height: 20px;
`

const DetailedType = ({
  name,
  value,
  label,
  description,
  help_text,
  selected,
  color,
  tooltip,
  disabled,
  disabled_tooltip,
  onChange,
  full_width,
}) => {
  const onClick = useCallback(() => {
    if (!disabled) onChange(value, name)
  }, [name, onChange, value, disabled])

  const radio_label = useMemo(() => <Text bold>{label}</Text>, [label])

  const content = (
    <StyledDetailedType
      htmlFor={`${name}${value}`}
      selected={selected}
      disabled={disabled}
      data-title={label}
      color={color}
      onClick={onClick}
      full_width={full_width}
    >
      <Radio color={color} checked={selected} disabled={disabled} label={radio_label} />
      {description && (
        <Block top="xs" left="m">
          <Text muted>{description}</Text>
        </Block>
      )}
    </StyledDetailedType>
  )

  let option = content
  if (disabled && disabled_tooltip) option = <Tooltip text={disabled_tooltip}>{content}</Tooltip>
  if (tooltip) option = <Tooltip text={tooltip}>{content}</Tooltip>

  if (full_width && help_text) {
    return (
      <Block bottom="s">
        {option}
        <StyledHelpText>
          <Text small muted>
            {help_text}
          </Text>
        </StyledHelpText>
      </Block>
    )
  }

  return <Block bottom="xs">{option}</Block>
}

DetailedType.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  help_text: PropTypes.string,
  selected: PropTypes.bool.isRequired,
  color: PropTypes.oneOf(['primary', 'admin']),
  tooltip: PropTypes.string,
  disabled: PropTypes.bool,
  disabled_tooltip: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  full_width: PropTypes.bool,
}

DetailedType.defaultProps = {
  disabled: false,
  color: 'primary',
  full_width: false,
}

export { DetailedType }
