import React, { useState } from 'react'

import { Button } from 'ui/buttons/Button'
import { Card } from 'ui/cards/Card'
import { Modal } from 'ui/modals/Modal'
import { Text } from 'ui/typography/Text'
import { Title } from 'ui/typography/Title'

const Template = args => {
  const [modal_visibility, setModalVisibility] = useState(false)
  const toggleModal = () => setModalVisibility(prev_state => !prev_state)

  return (
    <>
      {modal_visibility && <Modal onHide={toggleModal} {...args} />}
      <Button onClick={toggleModal}>Toggle modal</Button>
    </>
  )
}

const Children = (
  <Card.Container>
    <Card.Content header>
      <Title.H5>A lovely title</Title.H5>
    </Card.Content>
    <Card.Content>
      <Text>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
        been the industry s standard dummy text ever since the 1500s, when an unknown printer took a
        galley of type and scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
        It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
        passages, and more recently with desktop publishing software like Aldus PageMaker including
        versions of Lorem Ipsum.
      </Text>
    </Card.Content>
  </Card.Container>
)

const Basic = Template.bind({})
Basic.args = {
  children: Children,
}

export default {
  title: 'Modal',
  component: Basic,
}

export { Basic }
