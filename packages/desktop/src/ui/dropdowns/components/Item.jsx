import { COLORS } from '@matera-tech/utils'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { AbstractClickableElement } from 'src/shared/AbstractClickableElement'

const StyledItem = styled.li`
  &:hover {
    background-color: ${COLORS.gray[200]};
  }

  ${({ color }) =>
    color &&
    `
    color: ${COLORS[color].normal};

    &:hover {
      background-color: ${COLORS[color].normal}0D;
    }
  `}

  ${({ active }) =>
    active &&
    `
    &, &:hover {
      background: ${COLORS.primary.normal};
      color: ${COLORS.white.normal};
    }
  `}
`
const StyledLink = styled(AbstractClickableElement)`
  text-decoration: none;

  padding: 10px 24px;

  display: block;

  color: inherit;
  font-family: inherit;
  font-size: inherit;
  text-align: inherit;

  width: 100%;
  cursor: pointer;

  line-height: 24px;

  ${({ disabled }) =>
    disabled &&
    `
    opacity: .5;
    cursor: not-allowed !important;
  `};
`

const Item = ({ active, color, children, ...props }) => (
  <StyledItem active={active} color={color}>
    <StyledLink {...props}>{children}</StyledLink>
  </StyledItem>
)

Item.propTypes = {
  active: PropTypes.bool,
  color: PropTypes.oneOf(['danger']),
  children: PropTypes.node.isRequired,
}

export { Item }
