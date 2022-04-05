import React from 'react'

import { Button } from 'ui/buttons/Button'

const Template = args => <Button {...args} />

const Basic = Template.bind({})
Basic.args = {
  color: 'primary',
  children: 'Submit',
}

const Tooltip = Template.bind({})
Tooltip.args = {
  ...Basic.args,
  tooltip: { title: 'bah vazy' },
}

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    id: { table: { disable: true } },
    onClick: { table: { disable: true } },
    href: { table: { disable: true } },
    to: { table: { disable: true } },
    type: { table: { disable: true } },
  },
}
export { Basic, Tooltip }
