import { COLORS } from '@matera-tech/utils'
import React from 'react'
import styled from 'styled-components'

import { IconContainer } from 'ui/alerts/components/IconContainer'
import { Icon } from 'ui/icons/Icon'

const StyledIcon = styled(Icon)`
  color: ${COLORS.danger.normal};
`
const StyledIconContainer = styled(IconContainer)`
  background: ${COLORS.danger.lighter};
`

export const ErrorIcon = () => (
  <StyledIconContainer>
    <StyledIcon name="error" round lg />
  </StyledIconContainer>
)
