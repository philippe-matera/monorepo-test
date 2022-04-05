import { COLORS } from '@matera-tech/utils'
import { SUPPORTED_LOCALES } from '@matera-tech/utils/dist/lib/date-fns'
import PropTypes from 'prop-types'
import React, { useCallback, useContext } from 'react'
import ReactDatePicker, { registerLocale } from 'react-datepicker'
import styled from 'styled-components'

import useTranslation from 'hooks/useTranslation'
import { withBaseTranslationContext } from 'shared/withBaseTranslationContext'
import { UIContext } from 'src/UIContext'
import { Input } from 'ui/forms/Input'
import { TextInput } from 'ui/forms/TextInput'
// eslint-disable-next-line import/no-unassigned-import
import 'react-datepicker/dist/react-datepicker.css'

registerLocale('fr', SUPPORTED_LOCALES.fr)
registerLocale('de', SUPPORTED_LOCALES.de)

const InputWithButton = React.forwardRef((props, ref) => (
  <Input icon="calendar">
    <TextInput {...props} ref={ref} />
  </Input>
))

InputWithButton.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
}

// Messes the icon up otherwise
const Wrapper = styled.span`
  .react-datepicker-wrapper {
    width: 100%;
  }

  .react-datepicker__input-container {
    position: inherit !important;

    width: 100%;
  }

  .react-datepicker__header {
    background-color: white;
  }

  .react-datepicker__navigation {
    top: 6px;
    border-width: 4.5px;
    padding-top: 1px;
    padding-bottom: 0px;

    &.react-datepicker__navigation--previous {
      border-right-color: ${COLORS.gray[500]};
    }
    &.react-datepicker__navigation--next {
      border-left-color: ${COLORS.gray[500]};
    }
  }

  .react-datepicker__day {
    &.react-datepicker__day--selected,
    &.react-datepicker__day--keyboard-selected {
      background-color: ${COLORS.primary.normal};
    }

    &:not(.react-datepicker__day--today) {
      font-weight: 400;
    }
    &.react-datepicker__day--disabled {
      color: ${COLORS.gray[400]};
    }

    &:not(.react-datepicker__day--disabled).react-datepicker__day--outside-month {
      color: ${COLORS.gray[600]};
    }
  }

  ul.react-datepicker__time-list {
    padding-left: 4px;
    li.react-datepicker__time-list-item {
      min-width: max-content;
      &:not(.react-datepicker__time-list-item--selected) {
        font-weight: 400;
      }
      &.react-datepicker__time-list-item--selected {
        background-color: ${COLORS.primary.normal} !important;
      }
      &:hover {
        background-color: ${COLORS.gray[200]};
      }
    }
  }
`

const TranslatedDatePicker = ({ onChange: onChangeProps, onBlur, error, ...props }) => {
  const { t } = useTranslation('general')
  const { locale } = useContext(UIContext)

  if (!props.timeSelectCaption) props.timeSelectCaption = t('general:date_picker.hour')

  const onChange = useCallback(
    value => {
      onChangeProps(value, props.name)
      if (onBlur) onBlur() // onBlur in not working in our customInput
    },
    [onChangeProps, props.name, onBlur],
  )

  return (
    <Wrapper>
      <ReactDatePicker
        autoComplete="off"
        customInput={<InputWithButton error={error} />}
        {...props}
        onChange={onChange}
        timeCaption={t('general:date_picker.time')}
        locale={SUPPORTED_LOCALES[locale] || SUPPORTED_LOCALES.fr}
      />
    </Wrapper>
  )
}

// Workaround the glyphicon bug with React Datepicker found on https://codepen.io/jochenberger/pen/ENRNZN

TranslatedDatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  error: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  className: PropTypes.string,
  fixedHeight: PropTypes.bool,
  locale: PropTypes.string,
  dropdownMode: PropTypes.string,
  dateFormat: PropTypes.string,
  timeFormat: PropTypes.string,
  timeSelectCaption: PropTypes.string,
}

TranslatedDatePicker.defaultProps = {
  error: false,
  fixedHeight: true,
  dropdownMode: 'select',
  dateFormat: 'dd MMMM yyyy',
  timeFormat: 'HH:mm',
  className: '',
}

const DatePicker = withBaseTranslationContext(TranslatedDatePicker)
export { DatePicker }
