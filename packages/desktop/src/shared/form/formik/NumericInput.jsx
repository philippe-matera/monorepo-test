import { connect, getIn } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'underscore'

import { NumericInput as BaseNumericInput } from 'lib/numeric_input/NumericInput'
import { ErrorMessage } from 'shared/form/formik/ErrorMessage'
import { FormikUtils } from 'utils/FormikUtils'

class ConnectedNumericInput extends React.PureComponent {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }

  handleChange(value) {
    return this.props.formik.setFieldValue(
      this.props.name,
      this.props.signed && this.props.negative ? `-${value}` : value.toString(),
    )
  }

  handleBlur() {
    this.props.formik.setFieldTouched(this.props.name)
  }

  render() {
    let value = getIn(this.props.formik.values, this.props.name)
    if (this.props.signed) {
      if (isNaN(parseFloat(value))) {
        value = null
      } else if (this.props.negative) {
        value = parseFloat(value) > 0 ? null : value.toString().slice(1)
      } else {
        value = parseFloat(value) < 0 ? null : value.toString()
      }
    }
    let { min } = this.props
    if (this.props.signed && (this.props.min === undefined || this.props.min === null)) min = 0

    return (
      <>
        <BaseNumericInput
          {..._.omit(this.props, ['formik', 'name', 'errorProps', 'min', 'signed', 'negative'])}
          name={this.props.name}
          error={FormikUtils.isError(this.props.formik, this.props.name)}
          value={value}
          min={min}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />
        <ErrorMessage name={this.props.name} {...this.props.errorProps} />
      </>
    )
  }
}

ConnectedNumericInput.propTypes = {
  name: PropTypes.string,
  min: PropTypes.number,
  errorProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types

  signed: PropTypes.bool,
  negative: PropTypes.bool,

  formik: PropTypes.shape({
    values: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    setFieldValue: PropTypes.func.isRequired,
    setFieldTouched: PropTypes.func.isRequired,
  }).isRequired,

  max: PropTypes.number,
  decimalScale: PropTypes.number,
  color: PropTypes.oneOf(['danger', 'success']),
}

ConnectedNumericInput.defaultProps = {
  errorProps: {},
  signed: false,
  negative: false,
}

const NumericInput = connect(ConnectedNumericInput)
export { NumericInput, ConnectedNumericInput as StoryBookNumericInput }
