import { COLORS } from '@matera-tech/utils'
import PropTypes from 'prop-types'
import React, { useCallback } from 'react'
import NumberFormat from 'react-number-format'
import styled from 'styled-components'

import useTranslation from 'hooks/useTranslation'
import { withBaseTranslationContext } from 'shared/withBaseTranslationContext'
import { Input } from 'ui/forms/Input'
import { Suffix } from 'ui/forms/Suffix'

const InlineDiv = styled.div`
  display: inline-flex;

  width: 100%;
  min-width: 150px;
`

// Weird input[type="text"]&:focus + !important on outlines are needed to prevent zoom sdk messing up
const StyledNumberFormat = styled(NumberFormat).withConfig({
  shouldForwardProp: prop => !['error'].includes(prop),
})`
  display: ${({ inline }) => (inline ? "inline-block" : "block")};

  padding: 10px 12px;

  width: 100%;

  color: ${COLORS.gray[1000]};
  text-overflow: ellipsis;
  font-weight: 400 !important;

  font-size: 16px;
  line-height: 20px;

  height: 40px;

  font-family: inherit;

  border: 1px solid ${COLORS.gray[500]} !important;
  border-radius: 6px;
  ${({ displayed_suffix }) =>
    displayed_suffix && `border-top-right-radius: 0px; border-bottom-right-radius: 0px;`}

  transition: border-color 0.1s ease-in-out 0s, border-width 0.1s ease-in-out 0s, box-shadow 0.3s ease-in-out 0s;

  input[type="text"]& {
    outline: 0 !important;
    outline-offset: 0 !important;
  }

  &:focus,
  input[type="text"]&:focus {
    border: 2px solid ${COLORS.primary.light} !important;
    outline: 0 !important;
    outline-offset: 0 !important;
  }

  ${({ color }) => color && `color: ${COLORS[color].normal}`}

  ${({ error }) =>
    error &&
    `
        border-color: ${COLORS.danger.normal} !important;
        background-color: ${COLORS.danger.lighter};

        &:focus {
          border: 2px solid ${COLORS.danger.normal} !important;
          outline: 0;
        }
      `}

  ${({ disabled }) =>
    disabled &&
    `
      cursor: not-allowed !important;
      background-color: ${COLORS.gray[100]};
      opacity: 1;
    `}
`

const SUFFIX_TO_SPAN = {
  percentage: '%',
  currency: '€',
  surface: 'm²',
  volume: 'm³',
}

const TranslatedNumericInput = ({ value, suffix, onChange, decimalScale, ...props }) => {
  const { t } = useTranslation('general')

  const onValueChange = useCallback(
    values => {
      onChange(values.value, props.name)
    },
    [onChange, props.name],
  )

  const displayed_suffix = SUFFIX_TO_SPAN[suffix]

  // Don't use value={this.state.value || ''} because 0 is falsy
  // Instead we override the value here if it is null or undefined
  let formatted_value = value
  if (value === null || value === undefined) formatted_value = ''

  // Avoid displaying "0" when value is empty
  const isNumericString = formatted_value !== ''

  const isAllowed = useCallback(
    obj =>
      obj.value === '' ||
      ((props.min === undefined || obj.floatValue >= props.min) &&
        (props.max === undefined || obj.floatValue <= props.max)),
    [props.min, props.max],
  )

  const localProps = {
    displayed_suffix,
    decimalSeparator: t('general:numeric_input.decimal_separator'),
    thousandSeparator: t('general:numeric_input.thousand_separator'),
    decimalScale,
    fixedDecimalScale: suffix === 'currency', // Add 0s to match given decimalScale for currency
    onValueChange,
    isNumericString,
    allowedDecimalSeparator: ['.'],
    value: formatted_value,
    isAllowed,
  }

  if (suffix === 'currency') {
    return (
      <Input>
        <InlineDiv>
          <StyledNumberFormat {...localProps} {...props} />
          {displayed_suffix && <Suffix>{displayed_suffix}</Suffix>}
        </InlineDiv>
      </Input>
    )
  }

  return (
    <InlineDiv>
      <StyledNumberFormat {...localProps} {...props} />
      {displayed_suffix && <Suffix>{displayed_suffix}</Suffix>}
    </InlineDiv>
  )
}

TranslatedNumericInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  decimalScale: PropTypes.number,
  name: PropTypes.string,
  color: PropTypes.oneOf(['danger', 'success']),
  suffix: PropTypes.oneOf(['currency', 'percentage', 'surface', 'volume']),
}

TranslatedNumericInput.defaultProps = {
  decimalScale: 2,
}

const NumericInput = withBaseTranslationContext(TranslatedNumericInput)
export { NumericInput }
