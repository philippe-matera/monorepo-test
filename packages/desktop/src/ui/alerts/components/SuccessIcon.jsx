import { COLORS } from '@matera-tech/utils'
import React from 'react'
import styled from 'styled-components'

import { IconContainer } from 'ui/alerts/components/IconContainer'
import { Icon } from 'ui/icons/Icon'

const StyledIcon = styled(Icon)`
  color: ${COLORS.success.normal};
`
const StyledIconContainer = styled(IconContainer)`
  background: ${COLORS.success.lighter};
`

export const SuccessIcon = () => (
  <StyledIconContainer>
    <StyledIcon name="check" round lg />
  </StyledIconContainer>
)
