import { COLORS, useToggle } from '@matera-tech/utils'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { CarretTitle } from 'shared/nav/CarretTitle'
import { CONSTANTS } from 'src/constants'
import { Clickable } from 'ui/links/Clickable'

const StyledDropTarget = styled.div`
  ${({ isOverCurrent }) =>
    isOverCurrent &&
    `
      background-color: ${COLORS.primary.normal}14;
      color: ${COLORS.primary.normal};
    `}
`
const StyledChildren = styled.div`
  padding-left: ${CONSTANTS.spacing.xl};
`

const Tree = ({
  expanded: props_expanded,
  title,
  children: props_children,
  connectDropTarget,
  isOverCurrent,
}) => {
  const [expanded, toggleExpanded] = useToggle(props_expanded)

  const children = expanded ? <StyledChildren>{props_children}</StyledChildren> : undefined

  const component = (
    <>
      <Clickable onClick={toggleExpanded}>
        <CarretTitle expanded={expanded} title={title} />
      </Clickable>

      {children}
    </>
  )

  return connectDropTarget
    ? connectDropTarget(
        <div>
          <StyledDropTarget isOverCurrent={isOverCurrent}>{component}</StyledDropTarget>
        </div>,
      )
    : component
}
Tree.propTypes = {
  expanded: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  children: PropTypes.node,
  connectDropTarget: PropTypes.func,
  isOverCurrent: PropTypes.bool,
}
Tree.defaultProps = {
  expanded: false,
  isOverCurrent: false,
}

export { Tree }
