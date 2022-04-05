import { Formik } from 'formik'
import React from 'react'

import { RadioGroup } from 'shared/form/formik/RadioGroup'

// eslint-disable-next-line react/prop-types
const Template = ({ story_errors, ...args }) => (
  <Formik
    initialValues={{ value: '' }}
    initialErrors={{ value: 'Required!' }}
    initialTouched={{ value: story_errors || false }}
  >
    <RadioGroup {...args} />
  </Formik>
)

const Basic = Template.bind({})
Basic.args = {
  name: 'value',
  values: [
    { value: 'a', label: 'A' },
    { value: 'b', label: 'B' },
    { value: 'c', label: 'C' },
  ],
}

const Error = Template.bind({})
Error.args = {
  ...Basic.args,
  story_errors: true,
}

export default {
  title: 'Form/RadioGroup',
  component: RadioGroup,
}

export { Basic, Error }
