import { COLORS } from '@matera-tech/utils'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { Prefix } from 'ui/forms/Prefix'
import { Suffix } from 'ui/forms/Suffix'

const InlineDiv = styled.div`
  display: flex;

  width: 100%;
  min-width: 150px;
`

// Weird input[type="text"]&:focus + !important on outlines are needed to prevent zoom sdk messing up

const StyledInput = styled.input`
  margin: 0;
  border: 0px;
  padding: 0px;
  width: 100%;
  font-family: inherit;
  color: ${COLORS.gray[1000]};
  font-weight: 400 !important;
  font-size: 16px;
  line-height: 20px;
  background-color: transparent !important;

  ${({ suffix }) => suffix && `border-radius: 4px 0 0 4px;`}

  outline: 0 !important;
  outline-offset: 0 !important;

  &:focus {
    border: 0px !important;
    outline: 0 !important;
    outline-offset: 0 !important;
  }

  ::placeholder {
    color: ${COLORS.gray[600]};
  }

  ${({ disabled }) => disabled && `cursor: not-allowed !important;`}
`

const InputContainer = styled.div`
  display: flex;
  width: 100%;
  border: 1px solid ${COLORS.gray[500]} !important;
  border-radius: 4px;
  height: 40px;
  padding: 10px 16px;
  background-color: ${COLORS.white.normal};

  &:focus-within {
    padding: 9px 15px;
    border-width: 2px !important;
    border-color: ${COLORS.primary.light} !important;
    outline: 0 !important;
    outline-offset: 0 !important;
  }

  ${({ disabled }) =>
    disabled &&
    `
    cursor: not-allowed !important;
    background: #eeeeee;
    opacity: 1;
  `}
  ${({ error }) =>
    error &&
    `
        border-color: ${COLORS.danger.normal} !important;
        background-color: ${COLORS.danger.lighter};

        &:focus {
          border-width: 2px !important;
          border-color: ${COLORS.danger.normal} !important;
          outline: 0;
        }
      `};

  ${({ suffix }) =>
    suffix &&
    `
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
    `}
`

const TextInput = React.forwardRef(({ disabled, error, ...props }, ref) => {
  const input = (
    <InputContainer suffix={props.suffix} disabled={disabled} error={error}>
      {props.prefix && <Prefix>{props.prefix}</Prefix>}
      <StyledInput disabled={disabled} ref={ref} autoComplete="off" {...props} />
    </InputContainer>
  )
  if (props.suffix)
    return (
      <InlineDiv>
        {input}
        <Suffix>{props.suffix}</Suffix>
      </InlineDiv>
    )

  return input
})

TextInput.displayName = 'TextInput'

TextInput.defaultProps = {
  xs: false,
  lg: false,
  error: false,
  type: 'text',
  disabled: false,
}

TextInput.propTypes = {
  xs: PropTypes.bool,
  lg: PropTypes.bool,
  error: PropTypes.bool,
  type: PropTypes.string,
  suffix: PropTypes.string,
  prefix: PropTypes.string,
  disabled: PropTypes.bool,
}

export { TextInput }
