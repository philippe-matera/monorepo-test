import React from 'react'

import { Title } from 'ui/typography/Title'

const Template = args => <Title.H3 {...args} />

const Basic = Template.bind({})
Basic.args = {
  children: 'Some nice title H3',
}

export default {
  title: 'Typography/H3',
  component: Title.H3,
}
export { Basic }
