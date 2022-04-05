import { COLORS } from '@matera-tech/utils'
import styled from 'styled-components'

import { CONSTANTS } from 'src/constants'

const BannerContainer = styled.div`
  padding: ${CONSTANTS.spacing.l};
  background-color: ${COLORS.primary.lighter};
  border-radius: ${CONSTANTS.spacing.s};
`

export { BannerContainer }
