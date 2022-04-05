import PropTypes from 'prop-types'
import React from 'react'

import { Input } from 'ui/forms/Input'
import { TextInput } from 'ui/forms/TextInput'

const EmailInput = props => (
  <Input>
    <TextInput type="email" autoCorrect="off" autoCapitalize="none" {...props} />
  </Input>
)

EmailInput.propTypes = {
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

EmailInput.defaultProps = {
  name: 'email',
}

export { EmailInput }
