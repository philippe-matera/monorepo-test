import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import _ from 'underscore'

import { Icon as BaseIcon } from 'ui/icons/Icon'
import { Container } from 'ui/steps/components/step/Container'
import { Icon } from 'ui/steps/components/step/Icon'
import { Label } from 'ui/steps/components/step/Label'
import { Line } from 'ui/steps/components/step/Line'
import { Tooltip } from 'ui/tooltips/Tooltip'

const StyledStep = styled.div`
  position: relative;

  flex: ${props => (props.first ? "none" : "1")};
`

const Step = props => (
  <StyledStep first={props.first}>
    <Line first={props.first} disabled={props.disabled} />

    <Container active={props.active} onClick={props.onClick} done={props.done}>
      <Icon
        disabled={props.disabled}
        done={props.done}
        active={props.active}
        onClick={props.onClick}
        className="step-icon"
      >
        {props.done ? <BaseIcon name="check" /> : `${props.count}`}
      </Icon>

      <Label
        as={!_.isEmpty(props.labelTooltip) && Tooltip}
        active={props.active}
        onClick={props.onClick}
        {...props.labelTooltip}
        className="step-label"
      >
        {props.label}
      </Label>
    </Container>
  </StyledStep>
)

Step.propTypes = {
  first: PropTypes.bool,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  done: PropTypes.bool,
  label: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  labelTooltip: PropTypes.shape({ position: PropTypes.string, title: PropTypes.string }),
  onClick: PropTypes.func,
}

Step.defaultProps = {
  first: false,
  disabled: false,
  active: false,
  done: false,
  labelTooltip: {},
}

export { Step }
