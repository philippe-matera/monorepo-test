import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { CONSTANTS } from 'src/constants'
import { BaseContent } from 'ui/cards/components/BaseContent'

const Wrapper = styled(BaseContent)`
  padding: ${CONSTANTS.spacing.m};
  ${({ custom_email }) => custom_email && `padding: 0 0 10px 0;`}

  &:not(:last-child)::after {
    top: 24px;
    right: 24px;
    width: calc(100% + 48px);
  }
`
const PaddedContent = ({ header, footer, children, ...props }) => {
  let className
  if (header) className = 'card-header'
  else if (footer) className = 'card-footer'

  return (
    <Wrapper className={className} {...props}>
      {children}
    </Wrapper>
  )
}

PaddedContent.propTypes = {
  header: PropTypes.bool,
  footer: PropTypes.bool,
  children: PropTypes.node,
}

PaddedContent.defaultProps = {
  header: false,
  footer: false,
}

export { PaddedContent }
