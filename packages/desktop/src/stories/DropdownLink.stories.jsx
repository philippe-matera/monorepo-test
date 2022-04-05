import React from 'react'

import { DropdownLink } from 'ui/dropdowns/DropdownLink'
import { Title } from 'ui/typography/Title'
import { Block } from 'ui/wrappers/Block'

const Template = args => (
  <Block centered>
    <Title.H4>
      <DropdownLink {...args} />
    </Title.H4>
  </Block>
)

const Basic = Template.bind({})
Basic.args = {
  children: 'Link',
  items: [
    <DropdownLink.Item key="1" href="/">
      Item
    </DropdownLink.Item>,
    <DropdownLink.Item key="2" href="/">
      Item
    </DropdownLink.Item>,
    <DropdownLink.Divider key="3" />,
    <DropdownLink.Item key="4" href="/">
      Item
    </DropdownLink.Item>,
    <DropdownLink.Title key="5">Title</DropdownLink.Title>,
    <DropdownLink.Item key="6" href="/" disabled>
      Disabled item
    </DropdownLink.Item>,
  ],
}

export default {
  title: 'DropdownLink',
  component: DropdownLink,
}

export { Basic }
