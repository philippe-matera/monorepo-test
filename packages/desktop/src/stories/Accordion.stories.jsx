import React from 'react'

import { Accordion } from 'ui/accordion/Accordion'
import { Button } from 'ui/buttons/Button'
import { Block } from 'ui/wrappers/Block'

const Template = args => (
  <>
    <Accordion {...args} />
    <Block top="m" />
    <Accordion {...args} />
  </>
)

const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non eleifend metus, pretium bibendum arcu. Sed non varius eros, id consequat acu. Quisque tempor sapien eget massa mollis rhoncus. Quisque tempor lorem leo. Ut orci leo, tempor sit amet enim non, feugiat venenatis tortor. Donec quis facilisis magna, eget vulputate turpis. Nam eu elit egestas, lacinia eros a, porta tellus. Donec at commodo mauris, nec varius risus. Aenean nec augue id enim interdum pretium. Cras aliquet sapien libero, ut scelerisque leo lobortis non. Curabitur pulvinar risus in elit pretium, id imperdiet felis eleifend.'

const WithCard = Template.bind({})
WithCard.args = {
  title: 'Title of the accordion',
  content: (
    <>
      {lorem}
      <Block top="s">
        <Button>A button</Button>
      </Block>
    </>
  ),
}

const WithoutCard = Template.bind({})
WithoutCard.args = {
  ...WithCard.args,
  without_container: true,
  content: lorem,
}

const WithoutCardTag = Template.bind({})
WithoutCardTag.args = {
  ...WithoutCard.args,
  tag: true,
  tag_color: 'primary',
  tag_content: 'Tag',
}

export default {
  title: 'Accordion',
  component: Accordion,
}
export { WithCard, WithoutCard, WithoutCardTag }
