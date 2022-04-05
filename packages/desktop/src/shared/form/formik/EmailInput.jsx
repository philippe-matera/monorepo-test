import { connect, getIn } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'

import { ErrorMessage } from 'shared/form/formik/ErrorMessage'
import { EmailInput as BaseEmailInput } from 'ui/forms/EmailInput'
import { FormikUtils } from 'utils/FormikUtils'

const ConnectedEmailInput = ({ name, onChange, formik, disabled, ...props }) => (
  <>
    <BaseEmailInput
      name={name}
      wrapperClass={FormikUtils.errorClassName(formik, name)}
      error={FormikUtils.isError(formik, name)}
      value={getIn(formik.values, name)}
      onChange={onChange || formik.handleChange}
      onBlur={formik.handleBlur}
      disabled={disabled}
      {...props}
    />
    <ErrorMessage name={name} {...props.errorProps} />
  </>
)

ConnectedEmailInput.propTypes = {
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,

  formik: PropTypes.shape({
    values: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
  }).isRequired,
  errorProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
}

ConnectedEmailInput.defaultProps = {
  disabled: false,
  errorProps: {},
}

const EmailInput = connect(ConnectedEmailInput)
export { EmailInput }
