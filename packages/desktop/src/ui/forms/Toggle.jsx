import { COLORS } from '@matera-tech/utils'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { Label as BaseLabel } from 'ui/forms/Label'

const Container = styled.div`
  padding-left: 49px;
`

const Input = styled.input`
  display: none;
`

const Label = styled(BaseLabel)`
  vertical-align: middle;

  position: relative;

  padding-left: 5px;

  cursor: pointer;
  ${({ disabled }) =>
    disabled &&
    `
  cursor: not-allowed;
  opacity: 0.7;
  `}

  min-height: 20px;

  ::before {
    content: "";
    display: inline-block;
    position: absolute;

    width: 46px;
    height: 24px;
    top: calc(50% - 12px);
    left: 0;

    margin-left: -49px;

    border-radius: 12px;

    background-color: ${COLORS.gray[400]};

    transition: background-color 0.15s ease-in-out;

    ${({ on, color }) =>
      on &&
      `
    background-color: ${COLORS[color].normal};
    `}
  }

  ::after {
    content: "";
    position: absolute;

    left: 0;
    top: -1px;

    margin-left: -47px;

    height: 20px;
    width: 20px;

    border-radius: 50%;

    background: white;

    transition: margin 0.3s ease-out;

    ${({ on }) =>
      on &&
      `
        margin-left: -25px;
      `}
  }

  ${({ disabled, on, color }) =>
    !disabled &&
    `&:hover {
    ::before {
      background-color: ${on ? COLORS[color].dark : COLORS.gray[500]};
    }
  }`}
`

const Toggle = ({ id, on, color, label, label_props, disabled, ...props }) => (
  <Container>
    <Input type="checkbox" id={id} checked={on} disabled={disabled} {...props} />
    <Label htmlFor={id} on={on} color={color} disabled={disabled} {...label_props}>
      {label}
    </Label>
  </Container>
)

Toggle.propTypes = {
  id: PropTypes.string,
  on: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  label: PropTypes.node,
  label_props: PropTypes.shape({ htmlFor: PropTypes.string }),
  color: PropTypes.oneOf(['primary', 'admin']),
}

Toggle.defaultProps = {
  disabled: false,
  label_props: {},
  color: 'primary',
}

export { Toggle }
