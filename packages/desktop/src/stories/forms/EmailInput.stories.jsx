import { Formik } from 'formik'
import React from 'react'

import { EmailInput } from 'shared/form/formik/EmailInput'

// eslint-disable-next-line react/prop-types
const Template = ({ story_errors, ...args }) => (
  <Formik
    initialValues={{ value: '' }}
    initialErrors={{ value: 'Required!' }}
    initialTouched={{ value: story_errors || false }}
  >
    <EmailInput {...args} />
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
  title: 'Form/EmailInput',
  component: EmailInput,
}

export { Basic, Error }
