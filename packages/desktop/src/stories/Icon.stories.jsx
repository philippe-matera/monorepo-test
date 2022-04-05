import React from 'react'

import { ICONS, Icon } from 'ui/icons/Icon'

const Template = args => (
  <div>
    {Object.keys(ICONS).map(icon => (
      <div key={icon}>
        <Icon {...args} name={icon} />
        <span> {icon}</span>
      </div>
    ))}
  </div>
)

const All = Template.bind({})
All.args = {}

export default {
  title: 'Icon',
  component: Icon,
}

export { All }
