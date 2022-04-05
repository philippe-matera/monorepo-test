import { connect, getIn } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'

import { ErrorMessage } from 'shared/form/formik/ErrorMessage'
import { TextInput as BaseTextInput } from 'ui/forms/TextInput'
import { FormikUtils } from 'utils/FormikUtils'

const ConnectedTextInput = ({ name, formik, onChange, errorProps, ...props }) => (
  <>
    <BaseTextInput
      {...props}
      name={name}
      value={getIn(formik.values, name)}
      onChange={onChange || formik.handleChange}
      onBlur={formik.handleBlur}
      error={FormikUtils.isError(formik, name)}
    />
    <ErrorMessage name={name} {...errorProps} />
  </>
)

ConnectedTextInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,

  formik: PropTypes.shape({
    values: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
  }).isRequired,
  errorProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
}

ConnectedTextInput.defaultProps = {
  errorProps: {},
}

const TextInput = connect(ConnectedTextInput)
export { TextInput }
