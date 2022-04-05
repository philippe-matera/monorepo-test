import { connect, getIn } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'

import { numeral } from 'lib/numeral'
import { ErrorMessage } from 'shared/form/formik/ErrorMessage'
import { FakeInput as BaseFakeInput } from 'ui/forms/FakeInput'
import { FormikUtils } from 'utils/FormikUtils'

const ConnectedFakeInput = ({
  id,
  name,
  placeholder,
  className,
  errorProps,
  onClick,
  formik,
  disabled,
  currency,
}) => {
  let value = getIn(formik.values, name)
  if (currency) value = numeral.format(value)

  return (
    <>
      <BaseFakeInput
        id={id}
        name={name}
        className={className}
        error={FormikUtils.isError(formik, name)}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onClick={onClick}
        readOnly
      />
      <ErrorMessage name={name} {...errorProps} />
    </>
  )
}

ConnectedFakeInput.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  currency: PropTypes.bool,
  onClick: PropTypes.func.isRequired,

  formik: PropTypes.shape({
    values: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
  }).isRequired,
  errorProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
}

ConnectedFakeInput.defaultProps = {
  className: '',
  placeholder: '',
  disabled: false,
  currency: false,
  errorProps: {},
}

const FakeInput = connect(ConnectedFakeInput)
export { FakeInput }
