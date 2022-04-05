import { COLORS } from '@matera-tech/utils'
import styled from 'styled-components'

const DefaultRow = styled.tr`
  border-top: 1px solid ${COLORS.gray[400]};
  ${({ no_border }) => no_border && 'border: none;'}
  ${({ background_color }) =>
    background_color && `background-color: ${COLORS[background_color].lighter};`}
  ${({ highlight }) => highlight && `background-color: ${COLORS.gray[100]};`}
  &:hover {
    background-color: ${COLORS.gray[100]};
  }
  &:active {
    background-color: ${COLORS.gray[200]};
  }
`

export { DefaultRow }
