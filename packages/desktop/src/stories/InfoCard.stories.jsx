import React from 'react'

import { InfoCard } from 'ui/info_cards/InfoCard'

const Template = args => (
  <InfoCard {...args}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non eleifend metus, pretium
    bibendum arcu. Sed non varius eros, id consequat arcu. Quisque tempor sapien eget massa mollis
    rhoncus. Quisque tempor lorem leo. Ut orci leo, tempor sit amet enim non, feugiat venenatis
    tortor.
  </InfoCard>
)

const Basic = Template.bind({})
Basic.args = {}

const WithTitle = Template.bind({})
WithTitle.args = {
  title: 'The title of the info card',
}

const ClosableWithTitle = Template.bind({})
ClosableWithTitle.args = {
  title: 'The title of the info card ',
  closable: true,
}

export default {
  title: 'InfoCard',
  component: InfoCard,
}
export { Basic, WithTitle, ClosableWithTitle }
