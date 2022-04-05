import React from 'react'

import { StorybookText, Text } from 'ui/typography/Text'

const Template = args => <Text {...args} />

const Basic = Template.bind({})
Basic.args = {
  children:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non eleifend metus, pretium bibendum arcu. Sed non varius eros, id consequat arcu. Quisque tempor sapien eget massa mollis rhoncus. Quisque tempor lorem leo. Ut orci leo, tempor sit amet enim non, feugiat venenatis tortor. Donec quis facilisis magna, eget vulputate turpis. Nam eu elit egestas, lacinia eros a, porta tellus. Donec at commodo mauris, nec varius risus. Aenean nec augue id enim interdum pretium. Cras aliquet sapien libero, ut scelerisque leo lobortis non. Curabitur pulvinar risus in elit pretium, id imperdiet felis eleifend.',
}

export default {
  title: 'Typography/Text',
  component: StorybookText,
}
export { Basic }
