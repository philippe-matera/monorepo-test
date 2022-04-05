import React from 'react'

import { Card } from 'ui/cards/Card'

const Template = args => (
  <Card.Container>
    <Card.Content {...args} />
    <Card.Content {...args} />
    <Card.Content {...args} />
  </Card.Container>
)

const Several = Template.bind({})
Several.args = {
  children: 'Lorem ipsum',
}

export default {
  title: 'Card/Content',
  component: Card.Content,
}
export { Several }
