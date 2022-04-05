import React from 'react'

import { COLOR_LEVEL, Tag } from 'ui/tags/Tag'

const Template = args => (
  <>
    {Object.keys(COLOR_LEVEL).map(color => (
      <Tag {...args} key={color} color={color}>
        Couleur {color}
      </Tag>
    ))}
  </>
)
const Basic = Template.bind({})
Basic.args = {}

const Large = Template.bind({})
Basic.args = {
  large: true,
}

export default {
  title: 'Tag',
  component: Tag,
}

export { Basic, Large }
