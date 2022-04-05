import { connect, getIn } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'

import { ErrorMessage } from 'shared/form/formik/ErrorMessage'
import { MediaTypePicker } from 'ui/type_pickers/MediaTypePicker'
import { TypePicker as BaseTypePicker } from 'ui/type_pickers/TypePicker'

class ConnectedTypePicker extends React.PureComponent {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(value) {
    const { formik, onChange, name } = this.props

    if (onChange) {
      onChange(name, value)
    } else {
      formik.setFieldValue(name, value)
    }
  }

  render() {
    const Component = this.props.media ? MediaTypePicker : BaseTypePicker

    // eslint-disable-next-line no-warning-comments
    // TODO: Two lines below are duplicated in UI component
    const filtered_available_types = this.props.available_types.filter(type => type)
    if (filtered_available_types.length <= 1) return null

    return (
      <>
        <Component
          name={this.props.name}
          available_types={filtered_available_types}
          selected_type={getIn(this.props.formik.values, this.props.name)}
          onChange={this.handleChange}
          disabled={this.props.disabled}
          detailed={this.props.detailed}
          color={this.props.color}
          full_width={this.props.full_width}
        />
        <ErrorMessage name={this.props.name} {...this.props.errorProps} />
      </>
    )
  }
}

ConnectedTypePicker.propTypes = {
  color: PropTypes.oneOf(['admin', 'primary']),
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  detailed: PropTypes.bool,
  available_types: PropTypes.arrayOf(PropTypes.object), // eslint-disable-line react/forbid-prop-types
  errorProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  full_width: PropTypes.bool,
  media: PropTypes.bool,

  formik: PropTypes.shape({
    values: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    setFieldValue: PropTypes.func.isRequired,
    setFieldTouched: PropTypes.func.isRequired,
  }).isRequired,
}

ConnectedTypePicker.defaultProps = {
  disabled: false,
  detailed: false,
  errorProps: {},
  full_width: false,
  media: false,
}

const TypePicker = connect(ConnectedTypePicker)
export { TypePicker }
