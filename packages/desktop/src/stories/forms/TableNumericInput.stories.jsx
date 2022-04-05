import { Formik } from 'formik'
import React from 'react'

import { TableNumericInput } from 'shared/form/formik/TableNumericInput'

// eslint-disable-next-line react/prop-types
const Template = ({ story_errors, value, ...args }) => (
  <Formik
    enableReinitialize
    initialValues={{ value }}
    initialErrors={{ value: 'Required!' }}
    initialTouched={{ value: story_errors || false }}
  >
    <TableNumericInput {...args} />
  </Formik>
)

const Basic = Template.bind({})
Basic.args = {
  name: 'value',
  suffix: 'currency',
  value: 10.1,
}

const Error = Template.bind({})
Error.args = {
  ...Basic.args,
  story_errors: true,
}

export default {
  title: 'Form/TableNumericInput',
  component: TableNumericInput,
}

export { Basic, Error }
