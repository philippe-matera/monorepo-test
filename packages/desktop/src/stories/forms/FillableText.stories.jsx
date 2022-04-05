import { Formik } from 'formik'
import React from 'react'

import { FillableText } from 'shared/form/formik/FillableText'
import { NumericInput } from 'shared/form/formik/NumericInput'
import { Card } from 'ui/cards/Card'

// eslint-disable-next-line react/prop-types
const Template = ({ story_errors, ...args }) => (
  <Formik
    initialValues={{ amount: '' }}
    initialErrors={{ amount: 'Required!' }}
    initialTouched={{ amount: story_errors || false }}
  >
    <FillableText {...args} />
  </Formik>
)

const Form = () => (
  <Formik
    initialValues={{ value: '' }}
    initialErrors={{ value: 'Required!' }}
    initialTouched={{ value: false }}
  >
    <Card.Content>
      <NumericInput name="value" suffix="currency" placeholder="Montant" />
    </Card.Content>
  </Formik>
)

const Basic = Template.bind({})
Basic.args = {
  modal_props: { title: 'Montant', small: true },
  wrappedComponent: Form,
  wrapped_props: {},
  name: 'amount',
  placeholder: 'Montant',
}

const Error = Template.bind({})
Error.args = {
  ...Basic.args,
  story_errors: true,
}

export default {
  title: 'Form/FillableText',
  component: FillableText,
}

export { Basic, Error }
