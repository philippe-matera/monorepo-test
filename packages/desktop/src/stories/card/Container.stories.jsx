import React from 'react'

import { Card } from 'ui/cards/Card'

const Template = args => <Card.Container {...args} />

const Loading = Template.bind({})
Loading.args = {
  loading: true,
}

export default {
  title: 'Card/Container',
  component: Card.Container,
}
export { Loading }
