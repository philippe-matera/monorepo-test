import React from 'react'

import { Tabs } from 'ui/tabs/Tabs'

const Template = args => <Tabs {...args} />

const tabs = [
  <Tabs.TabContent key="1" title="Un onglet">
    Contenu 1
  </Tabs.TabContent>,
  <Tabs.TabContent key="2" title="Un autre onglet" badge="4">
    Contenu 2
  </Tabs.TabContent>,
  <Tabs.TabContent key="3" title="Un troisième onglet" badge="4" badge_color="danger">
    Contenu 3
  </Tabs.TabContent>,
  <Tabs.TabContent key="4" title="Un onglet pour les materani" title_color="admin">
    Contenu 4
  </Tabs.TabContent>,
  false,
  null,
  undefined,
]

const Basic = Template.bind({})
Basic.args = {
  tabs,
  initial_active_key: '1',
}

const StickyLeft = Template.bind({})
StickyLeft.args = {
  ...Basic.args,
  sticky_left: true,
}

export default {
  title: 'Tabs',
  component: Tabs,
}

export { Basic, StickyLeft }
