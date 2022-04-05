import { COLORS } from '@matera-tech/utils'
import PropTypes from 'prop-types'
import React from 'react'
import styled, { keyframes } from 'styled-components'

import { CONSTANTS } from 'src/constants'
import { Flex } from 'ui/flex/Flex'
import { CloseButton } from 'ui/icon_buttons/CloseButton'
import { Icon } from 'ui/icons/Icon'
import { Text } from 'ui/typography/Text'
import { Block } from 'ui/wrappers/Block'

const animate = keyframes`
  0% {
    transform: translate(-50%, -100px);
  }

  100% {
    transform: translate(-50%, 0);
  }
`

const StyledToast = styled.div`
  display: inline-block;
  position: fixed;
  z-index: 2070;

  top: calc(${CONSTANTS.layout.action_bar_height} + ${CONSTANTS.spacing.xs});
  left: 50%;

  padding: 10px;

  background-color: white;

  animation: ${animate} 0.4s ease-in-out;
  box-shadow: 0px 16px 32px ${COLORS.gray[1000]}33, 0px 8px 16px ${COLORS.gray[1000]}33;
  border-radius: 6px;
  transform: translateX(-50%);

  @media (max-width: ${CONSTANTS.breakpoints.mobile}) {
    width: 90vw;
  }
`

const ICONS = {
  success: { name: 'check_circle', color: 'success' },
  warning: { name: 'exclamation_triangle', color: 'warning' },
  danger: { name: 'exclamation_circle', color: 'danger' },
}

const Toast = ({ type, children, onHide }) => (
  <StyledToast>
    <Flex item_wrapper no_wrap align_items="center">
      <Flex.Item ratio={0}>
        <Text color={ICONS[type].color}>
          <Icon name={ICONS[type].name} space_after />
        </Text>
      </Flex.Item>

      <Flex.Item ratio={1}>
        <Block centered>{children}</Block>
      </Flex.Item>

      <Flex.Item ratio={0}>
        <Block righted>
          <CloseButton onClick={onHide} />
        </Block>
      </Flex.Item>
    </Flex>
  </StyledToast>
)

Toast.propTypes = {
  type: PropTypes.oneOf(['success', 'warning', 'danger']),
  children: PropTypes.node.isRequired,
  onHide: PropTypes.func.isRequired,
}

export { Toast }
