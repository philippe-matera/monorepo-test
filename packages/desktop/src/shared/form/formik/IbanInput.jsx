import { getIn, useFormikContext } from 'formik'
import PropTypes from 'prop-types'
import { useState } from 'react'

import { ErrorMessage } from 'shared/form/formik/ErrorMessage'
import { TextInput as BaseTextInput } from 'ui/forms/TextInput'
import { FormikUtils } from 'utils/FormikUtils'

// Input that inserts space every 4 characters for IBAN registering
// https://stackoverflow.com/questions/17260238/how-to-insert-space-every-4-characters-for-iban-registering
const IbanInput = ({ name, ...props }) => {
  const formik = useFormikContext()
  const [previous_value, setPreviousValue] = useState(formik.initialValues[name])

  const onChange = event => {
    const { target } = event
    const position = target.selectionEnd
    const value = target.value.toUpperCase()

    // Permitted IBAN characters are the digits 0 to 9 and the 26 upper-case Latin alphabetic characters A to Z
    // So the first regex removes unpermitted characters and the second one inserts space every 4 characters
    const new_value = value
      .replace(/[^\dA-Z]/g, '')
      .replace(/(.{4})/g, '$1 ') // eslint-disable-line prefer-named-capture-group
      .trim()
    target.value = new_value
    formik.setFieldValue(name, new_value)

    // To go back and edit previous characters we need to retrieve the caret's current position
    // We also need to manually increment the position to fix some issues
    // - when we are doing a paste of more than 1 character
    // - when the character after the caret is a space and we are adding a character
    const length_difference = new_value.length - value.length
    const is_a_paste = length_difference > 1
    const added_length = is_a_paste ? length_difference : 0
    const new_position =
      position +
      added_length +
      (new_value.charAt(position - 1) === ' ' && value.length >= previous_value.length ? 1 : 0)
    target.selectionEnd = new_position
    setPreviousValue(value)
  }

  return (
    <>
      <BaseTextInput
        {...props}
        name={name}
        value={getIn(formik.values, name)}
        onChange={onChange}
        onBlur={formik.handleBlur}
        error={FormikUtils.isError(formik, name)}
      />
      <ErrorMessage name={name} />
    </>
  )
}

IbanInput.propTypes = {
  name: PropTypes.string.isRequired,
}

export { IbanInput }
