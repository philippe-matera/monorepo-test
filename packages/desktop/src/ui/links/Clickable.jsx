import { COLORS } from '@matera-tech/utils'
import PropTypes from 'prop-types'
import {forwardRef} from 'react'
import styled from 'styled-components'

import { AbstractClickableElement } from 'src/shared/AbstractClickableElement'

const StyledRoot = styled(AbstractClickableElement).withConfig({
  shouldForwardProp: prop => !['hover'].includes(prop),
})`
  display: contents;

  border: 0;

  background: none;

  font: inherit;
  color: inherit;
  text-align: inherit;
  text-decoration: none;
  cursor: pointer;

  &:hover,
  &:active,
  &:focus {
    color: ${({ hover }) => (hover ? COLORS.primary.normal : "inherit")};
    outline: 0;
  }
`

const Clickable = forwardRef(({ children, className = '', ...props }, ref) => (
  <StyledRoot ref={ref} className={`clickable ${className}`} {...props}>
    {children}
  </StyledRoot>
))

Clickable.displayName = 'Clickable'

Clickable.propTypes = {
  hover: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

Clickable.defaultProps = {
  hover: false,
}

export { Clickable }
