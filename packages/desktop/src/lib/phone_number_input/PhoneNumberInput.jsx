import { COLORS } from '@matera-tech/utils'
import { isValidNumber } from 'libphonenumber-js'
import PropTypes from 'prop-types'
import React, { useCallback } from 'react'
import PhoneInput from 'react-phone-number-input'
import flags from 'react-phone-number-input/flags'
import fr from 'react-phone-number-input/locale/fr' // eslint-disable-line
import de from 'react-phone-number-input/locale/de' // eslint-disable-line
import styled from 'styled-components'
import _ from 'underscore'
import 'react-phone-number-input/style.css' // eslint-disable-line

import { useLocalization } from 'hooks/useLocalization'
import { withBaseTranslationContext } from 'shared/withBaseTranslationContext'
import { Input } from 'ui/forms/Input'

const LOCALES_TO_LABELS = {
  fr,
  de,
}

const StyledInput = styled(Input)`
  .PhoneInput {
    color: ${COLORS.gray[1000]};
    font-family: inherit;
    line-height: 20px;
    height: 38px;

    border: 1px solid ${COLORS.gray[500]} !important;
    border-radius: 6px;

    padding: 8px 16px;

    outline: 0;

    ${({ disabled }) =>
      disabled &&
      `
      cursor: not-allowed !important;
      background-color: #eee;
      opacity: 1;
    `}
  }

  ${({ numberNotValid }) =>
    numberNotValid &&
    `
        border-color: ${COLORS.danger.normal} !important;
        background-color: ${COLORS.danger.lighter};

        &:focus {
          border: 2px solid ${COLORS.danger.normal} !important;
        }
      `}

  .PhoneInput--focus {
    border: 2px solid ${COLORS.primary.light} !important;
    padding: 7px 15px;

    ${({ numberNotValid }) =>
      numberNotValid &&
      `
        border-color: ${COLORS.danger.normal} !important;
        background-color: ${COLORS.danger.lighter};

        &:focus {
          border: 2px solid ${COLORS.danger.normal} !important;
        }
      `}
  }

  .PhoneInput__phone,
  .PhoneInput__country.rrui__select--expanded {
    flex: 1;
  }

  .PhoneInput__phone {
    border: 0;

    font-size: inherit;
    font-family: inherit;
    outline: 0;
  }

  .PhoneInput__icon {
    width: 1.24em;
    height: 0.93em;
  }

  .PhoneInput__row {
    display: flex;

    align-items: center;
  }

  .PhoneInput__country--native {
    display: flex;
    position: relative;

    align-items: center;

    margin-right: 0.5em;
    align-self: stretch;
  }

  .PhoneInput__country-select {
    position: absolute;
    opacity: 0;
    z-index: 1;

    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    border: 0;
    cursor: pointer;
  }

  .PhoneInput__country-select-arrow {
    content: "";
    display: block;
    opacity: 0.7;

    width: 0;
    height: 0;

    margin-top: 0.3em;
    margin-bottom: 0.1em;
    margin-left: 0.3em;
    border-width: 0.35em 0.2em 0 0.2em;
    border-style: solid;

    color: ${COLORS.gray[800]};

    transition: color 0.1s;
    border-left-color: transparent;
    border-right-color: transparent;
  }

  .PhoneInput__error {
    margin-top: calc(0.3rem);

    color: ${COLORS.danger.normal};
  }

  .PhoneInputInput {
    border: none;
    outline: none;

    font-size: inherit;
    font-family: inherit;

    ${({ disabled }) =>
      disabled &&
      `
      cursor: not-allowed !important;
    `}
  }
`

const TranslatedPhoneNumberInput = ({
  name,
  value,
  onChange: onChangeProps,
  indicateInvalid,
  disabled,
  ...props
}) => {
  const { country, locale } = useLocalization()

  const onChange = useCallback(
    new_value => onChangeProps(new_value || null, name),
    [onChangeProps, name],
  )

  // Don't use value={value || ""} because 0 is falsy
  let formatted_value = value
  if (value === null || value === undefined) formatted_value = ''

  return (
    <StyledInput
      numberNotValid={!_.isEmpty(formatted_value) && !isValidNumber(formatted_value)}
      disabled={disabled}
    >
      <PhoneInput
        flags={flags}
        displayInitialValueAsLocalNumber
        indicateInvalid={
          indicateInvalid &&
          !_.isEmpty(formatted_value) &&
          formatted_value.startsWith('+') &&
          !isValidNumber(formatted_value)
        }
        defaultCountry={country.toUpperCase()}
        value={formatted_value}
        labels={LOCALES_TO_LABELS[locale]}
        onChange={onChange}
        disabled={disabled}
        {...props}
      />
    </StyledInput>
  )
}

TranslatedPhoneNumberInput.propTypes = {
  className: PropTypes.string,
  wrapperClassName: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  indicateInvalid: PropTypes.bool,
  disabled: PropTypes.bool,
}

TranslatedPhoneNumberInput.defaultProps = {
  className: 'form-control',
  wrapperClassName: '',
  name: 'phone_number',
  indicateInvalid: true,
  disabled: false,
}
const PhoneNumberInput = withBaseTranslationContext(TranslatedPhoneNumberInput)
export { PhoneNumberInput }
