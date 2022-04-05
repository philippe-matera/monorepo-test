import styled from 'styled-components'

import { CONSTANTS } from '../constants'

const Input = styled.input`
  margin: 0;
  min-height: 40px;
  border: 0;
  outline: none;
  width: 100%;
  background-color: transparent;
  padding: ${CONSTANTS.spacing.xs} ${CONSTANTS.spacing.s};
`

export { Input }
