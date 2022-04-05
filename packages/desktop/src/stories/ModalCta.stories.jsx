import React from 'react'

import { ModalCta } from 'shared/ModalCta'
import { Button } from 'ui/buttons/Button'
import { Card } from 'ui/cards/Card'
import { Text } from 'ui/typography/Text'

const Template = args => <ModalCta {...args} />

// eslint-disable-next-line
const WrappedComponent = ({ text }) => (
  <Card.Content>
    <Text>{text}</Text>
  </Card.Content>
)

const Children = <Button>Toggle modal</Button>

const MODAL_TEXT =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

const Basic = Template.bind({})
Basic.args = {
  modalProps: {
    title: 'Modal title',
    subtitle: 'Modal subtitle',
    small: true,
  },
  wrappedComponent: WrappedComponent,
  wrappedProps: {
    text: MODAL_TEXT,
  },
  children: Children,
}

export default {
  title: 'ModalCta',
  component: Basic,
}

export { Basic }
