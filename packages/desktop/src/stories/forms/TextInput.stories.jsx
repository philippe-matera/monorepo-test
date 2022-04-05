import { Formik } from 'formik'
import React from 'react'

import { TextInput } from 'shared/form/formik/TextInput'

// eslint-disable-next-line react/prop-types
const Template = ({ story_errors, ...args }) => (
  <Formik
    initialValues={{ value: '' }}
    initialErrors={{ value: 'Required!' }}
    initialTouched={{ value: story_errors || false }}
  >
    <TextInput {...args} />
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

const Suffix = Template.bind({})
Suffix.args = {
  ...Basic.args,
  suffix: '@mail.matera.eu',
}

const Prefix = Template.bind({})
Prefix.args = {
  ...Basic.args,
  prefix: 'HRB',
}

const PrefixSuffix = Template.bind({})
PrefixSuffix.args = {
  ...Prefix.args,
  suffix: '@mail.matera.eu',
}

export default {
  title: 'Form/TextInput',
  component: TextInput,
}

export { Basic, Error, Suffix, Prefix, PrefixSuffix }
