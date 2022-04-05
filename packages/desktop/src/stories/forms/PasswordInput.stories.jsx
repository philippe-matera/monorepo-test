import { Formik } from 'formik'
import React from 'react'

import { PasswordInput } from 'shared/form/formik/PasswordInput'

// eslint-disable-next-line react/prop-types
const Template = ({ story_errors, ...args }) => (
  <Formik
    initialValues={{ value: '' }}
    initialErrors={{ value: 'Required!' }}
    initialTouched={{ value: story_errors || false }}
  >
    <PasswordInput {...args} />
  </Formik>
)

const Basic = Template.bind({})
Basic.args = {
  name: 'value',
}

const Error = Template.bind({})
Error.args = {
  ...Basic.args,
  story_errors: true,
}

export default {
  title: 'Form/PasswordInput',
  component: PasswordInput,
}

export { Basic, Error }
