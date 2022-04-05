import { COLORS } from '@matera-tech/utils'
import React from 'react'
import styled from 'styled-components'

import { TextInput } from 'ui/forms/TextInput'

const FakeInputContainer = styled.div`
  display: inline-flex;
`

const StyledFakeInput = styled(TextInput)`
  color: transparent;

  text-shadow: 0 0 0 ${COLORS.primary.normal};

  margin: 0 8px;

  min-width: 200px;

  padding: 5px 1px 3px 1px;

  height: 24px;

  text-align: center;

  background-color: white;

  border: 1px dashed #a7aaab !important;
  border-radius: 0;

  font-weight: 400 !important;

  font-size: 16px;

  &:not(:disabled) {
    cursor: pointer;
  }

  &:hover,
  &:focus,
  &:active,
  input[type="text"]&:focus {
    border-color: 1px dashed ${COLORS.primary.normal} !important;
  }

  ${({ error }) =>
    error &&
    `
        border-color: ${COLORS.danger.normal} !important;
      `}
`

const FakeInput = props => (
  <FakeInputContainer>
    <StyledFakeInput {...props} />
  </FakeInputContainer>
)

export { FakeInput }
