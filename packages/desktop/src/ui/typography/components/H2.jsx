import { COLORS } from '@matera-tech/utils'
import styled from 'styled-components'

const StyledH2 = styled.h2`
  display: inline-block;
  ${({ color }) => color && `color: ${COLORS[color].normal};`}
  font-weight: 700;

  margin: 0 !important;

  font-size: 32px;
  line-height: 40px;
  word-break: break-word;
`

export default StyledH2
