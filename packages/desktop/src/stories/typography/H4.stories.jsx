import React from 'react'

import { Title } from 'ui/typography/Title'

const Template = args => <Title.H4 {...args} />

const Basic = Template.bind({})
Basic.args = {
  children: 'Some nice title H4',
}

export default {
  title: 'Typography/H4',
  component: Title.H4,
}
export { Basic }
