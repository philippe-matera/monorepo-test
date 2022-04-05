import { Formik } from 'formik'
import React from 'react'

import { Checkbox } from 'shared/form/formik/Checkbox'

// eslint-disable-next-line react/prop-types
const Template = ({ story_errors, ...args }) => (
  <Formik
    initialValues={{ value: false }}
    initialErrors={{ value: 'Required' }}
    initialTouched={{ value: story_errors || false }}
  >
    <Checkbox {...args} />
  </Formik>
)

const Basic = Template.bind({})
Basic.args = {
  name: 'value',
  id: 'value',
  label: 'Checkbox',
}

const Error = Template.bind({})
Error.args = {
  ...Basic.args,
  story_errors: true,
}

export default {
  title: 'Form/Checkbox',
  component: Checkbox,
}

export { Basic, Error }
