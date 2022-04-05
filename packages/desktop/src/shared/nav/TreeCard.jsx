import { useToggle } from '@matera-tech/utils'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { CarretTitle } from 'shared/nav/CarretTitle'
import { Card } from 'ui/cards/Card'

const ClickableCardContent = styled(Card.Content)`
  cursor: pointer;
`

const TreeCard = ({ id, title, content, without_container, expanded: props_expanded }) => {
  const [expanded, toggleExpanded] = useToggle(props_expanded)

  const Container = without_container ? React.Fragment : Card.Container
  const container_props = without_container ? {} : { id }

  return (
    <Container {...container_props}>
      <ClickableCardContent onClick={toggleExpanded}>
        <CarretTitle expanded={expanded} title={title} border={false} min_height={false} />
      </ClickableCardContent>
      {expanded && content}
    </Container>
  )
}

TreeCard.propTypes = {
  title: PropTypes.node.isRequired,
  content: PropTypes.node.isRequired,
  expanded: PropTypes.bool,
  without_container: PropTypes.bool,
  id: PropTypes.string,
}

export { TreeCard }
