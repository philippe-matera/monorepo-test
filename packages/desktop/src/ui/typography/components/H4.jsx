import { COLORS } from '@matera-tech/utils'
import styled from 'styled-components'

const StyledH4 = styled.h4`
  display: inline-block;
  ${({ color }) => color && `color: ${COLORS[color].normal};`}
  font-weight: 700;

  margin: 0 !important;

  font-size: 24px;
  line-height: 32px;
  word-break: break-word;
`

export default StyledH4
