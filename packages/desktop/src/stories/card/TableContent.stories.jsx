import React from 'react'

import { DataTable } from 'resource/data_table/DataTable'
import { Card } from 'ui/cards/Card'

const Template = args => (
  <Card.Container>
    <Card.Content>Card content above</Card.Content>
    <Card.TableContent {...args} />
    <Card.Content>Card content below</Card.Content>
  </Card.Container>
)

const Basic = Template.bind({})
Basic.args = {
  children: 'Lorem ipsum',
}

const WithTable = Template.bind({})
WithTable.args = {
  children: (
    <DataTable
      columns={[
        { key: 'name', name: 'Name' },
        { key: 'descr', name: 'Description' },
      ]}
      rows={[
        { name: 'John', descr: 'John is nice' },
        { name: 'Jane', descr: 'Jane is friendly' },
      ]}
    />
  ),
}

export default {
  title: 'Card/TableContent',
  component: Card.TableContent,
}
export { Basic, WithTable }
