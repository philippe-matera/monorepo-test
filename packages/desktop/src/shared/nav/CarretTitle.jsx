import { COLORS } from '@matera-tech/utils'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import _ from 'underscore'

import useHover from 'hooks/useHover'
import { Icon } from 'ui/icons/Icon'
import { Block } from 'ui/wrappers/Block'

// No border for bottom element since it messes with Card.Content radius/shadow
// Higher line-height so that icons fit
const StyledFile = styled.div`
  display: flex;

  align-items: center;

  ${({ min_height }) => min_height && 'min-height: 49px;'}

  ${({ border }) => border && `border-bottom: 1px solid ${COLORS.gray[500]};`}
`

// Higher line-height so that caret is vertically aligned
const StyledIcon = styled(Icon)`
  line-height: 25px;
`

const StyledBlock = styled(Block)`
  display: inline;

  left: GlobalVariable.spacing.xs;
  width: 100%;
`

const CarretTitle = ({ expanded, title, border, min_height }) => {
  const [hover_ref, hover] = useHover()

  let displayed_title = title
  if (_.isFunction(title)) displayed_title = title(expanded, hover)

  return (
    <StyledFile ref={hover_ref} border={border} min_height={min_height}>
      <Block inline>
        <StyledIcon name={`caret_${expanded ? 'down' : 'right'}`} />
      </Block>
      <StyledBlock>{displayed_title}</StyledBlock>
    </StyledFile>
  )
}

CarretTitle.propTypes = {
  expanded: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  border: PropTypes.bool,
  min_height: PropTypes.bool,
}

CarretTitle.defaultProps = {
  border: true,
  min_height: true,
}

export { CarretTitle }
