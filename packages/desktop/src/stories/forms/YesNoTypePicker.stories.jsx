import { Formik } from 'formik'
import React from 'react'

import { YesNoTypePicker } from 'shared/form/formik/YesNoTypePicker'

// eslint-disable-next-line react/prop-types
const Template = ({ story_errors, ...args }) => (
  <Formik
    initialValues={{ value: '' }}
    initialErrors={{ value: 'Required!' }}
    initialTouched={{ value: story_errors || false }}
  >
    <YesNoTypePicker {...args} />
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
  title: 'Form/YesNoTypePicker',
  component: YesNoTypePicker,
}

export { Basic, Error }
