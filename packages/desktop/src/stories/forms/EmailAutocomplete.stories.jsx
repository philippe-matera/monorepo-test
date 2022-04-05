import React from 'react'

import { EmailAutocomplete as BaseEmailAutocomplete } from 'shared/form/formik/EmailAutocomplete'

const aliases = [
  {
    label: <div>owners</div>,
    tag: 'primary',
    value: '@owners',
  },
  {
    label: <div>tenants</div>,
    tag: 'primary',
    value: '@tenants',
  },
]

const Template = () => (
  <BaseEmailAutocomplete
    useQuery={() => ({})}
    aliases={aliases}
    name="recipients"
    placeholder={'Emails of people'}
  />
)

const Basic = Template.bind({})
Basic.args = {
  name: 'recipients',
}

export default {
  title: 'Form/EmailAutocomplete',
  component: BaseEmailAutocomplete,
}

export { Basic }
