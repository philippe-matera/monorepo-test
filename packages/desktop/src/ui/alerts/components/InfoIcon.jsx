import { COLORS } from '@matera-tech/utils'
import React from 'react'
import styled from 'styled-components'

import { IconContainer } from 'ui/alerts/components/IconContainer'
import { Icon } from 'ui/icons/Icon'

const StyledIcon = styled(Icon)`
  color: ${COLORS.primary.normal};
`
const StyledIconContainer = styled(IconContainer)`
  background: ${COLORS.primary.lighter};
`

export const InfoIcon = () => (
  <StyledIconContainer>
    <StyledIcon name="info" round lg />
  </StyledIconContainer>
)
