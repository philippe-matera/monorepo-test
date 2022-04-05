import { COLORS } from '@matera-tech/utils'
import styled from 'styled-components'

const StyledH5 = styled.h5`
  display: inline-block;
  ${({ color }) => color && `color: ${COLORS[color].normal};`}
  font-weight: 700;

  margin: 0 !important;

  font-size: 20px;
  line-height: 24px;
  word-break: break-word;
`

export default StyledH5
