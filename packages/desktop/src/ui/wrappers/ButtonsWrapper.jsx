import styled from 'styled-components'

import { CONSTANTS } from 'src/constants'

export const ButtonsWrapper = styled.span`
  :not(:empty) {
    margin-top: -${CONSTANTS.spacing.xs};
    margin-right: -${CONSTANTS.spacing.s};
  }

  & > .tooltip-wrapper > *,
  & > .ninja > *,
  & > *:not(.tooltip-wrapper):not(.ninja) {
    margin-top: ${CONSTANTS.spacing.xs};
    margin-right: ${CONSTANTS.spacing.s};
  }
`
