import { COLORS } from '@matera-tech/utils'
import React from 'react'
import styled from 'styled-components'

import { IconContainer } from 'ui/alerts/components/IconContainer'
import { Icon } from 'ui/icons/Icon'

const StyledIcon = styled(Icon)`
  color: ${COLORS.warning.normal};
`
const StyledIconContainer = styled(IconContainer)`
  background: ${COLORS.warning.lighter};
`

export const WarningIcon = () => (
  <StyledIconContainer>
    <StyledIcon name="exclamation_triangle" round lg />
  </StyledIconContainer>
)
