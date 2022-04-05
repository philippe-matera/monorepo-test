import React from 'react'

import { Avatar } from 'ui/avatar/Avatar'

const Template = args => <Avatar {...args} />

const Picture = Template.bind({})
Picture.args = {
  src: 'images/avatar/picture.jpg',
  medium: true,
}

const Initials = Template.bind({})
Initials.args = {
  src: 'https://ui-avatars.com/api/?size=128&rounded=true&name=Joe+MacMillan&background=e6e6e8&color=676a6c',
  medium: true,
}

export default {
  title: 'Avatar',
  component: Avatar,
  argTypes: {
    onClick: { table: { disable: true } },
  },
}
export { Picture, Initials }
