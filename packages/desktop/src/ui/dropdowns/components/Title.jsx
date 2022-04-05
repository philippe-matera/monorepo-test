import { COLORS } from '@matera-tech/utils'
import styled from 'styled-components'

import { CONSTANTS } from 'src/constants'

export const Title = styled.li`
  padding: ${CONSTANTS.spacing.xs} ${CONSTANTS.spacing.m} ${CONSTANTS.spacing.xs}
    ${CONSTANTS.spacing.m};
  font-weight: bold;

  font-size: 16px;

  &:not(:first-child) {
    border-top: 1px solid ${COLORS.gray[400]};
  }
`
