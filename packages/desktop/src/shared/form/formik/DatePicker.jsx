import { connect, getIn } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'underscore'

import { DatePicker as BaseDatePicker } from 'lib/date_picker/DatePicker'
import { ErrorMessage } from 'shared/form/formik/ErrorMessage'
import { FormikUtils } from 'utils/FormikUtils'

class ConnectedDatePicker extends React.PureComponent {
  constructor(props) {
    super(props)
    this.handleChange = this.onChange.bind(this)
    this.handleBlur = this.onBlur.bind(this)
  }

  onBlur() {
    // Timeout is required here : https://github.com/matera-tech/npm-packages/pull/370
    // Initial thread : https://github.com/formium/formik/issues/2083#issuecomment-571259235
    setTimeout(() => {
      this.props.formik.setFieldTouched(this.props.name)
    }, 100)
  }

  onChange(date) {
    const { formik, name, onAfterChange, onChange } = this.props
    if (onChange) onChange(name, date)
    else formik.setFieldValue(name, date)
    if (onAfterChange) onAfterChange(name, date)
  }

  render() {
    return (
      <>
        <BaseDatePicker
          {..._.omit(this.props, ['formik', 'name', 'errorProps'])}
          name={this.props.name}
          error={FormikUtils.isError(this.props.formik, this.props.name)}
          className={this.props.className}
          selected={getIn(this.props.formik.values, this.props.name)}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />
        <ErrorMessage name={this.props.name} {...this.props.errorProps} />
      </>
    )
  }
}

ConnectedDatePicker.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  errorProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types

  formik: PropTypes.shape({
    values: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    setFieldValue: PropTypes.func.isRequired,
    setFieldTouched: PropTypes.func.isRequired,
  }).isRequired,
  onAfterChange: PropTypes.func,
  onChange: PropTypes.func,
}

ConnectedDatePicker.defaultProps = {
  className: '',
  errorProps: {},
}

const DatePicker = connect(ConnectedDatePicker)
export { DatePicker }
