import React from 'react'

import { Button } from 'ui/buttons/Button'
import { PageFooter } from 'ui/footers/PageFooter'
import { Block } from 'ui/wrappers/Block'
import { ButtonsWrapper } from 'ui/wrappers/ButtonsWrapper'

const Template = args => <PageFooter {...args} />

const Basic = Template.bind({})
Basic.args = {
  children: (
    <Block centered>
      <Button>Button</Button>
    </Block>
  ),
}

const WithoutMaxWidth = Template.bind({})
WithoutMaxWidth.args = {
  border: true,
  children: <Button>Button</Button>,
}

const WithMaxWidth = Template.bind({})
WithMaxWidth.args = {
  ...WithoutMaxWidth.args,
  max_width: true,
}

const WithButtonWrapper = Template.bind({})
WithButtonWrapper.args = {
  border: true,
  children: (
    <ButtonsWrapper>
      <Button>Button 1</Button>
      <Button>Button 2</Button>
    </ButtonsWrapper>
  ),
}

export default {
  title: 'PageFooter',
  component: PageFooter,
}
export { Basic, WithoutMaxWidth, WithMaxWidth, WithButtonWrapper }
