import React from 'react'

import { Steps, VerticalSteps } from 'ui/steps/Steps'

const Template = args => (
  <>
    <Steps {...args} />
    <VerticalSteps {...args} />
  </>
)

const steps = ['1', '2', '3'].map(step => ({
  label: `Random label ${step}`,
}))

const Basic = Template.bind({})
Basic.args = {
  steps,
}

export default {
  title: 'Steps',
  component: Steps,
}

export { Basic }
