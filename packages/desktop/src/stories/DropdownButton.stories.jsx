import React from 'react'

import { DropdownButton } from 'ui/dropdowns/DropdownButton'
import { Block } from 'ui/wrappers/Block'

const Template = args => (
  <Block centered>
    <DropdownButton {...args} />
  </Block>
)

const Basic = Template.bind({})
Basic.args = {
  children: 'Button',
  items: [
    null,
    undefined,
    false,
    <DropdownButton.Item key="1" href="/">
      Item
    </DropdownButton.Item>,
    <DropdownButton.Item key="2" href="/">
      Item 2
    </DropdownButton.Item>,
    <DropdownButton.Divider key="3" />,
    <DropdownButton.Item key="4" href="/">
      Item 3
    </DropdownButton.Item>,
    <DropdownButton.Title key="5">Title</DropdownButton.Title>,
    <DropdownButton.Item key="6" href="/" disabled>
      Disabled item
    </DropdownButton.Item>,
  ],
}

const AnotherBasic = Template.bind({})
AnotherBasic.args = {
  children: 'Button',
  items: (
    <>
      {null}
      {undefined}
      {false}
      <DropdownButton.Item key="1" href="/">
        Item
      </DropdownButton.Item>
      <DropdownButton.Item key="2" href="/">
        Item 2
      </DropdownButton.Item>
    </>
  ),
}

const OneItem = Template.bind({})
OneItem.args = {
  children: 'Button',
  items: [
    null,
    undefined,
    false,
    <DropdownButton.Item key="1" href="/" color="admin">
      This dropdown has only one item and thus it is a button
    </DropdownButton.Item>,
    <DropdownButton.Divider key="3" />,
    <DropdownButton.Title key="5">Title</DropdownButton.Title>,
  ],
  prioritize_item_title: true,
}

export default {
  title: 'DropdownButton',
  component: DropdownButton,
}

export { Basic, AnotherBasic, OneItem }
