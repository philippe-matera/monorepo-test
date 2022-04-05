import { Formik } from 'formik'

import { IbanInput } from 'shared/form/formik/IbanInput'

// eslint-disable-next-line react/prop-types
const Template = ({ story_errors, ...args }) => (
  <Formik
    initialValues={{ iban_code: '' }}
    initialErrors={{ iban_code: 'Required!' }}
    initialTouched={{ iban_code: story_errors || false }}
  >
    <IbanInput {...args} />
  </Formik>
)

const Basic = Template.bind({})
Basic.args = {
  name: 'iban_code',
}

const Error = Template.bind({})
Error.args = {
  ...Basic.args,
  story_errors: true,
}

export default {
  title: 'Form/IbanInput',
  component: IbanInput,
}

export { Basic, Error }
