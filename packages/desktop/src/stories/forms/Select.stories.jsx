import { Formik } from 'formik'
import React from 'react'

import { Select } from 'shared/form/formik/Select'

// eslint-disable-next-line react/prop-types
const Template = ({ story_errors, ...args }) => (
  <Formik
    initialValues={{ value: '' }}
    initialErrors={{ value: 'Required!' }}
    initialTouched={{ value: story_errors || false }}
  >
    <Select {...args} />
  </Formik>
)

const Basic = Template.bind({})
Basic.args = {
  name: 'value',
  options: [
    { value: 'a', label: 'A' },
    { value: 'b', label: 'B' },
    { value: 'c', label: 'C' },
  ],
}

const Groups = Template.bind({})
Groups.args = {
  name: 'value',
  options: [
    {
      label: 'First group',
      options: [
        { value: 'a', label: 'A' },
        { value: 'b', label: 'B' },
        { value: 'c', label: 'C' },
      ],
    },
    {
      label: 'Second group',
      options: [
        { value: 'd', label: 'D' },
        { value: 'e', label: 'E' },
      ],
    },
  ],
}

const Error = Template.bind({})
Error.args = {
  ...Basic.args,
  story_errors: true,
}

export default {
  title: 'Form/Select',
  component: Select,
}

export { Basic, Groups, Error }
