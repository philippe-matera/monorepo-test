import { Formik } from 'formik'
import React from 'react'

import { MonthPicker } from 'shared/form/formik/MonthPicker'

// eslint-disable-next-line react/prop-types
const Template = ({ story_errors, ...args }) => (
  <Formik
    initialValues={{ value: '' }}
    initialErrors={{ value: 'Required!' }}
    initialTouched={{ value: story_errors || false }}
  >
    <MonthPicker {...args} />
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
  title: 'Form/MonthPicker',
  component: MonthPicker,
}

export { Basic, Error }
