import React from 'react'

import { ClickableContainer } from 'ui/clickable_containers/ClickableContainer'

const Template = args => <ClickableContainer {...args} />

const Basic = Template.bind({})
Basic.args = {
  padding: 'm',
  disabled: false,
}

const Disabled = Template.bind({})
Disabled.args = {
  ...Basic.args,
  disabled: true,
}

const WithChildren = Template.bind({})
WithChildren.args = {
  ...Basic.args,
  children: <span>Content here</span>,
}

export default {
  title: 'ClickableContainer',
  component: ClickableContainer,
}
export { Basic, Disabled, WithChildren }
