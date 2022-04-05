import React from 'react'

import { Checklist } from 'ui/checklists/Checklist'

const Template = args => <Checklist {...args} />

const Basic = Template.bind({})
Basic.args = {
  steps: [
    { content: 'Not done link', done: false, href: '/' },
    { content: 'Disabled not done link', done: false, disabled: true, href: '/' },
    { content: 'Done link', done: true, href: '/' },
    { content: 'Disabled Done link', done: true, disabled: true, href: '/' },
    { content: 'Not done text', done: false },
    { content: 'Disabled not done text', done: false, disabled: true },
    { content: 'Done text', done: true },
    { content: 'Disabled done text', done: true, disabled: true },
    { content: 'With tooltip', tooltip: 'Tooltippp' },
  ],
}

export default {
  title: 'Checklist',
  component: Checklist,
}

export { Basic }
