import React from 'react'

import { Title } from 'ui/typography/Title'

const Template = args => <Title.H6 {...args} />

const Basic = Template.bind({})
Basic.args = {
  children: 'Some nice title H6',
}

export default {
  title: 'Typography/H6',
  component: Title.H6,
}
export { Basic }
