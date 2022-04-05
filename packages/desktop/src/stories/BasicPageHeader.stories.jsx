import React from 'react'

import { Button } from 'ui/buttons/Button'
import { BasicPageHeader } from 'ui/headers/BasicPageHeader'
import { Icon } from 'ui/icons/Icon'

const Template = args => <BasicPageHeader {...args} />

const AssemblyShow = Template.bind({})
AssemblyShow.args = {
  title: 'Assemblée générale extraordinaire en préparation',
  back_link: { title: 'Retour aux assemblées', href: 'https://www.matera.eu' },
  ctas: [
    <Button key="delete-cta" color="default">
      <Icon name="trash" /> Supprimer
    </Button>,
  ],
}

export default {
  title: 'BasicPageHeader',
  component: BasicPageHeader,
  argTypes: {
    ctas: { table: { disable: true } },
    tabs: { table: { disable: true } },
  },
}
export { AssemblyShow }
