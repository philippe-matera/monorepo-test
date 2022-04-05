import { COLORS } from '@matera-tech/utils'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { CONSTANTS } from 'src/constants'
import { Label } from 'ui/forms/Label'

const Container = styled.div`
  padding-left: 20px;
  cursor: pointer;

  &:not(:first-child) {
    margin-top: ${CONSTANTS.spacing.xs};

    ${({ inline }) =>
      inline &&
      `
    margin-top: 0;
    margin-left: ${CONSTANTS.spacing.xs};
  `}

    .react-grid-Cell__value & {
      min-height: 35px;
    }
  }
`

const Input = styled.input`
  position: absolute;
  opacity: 0;
  z-index: 1;

  width: 17px;
  height: 17px;

  margin-top: 0;
  margin-left: -20px !important;
  cursor: pointer;
`

const StyledLabel = styled(Label)`
  display: inline-block;
  vertical-align: middle;

  position: relative;

  padding-left: 5px;
  cursor: pointer;

  :empty {
    min-height: 20px;

    padding-left: 0px;
  }

  ${({ disabled }) =>
    disabled &&
    `
      cursor: not-allowed;
      opacity: 0.65;
    `}

  ::before {
    content: '';
    cursor: pointer;

    display: inline-block;
    position: absolute;

    width: 18px;
    height: 18px;
    left: 0;
    ${({ vertical_align }) => (vertical_align ? `top: max(calc(50% - 9px), 2px);` : `top: 2px;`)}

    margin-left: -20px;
    border-radius: 50%;

    border: 2px solid ${COLORS.gray[500]};

    background-color: white;
    ${({ checked, color }) =>
      checked &&
      `
      border-color: ${COLORS[color].normal};
      background-color: ${COLORS[color].normal};
    `}
  }

  ${({ checked, vertical_align }) =>
    checked &&
    `
    ::after {
      display: inline-block;
      position: absolute;
      content: " ";
      cursor: pointer;
      width: 6px;
      height: 6px;
      left: 6px;
      top: ${vertical_align ? `max(calc(50% - 3px), 8px);` : `8px;`}
      margin-left: -20px;
      border-radius: 50%;
      background-color: white;
      transform: scale(1, 1);
    }
  `}

  &:hover {
    ::before {
      content: '';
      cursor: pointer;

      display: inline-block;
      position: absolute;

      width: 18px;
      height: 18px;
      left: 0;

      margin-left: -20px;
      border-radius: 50%;

      border: 2px solid ${COLORS.gray[500]};

      background-color: ${COLORS.gray[200]};
      ${({ disabled }) =>
        disabled &&
        `
          background-color: rgba(255, 255, 255, 128);
        `}

      ${({ checked, color }) =>
        checked &&
        `
        border-color: ${COLORS[color].dark};
        background-color: ${COLORS[color].dark};

        ${({ disabled }) =>
          disabled &&
          `
          background-color: ${COLORS[color].normal}80;
          border-color:  ${COLORS[color].normal}80;
        `}

      `}
    }
  }
`

const Radio = ({
  id,
  checked,
  disabled,
  inline,
  label,
  label_props,
  onContainerClick,
  color,
  vertical_align,
  ...props
}) => (
  <Container inline={inline} onClick={onContainerClick}>
    <Input type="radio" id={id} checked={checked} disabled={disabled} {...props} />
    <StyledLabel
      htmlFor={id}
      checked={checked}
      disabled={disabled}
      color={color}
      vertical_align={vertical_align}
      {...label_props}
    >
      {label}
    </StyledLabel>
  </Container>
)

Radio.propTypes = {
  id: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  color: PropTypes.string,
  inline: PropTypes.bool,
  label: PropTypes.node,
  label_props: PropTypes.shape({ htmlFor: PropTypes.string, has_bottom_margin: PropTypes.bool }),
  onContainerClick: PropTypes.func,
}

Radio.defaultProps = {
  inline: false,
  disabled: false,
  color: 'primary',
  label_props: {},
}

export { Radio }
