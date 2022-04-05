import { Formik } from 'formik'
import React from 'react'

import { PhoneNumberInput } from 'shared/form/formik/PhoneNumberInput'

// eslint-disable-next-line react/prop-types
const Template = ({ story_errors, ...args }) => (
  <Formik
    initialValues={{ value: '' }}
    initialErrors={{ value: 'Required!' }}
    initialTouched={{ value: story_errors || false }}
  >
    <PhoneNumberInput {...args} />
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
  title: 'Form/PhoneNumberInput',
  component: PhoneNumberInput,
}

export { Basic, Error }
