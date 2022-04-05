import React from 'react'

import { Card } from 'ui/cards/Card'

const Template = args => (
  <Card.Container>
    <Card.Content>Card content above</Card.Content>
    <Card.ClickableContent {...args} />
    <Card.Content>Card content below</Card.Content>
  </Card.Container>
)

const Basic = Template.bind({})
Basic.args = {
  children: 'Click me!',
}

export default {
  title: 'Card/ClickableContent',
  component: Card.ClickableContent,
}
export { Basic }
