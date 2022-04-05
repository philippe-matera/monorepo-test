import React from 'react'

import { EmptyState } from 'resource/data_table/DataTable'
import { Link } from 'ui/links/Link'

const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non eleifend metus, pretium bibendum arcu. Sed non varius eros, id consequat acu. Quisque tempor sapien eget massa mollis rhoncus. Quisque tempor lorem leo. Ut orci leo, tempor sit amet enim non, feugiat venenatis tortor. Donec quis facilisis magna, eget vulputate turpis. Nam eu elit egestas, lacinia eros a, porta tellus. Donec at commodo mauris, nec varius risus. Aenean nec augue id enim interdum pretium. Cras aliquet sapien libero, ut scelerisque leo lobortis non. Curabitur pulvinar risus in elit pretium, id imperdiet felis eleifend.'

const Template = args => <EmptyState {...args} />

const Basic = Template.bind({})
Basic.args = {
  title: 'Title is here',
  subtitle: lorem,
}

const WithImage = Template.bind({})
WithImage.args = {
  ...Basic.args,
  image_alt: 'Image alternative',
  image_src: 'https://www.matera.eu/static/df4d16361a7fd60b28bc622e5b25f693/3aed7/banner.png',
}

const WithLink = Template.bind({})
WithLink.args = {
  ...WithImage.args,
  children: <Link href="https://www.matera.eu/">Link is here</Link>,
}

export default {
  title: 'EmptyState',
  component: EmptyState,
}
export { Basic, WithImage, WithLink }
