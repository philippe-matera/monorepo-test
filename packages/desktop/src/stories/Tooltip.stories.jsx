import React from 'react'

import { Button } from 'ui/buttons/Button'
import { Tooltip } from 'ui/tooltips/Tooltip'

const Template = args => <Tooltip {...args} />

const Basic = Template.bind({})
Basic.args = {
  text: 'Also known as the Australian Sloth, is a species of herbivorous tree marsupial endemic to Australia',
  children: <Button>Discover the Koala</Button>,
}

const BasicWithTitle = Template.bind({})
BasicWithTitle.args = {
  ...Basic.args,
  title: 'The koala (Phascolarctos cinereus)',
}

const BasicWithTitleAndCta = Template.bind({})
BasicWithTitleAndCta.args = {
  ...BasicWithTitle.args,
  button: {
    text: 'Discover more about Koala',
    url: 'https://www.matera.eu',
  },
}

const BasicWithCta = Template.bind({})
BasicWithCta.args = {
  ...Basic.args,
  button: {
    text: 'Discover more about Koala',
    url: 'https://www.matera.eu',
  },
}

const BasicWithImage = Template.bind({})
BasicWithImage.args = {
  ...Basic.args,
  image: {
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBkQ2BUJIbCDW5Fu6Qto0bQ3pxAlKbH2xcrg&usqp=CAU',
    alt: 'image alternative',
  },
}

const BasicWithImageAndTitle = Template.bind({})
BasicWithImageAndTitle.args = {
  ...BasicWithImage.args,
  title: 'The koala (Phascolarctos cinereus)',
}

const BasicWithImageAndCta = Template.bind({})
BasicWithImageAndCta.args = {
  ...BasicWithImage.args,
  button: {
    text: 'Discover more about Koala',
    url: 'https://www.matera.eu',
  },
}

const BasicWithImageAndCtaAndTitle = Template.bind({})
BasicWithImageAndCtaAndTitle.args = {
  ...BasicWithImageAndCta.args,
  title: 'The koala (Phascolarctos cinereus)',
}

const Interactive = Template.bind({})
Interactive.args = {
  ...Basic.args,
  size: 'big',
  position: 'right',
  theme: 'dark',
  interactive: true,
}

export default {
  title: 'Tooltip',
  component: Tooltip,
}
export {
  Basic,
  BasicWithTitle,
  BasicWithTitleAndCta,
  BasicWithImageAndCtaAndTitle,
  BasicWithCta,
  BasicWithImage,
  BasicWithImageAndTitle,
  BasicWithImageAndCta,
  Interactive,
}
