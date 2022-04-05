import { COLORS } from '@matera-tech/utils'
import PropTypes from 'prop-types'
import React from 'react'
import styled, { css } from 'styled-components'

import { useLocalizedDate } from 'hooks/useLocalizedDate'
import { numeral } from 'lib/numeral'
import { ModalCta } from 'shared/ModalCta'
import { CONSTANTS } from 'src/constants'
import { Tooltip } from 'ui/tooltips/Tooltip'

const getHoverStyles = (disabled, error) => {
  if (error) {
    return css`
      background-color: ${COLORS.gray[100]};
      border: 1px solid ${COLORS.danger.normal};
    `
  }
  if (!disabled) {
    return css`
      background-color: ${COLORS.primary.lighter};
      border: 1px solid ${COLORS.primary.normal};
    `
  }

  return null
}
const StyledInput = styled.input`
  min-height: 32px;
  border-radius: 4px;

  border: 1px solid ${COLORS.gray[400]};

  color: ${COLORS.gray[1000]};

  background-color: white;

  padding: ${CONSTANTS.spacing.xxs} ${CONSTANTS.spacing.xs};
  margin: 0 ${CONSTANTS.spacing.xs};

  font-family: inherit;
  font-size: ${({ large_font_size }) => (large_font_size ? "18px" : "16px")};
  cursor: pointer;
  white-space: normal;

  text-align: left;

  display: inline-block;
  user-select: none;
  touch-action: manipulation;
  outline: none !important;

  transition: padding 50ms ease, background-color 50ms ease, border 50ms ease;
  ${({ disabled }) =>
    disabled &&
    `
    cursor: not-allowed !important;
    background-color: ${COLORS.gray[100]};
  `}
  ${({ error }) => error && `border: 1px solid ${COLORS.danger.normal};`}
  ${({ empty, disabled, error }) => (empty || disabled || error) && `color: ${COLORS.gray[800]};`}
  ${({ hover, disabled, error }) => hover && getHoverStyles(disabled, error)}
  :hover, :focus {
    ${({ disabled, error }) => getHoverStyles(disabled, error)}
  }
  :active,
  :active:focus,
  :active:hover {
    ${({ disabled }) =>
      !disabled &&
      `
      background-color: ${COLORS.primary.lighter};
      border: 2px solid ${COLORS.primary.normal};
      padding: 3px 7px;
    `}
    ${({ error }) =>
      error &&
      `
      background-color: ${COLORS.gray[100]};
      border: 2px solid ${COLORS.danger.normal};
      padding: 3px 7px;
    `}
  }
`
const FillableText = React.forwardRef(
  (
    {
      modal_props,
      wrappedComponent,
      wrapped_props,
      value,
      type,
      placeholder,
      disabled,
      disabled_tooltip,
      hover,
      onHide,
      ...props
    },
    ref,
  ) => {
    const { format } = useLocalizedDate()
    const empty = value === undefined || value === '' || value === null

    const getValue = () => {
      if (empty) return placeholder || '..........'
      if (type === 'date') return format(value, 'date.explicit')
      if (type === 'currency') return numeral.format(value)

      return value
    }

    const content = (
      <ModalCta
        modalProps={modal_props}
        wrappedComponent={wrappedComponent}
        wrappedProps={wrapped_props}
        disabled={disabled}
        onHide={onHide}
      >
        <StyledInput
          type="button"
          {...props}
          ref={ref}
          value={getValue()}
          empty={empty}
          disabled={disabled}
          hover={hover}
        />
      </ModalCta>
    )

    if (disabled && disabled_tooltip) {
      return (
        <Tooltip position="top" title={disabled_tooltip}>
          {content}
        </Tooltip>
      )
    }

    return content
  },
)

FillableText.propTypes = {
  modal_props: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    small: PropTypes.bool,
  }).isRequired,
  wrappedComponent: PropTypes.func.isRequired,
  wrapped_props: PropTypes.shape({
    onSuccess: PropTypes.func,
  }),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  type: PropTypes.oneOf(['date', 'currency']),
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  disabled_tooltip: PropTypes.string,
  hover: PropTypes.bool,
  onHide: PropTypes.func,
}
FillableText.defaultProps = {
  disabled: false,
  hover: false,
}

export { FillableText }
