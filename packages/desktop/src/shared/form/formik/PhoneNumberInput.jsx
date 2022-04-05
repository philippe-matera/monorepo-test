import { connect, getIn } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'underscore'

import { PhoneNumberInput as BasePhoneNumberInput } from 'lib/phone_number_input/PhoneNumberInput'
import { ErrorMessage } from 'shared/form/formik/ErrorMessage'
import { FormikUtils } from 'utils/FormikUtils'

class ConnectedPhoneNumberInput extends React.PureComponent {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }

  onChange(value) {
    this.props.formik.setFieldValue(this.props.name, value)
  }

  handleBlur() {
    this.props.formik.setFieldTouched(this.props.name)
  }

  render() {
    return (
      <>
        <BasePhoneNumberInput
          {..._.omit(this.props, ['formik', 'name'])}
          name={this.props.name}
          wrapperClassName={FormikUtils.errorClassName(this.props.formik, this.props.name)}
          value={getIn(this.props.formik.values, this.props.name)}
          onChange={this.props.onChange || this.onChange}
          onBlur={this.handleBlur}
          indicateInvalid={false}
        />
        <ErrorMessage name={this.props.name} {...this.props.errorProps} />
      </>
    )
  }
}

ConnectedPhoneNumberInput.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,

  formik: PropTypes.shape({
    values: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    setFieldValue: PropTypes.func.isRequired,
    setFieldTouched: PropTypes.func.isRequired,
  }).isRequired,
  errorProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types

  onChange: PropTypes.func,
}

ConnectedPhoneNumberInput.defaultProps = {
  className: 'form-control select-height',
  errorProps: {},
}

const PhoneNumberInput = connect(ConnectedPhoneNumberInput)
export { PhoneNumberInput }
