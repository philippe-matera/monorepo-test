import React from 'react'

import { Infoblock } from 'ui/infoblock/Infoblock'
import { Text } from 'ui/typography/Text'

const Template = args => <Infoblock {...args} />

const rows = [
  {
    label: 'Title 1',
    value: 'Random string text',
  },
  {
    label: 'Title 2',
    value: <Text muted>{'JSX as children'}</Text>,
  },
  {
    label: 'Some randomly long title that would be hard to read',
    value: 'Blah blah blah',
  },
]

const Basic = Template.bind({})
Basic.args = {
  label_width: 'm',
  rows,
}

export default {
  title: 'Infoblock',
  component: Infoblock,
}

export { Basic }
