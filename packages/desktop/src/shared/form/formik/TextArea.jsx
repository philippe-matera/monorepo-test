import { connect, getIn } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'

import { ErrorMessage } from 'shared/form/formik/ErrorMessage'
import { TextArea as BaseTextArea } from 'ui/forms/TextArea'
import { TextAreaWithEmoji as BaseTextAreaWithEmoji } from 'ui/forms/TextAreaWithEmoji'
import { FormikUtils } from 'utils/FormikUtils'

const ConnectedTextArea = props => {
  const component = props.withEmoji ? (
    <BaseTextAreaWithEmoji
      id={props.id}
      rows={props.rows}
      name={props.name}
      className={props.className}
      error={FormikUtils.isError(props.formik, props.name)}
      style={props.style}
      formik={props.formik}
      placeholder={props.placeholder}
      textareaHeight={props.textareaHeight}
      auto_expand={props.auto_expand}
      onSelect={props.onSelect}
      disabled={props.disabled}
    />
  ) : (
    <BaseTextArea
      id={props.id}
      rows={props.rows}
      name={props.name}
      className={props.className}
      error={FormikUtils.isError(props.formik, props.name)}
      style={props.style}
      value={getIn(props.formik.values, props.name)}
      auto_expand={props.auto_expand}
      onChange={props.formik.handleChange}
      onBlur={props.formik.handleBlur}
      placeholder={props.placeholder}
      disabled={props.disabled}
    />
  )

  return (
    <>
      {component}
      <ErrorMessage name={props.name} {...props.errorProps} />
    </>
  )
}

ConnectedTextArea.propTypes = {
  id: PropTypes.string,
  rows: PropTypes.number,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.shape({
    resize: PropTypes.string,
    height: PropTypes.string,
  }),
  placeholder: PropTypes.string,

  formik: PropTypes.shape({
    values: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
  }).isRequired,

  errorProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  withEmoji: PropTypes.bool,
  textareaHeight: PropTypes.number,
  auto_expand: PropTypes.bool,
  onSelect: PropTypes.func,
  disabled: PropTypes.bool,
}

ConnectedTextArea.defaultProps = {
  className: '',
  style: {},
  errorProps: {},
  rows: 2,
  withEmoji: false,
  auto_expand: false,
}

const TextArea = connect(ConnectedTextArea)
export { TextArea, ConnectedTextArea as StorybookTextArea }
