import { COLORS } from '@matera-tech/utils'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { Label } from 'ui/forms/Label'
import { Icon } from 'ui/icons/Icon'

const Container = styled.div`
  padding-left: 20px;

  ${({ inline }) =>
    inline &&
    `
    display: inline-block;
  `}

  .react-grid-Cell__value & {
    margin-top: 2px;
    margin-bottom: 0;
  }
`

const CheckboxInput = styled.input`
  position: absolute;
  opacity: 0;
  z-index: 2;

  width: 17px;
  height: 17px;

  margin-top: 0;
  margin-left: -20px !important;

  cursor: pointer;
`

const CheckboxLabel = styled(Label)`
  vertical-align: middle;

  position: relative;

  padding-left: 5px;

  cursor: pointer;

  min-height: 18px;

  display: ${({ label }) => (label ? "block" : "unset")};

  ${({ color }) => color === 'admin' && `color: ${COLORS.admin.normal};`}

  ${({ disabled }) =>
    disabled &&
    `
      cursor: not-allowed;
      opacity: 0.65;
    `}

  ::before {
    content: "";
    display: inline-block;
    position: absolute;

    width: 18px;
    height: 18px;
    top: calc(50% - 9px);
    left: 0;

    margin-left: -20px;
    border: 2px solid ${COLORS.gray[500]};
    border-radius: 4px;

    background-color: white;

    ${({ disabled }) =>
      disabled &&
      `
        background-color: rgba(255, 255, 255, 128);
      `}

    ${({ checked, color }) =>
      checked &&
      `
      border-color: ${COLORS[color].normal};
      background-color: ${COLORS[color].normal};

      ${({ disabled }) =>
        disabled &&
        `
        background-color: ${COLORS[color].primary}80;
        border-color:  ${COLORS[color]}.primary80;
      `}

    `}
  }

  &:hover {
    ::before {
      content: "";
      display: inline-block;
      position: absolute;

      width: 18px;
      height: 18px;
      top: calc(50% - 9px);
      left: 0;

      margin-left: -20px;
      border: 2px solid ${COLORS.gray[500]};
      border-radius: 4px;

      background-color: ${COLORS.gray[200]};

      ${({ disabled }) =>
        disabled &&
        `
        background-color: #eee;
      `}

      ${({ checked, color }) =>
        checked &&
        `
      border-color: ${COLORS[color].dark};
      background-color: ${COLORS[color].dark};

      ${({ disabled }) =>
        disabled &&
        `
        background-color: ${COLORS[color].primary}80;
        border-color:  ${COLORS[color]}.primary80;
      `}

    `}
    }
  }
`

const Check = styled(Icon)`
  position: absolute;
  z-index: 1;

  top: calc(50% - 12px);
  left: -18px;

  font-size: 14px;
  color: white;
  user-select: none;
  font-weight: bold;

  cursor: pointer;
`

const Checkbox = ({ id, checked, disabled, inline, label, label_props, color, ...props }) => (
  <Container inline={inline}>
    <CheckboxInput type="checkbox" id={id} checked={checked} disabled={disabled} {...props} />
    <CheckboxLabel
      htmlFor={id}
      checked={checked}
      disabled={disabled}
      color={color}
      label={label}
      {...label_props}
    >
      {label}
      {checked && <Check name="check" />}
    </CheckboxLabel>
  </Container>
)

Checkbox.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  checked: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  color: PropTypes.string,
  inline: PropTypes.bool,
  label: PropTypes.node,
  label_props: PropTypes.shape({ htmlFor: PropTypes.string }),
}

Checkbox.defaultProps = {
  inline: false,
  disabled: false,
  color: 'primary',
  label_props: {},
}

export { Checkbox }
