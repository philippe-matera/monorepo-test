import React from 'react'

import { Title } from 'ui/typography/Title'

const Template = args => <Title.H2 {...args} />

const Basic = Template.bind({})
Basic.args = {
  children: 'Some nice title H2',
}

export default {
  title: 'Typography/H2',
  component: Title.H2,
}
export { Basic }
