import { COLORS } from '@matera-tech/utils'
import styled from 'styled-components'

const StyledH6 = styled.h6`
  display: inline-block;
  ${({ color }) => color && `color: ${COLORS[color].normal};`}
  ${({ light_font }) => (light_font ? 'font-weight: 500;' : 'font-weight: 700;')}
  margin: 0 !important;

  font-size: 16px;
  line-height: 24px;
  ${({ italic }) => italic && 'font-style: italic; font-weight: 400;'}
  word-break: break-word;
`

export default StyledH6
