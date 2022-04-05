import { connect, getIn } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'

import { ErrorMessage } from 'shared/form/formik/ErrorMessage'
import { Checkbox as BaseCheckbox } from 'ui/forms/Checkbox'

class ConnectedCheckbox extends React.PureComponent {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }

  handleChange(e) {
    const { formik, name, onAfterChange, onChange } = this.props
    if (onChange) onChange(name, e.target.checked)
    else formik.setFieldValue(name, e.target.checked)
    if (onAfterChange) onAfterChange(name, e.target.checked)
  }

  handleBlur() {
    this.props.formik.setFieldTouched(this.props.name)
  }

  render() {
    const id = this.props.id || this.props.name

    return (
      <>
        <BaseCheckbox
          id={id}
          name={this.props.name}
          checked={getIn(this.props.formik.values, this.props.name)}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          disabled={this.props.disabled}
          label={this.props.label}
          label_props={this.props.label_props}
          color={this.props.color}
        />
        <ErrorMessage name={this.props.name} {...this.props.errorProps} />
      </>
    )
  }
}

ConnectedCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.node,
  label_props: PropTypes.shape({
    infotooltip: PropTypes.shape({
      title: PropTypes.string,
    }),
  }),
  disabled: PropTypes.bool,
  color: PropTypes.string,

  formik: PropTypes.shape({
    values: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    setFieldValue: PropTypes.func.isRequired,
    setFieldTouched: PropTypes.func.isRequired,
  }).isRequired,

  errorProps: PropTypes.shape({
    icon: PropTypes.bool,
    inline: PropTypes.bool,
    name: PropTypes.string,
    sm: PropTypes.bool,
    remove_min_height: PropTypes.bool,
    hidden: PropTypes.bool,
  }),
  onAfterChange: PropTypes.func,
  onChange: PropTypes.func,
}

ConnectedCheckbox.defaultProps = {
  disabled: false,
  errorProps: {},
}

const Checkbox = connect(ConnectedCheckbox)
export { Checkbox }
