import { useToggle } from '@matera-tech/utils'
import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import _ from 'underscore'

import { Input } from 'ui/forms/Input'
import { TextInput } from 'ui/forms/TextInput'

const PasswordInput = props => {
  const [showPassword, toggleShowPassword] = useToggle(false)

  const type = useMemo(
    () => (props.showPasswords || showPassword ? 'text' : 'password'),
    [showPassword, props.showPasswords],
  )
  const icon = useMemo(
    () => (props.showPasswords || showPassword ? 'eye' : 'eye_slash'),
    [showPassword, props.showPasswords],
  )

  return (
    <Input icon={icon} onClickIcon={props.toggleShowPasswords || toggleShowPassword}>
      <TextInput type={type} {..._.omit(props, ['toogleShowPasswords', 'showPasswords'])} />
    </Input>
  )
}

PasswordInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  showPasswords: PropTypes.bool,
  toggleShowPasswords: PropTypes.func,
}

PasswordInput.defaultProps = {
  name: 'password',
}

export { PasswordInput }
