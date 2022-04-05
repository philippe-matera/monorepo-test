import React from 'react'

import { DataTable, StorybookDataTable } from 'resource/data_table/DataTable'
import { Button } from 'ui/buttons/Button'
import { Card } from 'ui/cards/Card'
import { DeleteButton } from 'ui/icon_buttons/DeleteButton'
import { Link } from 'ui/links/Link'
import { Text } from 'ui/typography/Text'
import { Block } from 'ui/wrappers/Block'

const Template = args => <DataTable {...args} />

const Basic = Template.bind({})
Basic.args = {
  onPreviousPage: null,
  onNextPage: null,
  columns: [
    { key: 'name', name: "Name (I'm sortable)", sortable: true },
    { key: 'descr', name: 'Description' },
  ],
  rows: [
    { key: '1', name: 'John', descr: 'John is nice' },
    { key: '2', name: 'Jane', descr: 'Jane is friendly' },
  ],
}

const EmptyState = Template.bind({})
EmptyState.args = {
  ...Basic.args,
  rows: [],
  noRowsText: 'This table is empty',
  noRowsSubtitle: 'Optinal empty state subtitle',
}

const EmptyStateNew = Template.bind({})
EmptyStateNew.args = {
  ...Basic.args,
  rows: [],
  empty_state_props: {
    title: 'This table is empty',
    title_size: '4',
    subtitle: 'Optinal empty state subtitle',
    image_src: 'https://www.matera.eu/static/df4d16361a7fd60b28bc622e5b25f693/3aed7/banner.png',
    image_alt: 'image alternative',
    children: <Link href="https://www.matera.eu">Could be anything else</Link>,
  },
}

const WithoutHeaders = Template.bind({})
WithoutHeaders.args = {
  ...Basic.args,
  headers: false,
}

const AdditionalHeader = Template.bind({})
AdditionalHeader.args = {
  ...Basic.args,
  additionalHeader: (
    <thead>
      <tr>
        <th>This is one</th>
        <th>This is another</th>
      </tr>
    </thead>
  ),
}

const FooterRows = Template.bind({})
FooterRows.args = {
  ...Basic.args,
  footer_rows: [
    { name: 'First total', descr: 10 },
    { name: <Text bold>Second total</Text>, descr: 10 },
  ],
}

const ClickableCells = Template.bind({})
ClickableCells.args = {
  ...Basic.args,
  columns: [
    { key: 'name', name: "Name (I'm sortable)", sortable: true },
    {
      key: 'descr',
      name: 'Description (some of them clickable)',
      onCellClick: () => {
        alert('Clicked') // eslint-disable-line no-alert
      },
      not_clickable: (__, { name }) => name !== 'John',
    },
  ],
  rows: [
    { key: '1', name: 'John', descr: "I'm clickable" },
    { key: '2', name: 'Jane', descr: "I'm not clickable" },
    { key: '3', name: 'John', descr: "I'm also clickable" },
    { key: '4', name: 'Jane', descr: "I'm not clickable" },
  ],
}

const ExtendableRows = Template.bind({})
ExtendableRows.args = {
  ...Basic.args,
  rows: [
    { key: '1', name: 'John', descr: "I'm clickable" },
    { key: '2', name: 'Jane', descr: "I'm not clickable" },
    { key: '3', name: 'John', descr: "I'm also clickable" },
    { key: '4', name: 'Jane', descr: "I'm not clickable" },
  ],
  toggle_details_on_click: row => row.name === 'John',
  detailsFormatter: () => "My name is John and I'm awesome",
}

const Export = Template.bind({})
Export.args = {
  ...Basic.args,
  exportableColumns: ['name', 'descr'],
  children: (table, { export_cta }) => (
    <Card.Container>
      <Card.Content>
        <Block righted>{export_cta}</Block>
      </Card.Content>
      <Card.TableContent>{table}</Card.TableContent>
    </Card.Container>
  ),
}

const EmptyAndLoading = Template.bind({})
EmptyAndLoading.args = {
  ...Basic.args,
  rows: [],
  loading: true,
}

const NonEmptyAndLoading = Template.bind({})
NonEmptyAndLoading.args = {
  ...Basic.args,
  loading: true,
}

const Paginated = Template.bind({})
Paginated.args = {
  ...Basic.args,
  onNextPage: () => {
    alert('next') // eslint-disable-line no-alert
  },
  onPreviousPage: () => {
    alert('previous') // eslint-disable-line no-alert
  },
}

const Actions = Template.bind({})
Actions.args = {
  ...Basic.args,
  columns: [
    { key: 'name', name: "Name (I'm sortable)", sortable: true },
    {
      key: 'button',
      name: 'Buttons in table are smaller',
      formatter: () => <Button color="default">Button</Button>,
    },
    {
      key: 'hover',
      name: 'Action shown only if hover',
      hover_only: true,
      formatter: () => <DeleteButton />,
    },
  ],
  rows: [
    { key: '1', name: 'John' },
    { key: '2', name: 'Jane' },
  ],
}

const Formatters = Template.bind({})
Formatters.args = {
  ...Basic.args,
  columns: [
    { key: 'name', name: "Name (I'm sortable)", sortable: true },
    { key: 'date', name: 'Date', sortable: true, type: 'date' },
    { key: 'currency', name: 'Currency', type: 'currency', text_right: true },
    { key: 'phone_number', name: 'Phone', type: 'phone_number' },
    { key: 'percentage', name: 'Percentage', type: 'percentage', text_right: true },
  ],
  rows: [
    {
      key: '1',
      name: 'John',
      date: '2020-12-31',
      currency: 10,
      phone_number: '06 45 54 42 42',
      percentage: 0.5,
    },
    {
      key: '2',
      name: 'Jane',
      date: '2021-01-01',
      currency: 15,
      phone_number: '+33606060606',
      percentage: 0.1,
    },
    { key: '3', name: 'No values' },
  ],
}

export default {
  title: 'DataTable',
  component: StorybookDataTable,
}
export {
  Basic,
  EmptyState,
  EmptyStateNew,
  WithoutHeaders,
  AdditionalHeader,
  FooterRows,
  ClickableCells,
  ExtendableRows,
  Export,
  EmptyAndLoading,
  NonEmptyAndLoading,
  Paginated,
  Actions,
  Formatters,
}
