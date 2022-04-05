import styled from 'styled-components'

import { CONSTANTS } from 'src/constants'

export const Paragraph = styled.p`
  margin-top: 0;
  margin-bottom: 0;
  & + & {
    margin-top: ${CONSTANTS.spacing.s};
  }
`
