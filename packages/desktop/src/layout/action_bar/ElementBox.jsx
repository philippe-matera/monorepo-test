import { COLORS } from '@matera-tech/utils'
import styled from 'styled-components'

const ElementBox = styled.div`
  height: 42px;
  max-width: 250px;

  margin-top: 2px;
  padding-top: 2px;
  padding-right: 12px;
  padding-left: 12px;

  color: white;
  white-space: nowrap;

  border-radius: 4px;

  user-select: none;

  &:hover {
    background-color: ${COLORS.primary.normal}33;
  }
`

export { ElementBox }
