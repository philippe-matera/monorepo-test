import { connect, getIn } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'underscore'

import { Select as BaseSelect } from 'lib/select/Select'
import { ErrorMessage } from 'shared/form/formik/ErrorMessage'
import { FormikUtils } from 'utils/FormikUtils'

class ConnectedSelect extends React.PureComponent {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }

  onChange(obj, k, valueKey) {
    let value
    if (obj) {
      value = this.props.isMulti ? obj.map(o => o[valueKey]) : obj[valueKey]
    } else {
      value = this.props.isMulti ? [] : null
    }
    this.props.formik.setFieldValue(this.props.name, value)
    if (this.props.afterOnChange) this.props.afterOnChange(value)
  }

  handleBlur() {
    this.props.formik.setFieldTouched(this.props.name)
  }

  render() {
    return (
      <>
        <BaseSelect
          {..._.omit(this.props, ['formik', 'name'])}
          error={FormikUtils.isError(this.props.formik, this.props.name)}
          name={this.props.name}
          value={getIn(this.props.formik.values, this.props.name)}
          onChange={this.props.onChange || this.onChange}
          onBlur={this.handleBlur}
          isDisabled={this.props.disabled}
        />
        <ErrorMessage name={this.props.name} {...this.props.errorProps} />
      </>
    )
  }
}

ConnectedSelect.propTypes = {
  name: PropTypes.string,
  isMulti: PropTypes.bool,
  onChange: PropTypes.func,
  afterOnChange: PropTypes.func,
  errorProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  disabled: PropTypes.bool,

  formik: PropTypes.shape({
    values: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    setFieldValue: PropTypes.func.isRequired,
    setFieldTouched: PropTypes.func.isRequired,
  }).isRequired,
}

ConnectedSelect.defaultProps = {
  isMulti: false,
  disabled: false,
  errorProps: {},
}

const Select = connect(ConnectedSelect)
export { Select }
