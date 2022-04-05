import React from 'react'

import { DropdownEllipsis } from 'ui/dropdowns/DropdownEllipsis'
import { Block } from 'ui/wrappers/Block'

const Template = args => (
  <Block centered>
    <DropdownEllipsis {...args} />
  </Block>
)

const Basic = Template.bind({})
Basic.args = {
  children: 'Button',
  items: [
    <DropdownEllipsis.Item key="1" href="/">
      Item
    </DropdownEllipsis.Item>,
    <DropdownEllipsis.Item key="2" href="/">
      Item
    </DropdownEllipsis.Item>,
    <DropdownEllipsis.Divider key="3" />,
    <DropdownEllipsis.Item key="4" href="/">
      Item
    </DropdownEllipsis.Item>,
    <DropdownEllipsis.Title key="5">Title</DropdownEllipsis.Title>,
    <DropdownEllipsis.Item key="6" href="/" disabled>
      Disabled item
    </DropdownEllipsis.Item>,
  ],
}

export default {
  title: 'DropdownEllipsis',
  component: DropdownEllipsis,
}

export { Basic }
