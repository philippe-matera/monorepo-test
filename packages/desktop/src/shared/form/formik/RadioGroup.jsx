import { connect, getIn } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'

import { ErrorMessage } from 'shared/form/formik/ErrorMessage'
import { Flex } from 'ui/flex/Flex'
import { Radio } from 'ui/forms/Radio'

class ConnectedRadioGroup extends React.PureComponent {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }

  handleChange(e) {
    const value = e.target.name
    const casted_value = value === 'true' || value === 'false' ? value === 'true' : value
    this.props.formik.setFieldValue(this.props.name, casted_value)
    if (this.props.onAfterChange) this.props.onAfterChange(this.props.name, casted_value)
  }

  handleBlur() {
    this.props.formik.setFieldTouched(this.props.name)
  }

  render() {
    let content = this.props.values.map(value => (
      <Radio
        key={value.value}
        name={value.value.toString()}
        value={value.value}
        id={`${this.props.name}${value.value.toString()}`}
        checked={getIn(this.props.formik.values, this.props.name) === value.value}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        label={value.label}
        disabled={this.props.disabled}
        inline={this.props.inline}
        color={this.props.color}
      />
    ))
    if (this.props.inline) content = <Flex>{content}</Flex>

    return (
      <>
        {content}
        <ErrorMessage name={this.props.name} {...this.props.errorProps} />
      </>
    )
  }
}

ConnectedRadioGroup.propTypes = {
  name: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(PropTypes.object),
  errorProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  disabled: PropTypes.bool,
  inline: PropTypes.bool,
  color: PropTypes.string,
  onAfterChange: PropTypes.func,

  formik: PropTypes.shape({
    values: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    setFieldValue: PropTypes.func.isRequired,
    setFieldTouched: PropTypes.func.isRequired,
  }).isRequired,
}

ConnectedRadioGroup.defaultProps = {
  errorProps: {},
}

const RadioGroup = connect(ConnectedRadioGroup)
export { RadioGroup }
