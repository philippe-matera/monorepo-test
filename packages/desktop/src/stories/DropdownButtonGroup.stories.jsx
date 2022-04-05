import React from 'react'

import { Button } from 'ui/buttons/Button'
import { DropdownButtonGroup } from 'ui/dropdowns/DropdownButtonGroup'
import { Block } from 'ui/wrappers/Block'

const Template = args => (
  <Block centered>
    <DropdownButtonGroup {...args} />
  </Block>
)

const Basic = Template.bind({})
Basic.args = {
  children: <Button>Button</Button>,
  items: [
    <DropdownButtonGroup.Item key="1" href="/">
      Item
    </DropdownButtonGroup.Item>,
    <DropdownButtonGroup.Item key="2" href="/">
      Item
    </DropdownButtonGroup.Item>,
    <DropdownButtonGroup.Divider key="3" />,
    <DropdownButtonGroup.Item key="4" href="/">
      Item
    </DropdownButtonGroup.Item>,
    <DropdownButtonGroup.Title key="5">Title</DropdownButtonGroup.Title>,
    <DropdownButtonGroup.Item key="6" href="/" disabled>
      Disabled item
    </DropdownButtonGroup.Item>,
  ],
}

export default {
  title: 'DropdownButtonGroup',
  component: DropdownButtonGroup,
}

export { Basic }
