import React from 'react'

import { CircularSpinner } from 'ui/loaders/CircularSpinner'

const Template = args => <CircularSpinner {...args} />

const Basic = Template.bind({})
Basic.args = {
  color: 'primary',
  xl: true,
}

export default {
  title: 'CircularSpinner',
  component: CircularSpinner,
}
export { Basic }
