import { connect, getIn } from 'formik'
import PropTypes from 'prop-types'
import React, { useCallback } from 'react'

import { AutocompleteInput as BaseAutocompleteInput } from 'shared/form/AutocompleteInput'
import { ErrorMessage } from 'shared/form/formik/ErrorMessage'
import { FormikUtils } from 'utils/FormikUtils'

const ConnectedAutocompleteInput = ({ name, formik, ...props }) => {
  const onChange = useCallback(value => formik.setFieldValue(name, value), [formik, name])
  const handleBlur = useCallback(() => formik.setFieldTouched(name), [formik, name])

  return (
    <>
      <BaseAutocompleteInput
        {...props}
        name={name}
        error={FormikUtils.isError(formik, name)}
        value={getIn(formik.values, name)}
        onChange={props.onChange || onChange}
        onBlur={handleBlur}
      />
      <ErrorMessage name={name} />
    </>
  )
}

ConnectedAutocompleteInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,

  formik: PropTypes.shape({
    values: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    setFieldValue: PropTypes.func.isRequired,
    setFieldTouched: PropTypes.func.isRequired,
  }).isRequired,
}

const AutocompleteInput = connect(ConnectedAutocompleteInput)
export { AutocompleteInput }
