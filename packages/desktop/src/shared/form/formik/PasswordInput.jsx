import { connect, getIn } from 'formik'
import PropTypes from 'prop-types'
import React, { useCallback } from 'react'
import _ from 'underscore'

import { ErrorMessage } from 'shared/form/formik/ErrorMessage'
import { PasswordInput as BasePasswordInput } from 'ui/forms/PasswordInput'

const ConnectedPasswordInput = props => {
  const onChange = useCallback(
    e => {
      props.formik.setFieldValue(props.name, e.target.value)
      if (props.onAfterChange) props.onAfterChange(e.target.value)
    },
    [props],
  )

  return (
    <>
      <BasePasswordInput
        {..._.omit(props, ['formik'])}
        showPasswords={props.showPasswords}
        toggleShowPasswords={props.toggleShowPasswords}
        name={props.name}
        disabled={props.disabled}
        value={getIn(props.formik.values, props.name)}
        onChange={onChange}
        onBlur={props.formik.handleBlur}
      />
      <ErrorMessage name={props.name} {...props.errorProps} />
    </>
  )
}

ConnectedPasswordInput.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  formik: PropTypes.shape({
    values: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    setFieldValue: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
  }).isRequired,
  errorProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  onAfterChange: PropTypes.func,
  showPasswords: PropTypes.bool,
  toggleShowPasswords: PropTypes.func,
}

ConnectedPasswordInput.defaultProps = {
  className: '',
  errorProps: {},
  disabled: false,
}

const PasswordInput = connect(ConnectedPasswordInput)
export { PasswordInput }
