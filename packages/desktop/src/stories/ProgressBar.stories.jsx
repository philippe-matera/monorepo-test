import React from 'react'

import { ProgressBar } from 'ui/bar/ProgressBar'

const Template = args => <ProgressBar {...args} />

const Basic = Template.bind({})
Basic.args = {
  progress: 40,
}

export default {
  title: 'ProgressBar',
  component: ProgressBar,
}

export { Basic }
