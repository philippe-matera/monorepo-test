import React from 'react'

import { Button } from 'ui/buttons/Button'
import { PageFooter } from 'ui/footers/PageFooter'
import { FullPageModal } from 'ui/modals/FullPageModal'

const Template = args => <FullPageModal {...args} />

const Basic = Template.bind({})
Basic.args = {
  visible: true,
  title: 'Titre',
  children: 'Contenu',
}

const WithOptions = Template.bind({})
WithOptions.args = {
  ...Basic.args,
  subtitle: 'Texte',
  onHide: () => undefined,
}

const WithFooter = Template.bind({})
WithFooter.args = {
  ...WithOptions.args,
  children: (
    <>
      Contenu
      <PageFooter max_width>
        <Button>Button</Button>
      </PageFooter>
    </>
  ),
}

export default {
  title: 'FullPageModal',
  component: FullPageModal,
}

export { Basic, WithOptions, WithFooter }
