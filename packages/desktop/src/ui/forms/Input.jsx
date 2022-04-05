import { COLORS } from '@matera-tech/utils'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { Icon } from 'ui/icons/Icon'

const Container = styled.div`
  position: relative;

  ${({ icon, icon_left }) =>
    icon &&
    `
      input {
        padding-${icon_left ? 'left' : 'right'}: 22px !important;
      }
    `}
`

const IconContainer = styled.span`
  position: absolute;
  ${({ icon_left }) => (icon_left ? 'left: 10px;' : 'right: 10px;')}
  top: 9px;

  color: ${COLORS.gray[800]};
  font-size: 18px;
  line-height: 18px;
  user-select: none;

  ${({ onClick }) =>
    onClick &&
    `
      cursor: pointer;

      &:hover {
        color: ${COLORS.gray[1000]};
      }
    `}
`

const Input = ({ icon, icon_left, children: input, className, onClickIcon }) => (
  <Container icon={!!icon} icon_left={icon_left} className={className}>
    {input}
    {icon && (
      <IconContainer icon_left={icon_left} onClick={onClickIcon}>
        <Icon name={icon} />
      </IconContainer>
    )}
  </Container>
)

Input.propTypes = {
  icon: PropTypes.string,
  icon_left: PropTypes.bool,
  onClickIcon: PropTypes.func,
  children: PropTypes.element,
  className: PropTypes.string,
}

Input.defaultProps = {
  icon_left: false,
}

export { Input }
