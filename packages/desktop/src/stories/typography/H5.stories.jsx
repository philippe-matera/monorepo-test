import React from 'react'

import { Title } from 'ui/typography/Title'

const Template = args => <Title.H5 {...args} />

const Basic = Template.bind({})
Basic.args = {
  children: 'Some nice title H5',
}

export default {
  title: 'Typography/H5',
  component: Title.H5,
}
export { Basic }
