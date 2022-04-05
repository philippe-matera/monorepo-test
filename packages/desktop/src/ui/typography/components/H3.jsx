import { COLORS } from '@matera-tech/utils'
import styled from 'styled-components'

const StyledH3 = styled.h3`
  display: inline-block;
  ${({ color }) => color && `color: ${COLORS[color].normal};`}
  font-weight: 700;

  margin: 0 !important;

  font-size: 28px;
  line-height: 32px;
  word-break: break-word;
`

export default StyledH3
