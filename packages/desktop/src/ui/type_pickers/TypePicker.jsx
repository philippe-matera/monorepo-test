import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { CONSTANTS } from 'src/constants'
import { DetailedType } from 'ui/type_pickers/components/DetailedType'
import { Type } from 'ui/type_pickers/components/Type'

const Container = styled.div`
  :not(:empty) {
    margin-top: -${CONSTANTS.spacing.xs};
  }

  & > .tooltip-wrapper > *,
  & > .ninja > *,
  & > *:not(.tooltip-wrapper):not(.ninja) {
    margin-top: ${CONSTANTS.spacing.xs};
  }

  ${({ margin_right }) =>
    margin_right &&
    `& > :not(:last-child) {
  margin-right: ${CONSTANTS.spacing.s};
}`}
`

const TypePicker = ({
  name,
  available_types,
  selected_type,
  color,
  disabled,
  onChange,
  detailed,
  full_width,
}) => {
  const filtered_available_types = available_types.filter(type => type)
  if (filtered_available_types.length <= 1) return null

  return (
    <Container margin_right={!detailed}>
      {filtered_available_types.map(available_type => {
        const TypeComponent = detailed ? DetailedType : Type

        return (
          <TypeComponent
            key={available_type.value}
            name={name}
            color={available_type.color || color}
            disabled={disabled || available_type.disabled}
            disabled_tooltip={available_type.disabled_tooltip}
            value={available_type.value}
            description={available_type.description}
            help_text={available_type.help_text}
            label={available_type.label}
            tooltip={available_type.tooltip}
            selected={available_type.value === selected_type}
            onChange={onChange}
            full_width={full_width}
          />
        )
      })}
    </Container>
  )
}

TypePicker.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['primary', 'admin']),
  disabled: PropTypes.bool,
  detailed: PropTypes.bool,
  available_types: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
      tooltip: PropTypes.string,
      disabled: PropTypes.bool,
      disabled_tooltip: PropTypes.string,
    }).isRequired,
  ).isRequired,
  selected_type: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  onChange: PropTypes.func.isRequired,
  full_width: PropTypes.bool,
}

TypePicker.defaultProps = {
  color: 'primary',
  disabled: false,
  detailed: false,
  full_width: false,
}

export { TypePicker }
