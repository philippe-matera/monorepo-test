import { COLORS } from '@matera-tech/utils'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { CONSTANTS } from 'src/constants'
import { Step } from 'ui/steps/components/Step'
import { Block } from 'ui/wrappers/Block'

const RoundIcon = styled(Block)`
  width: 32px;
  height: 32px;

  background-color: ${COLORS.primary.lighter};

  font-size: 16px;
  color: ${COLORS.primary.normal};
  line-height: 32px;
  text-align: center;
  font-weight: 700;
  border-radius: 50%;
  user-select: none;
`

const FlexRow = styled.div`
  display: flex;

  flex-direction: row;
  :not(:last-child) {
    margin-bottom: ${CONSTANTS.spacing.m};
  }
`

const Line = styled(Block)`
  width: 2px;
  height: calc(100% + ${CONSTANTS.spacing.m});

  margin-left: 15.5px;

  background: ${COLORS.primary.lighter};
`

const StepsContainer = styled.div`
  margin: ${CONSTANTS.spacing.m} 0 0 0;
  padding: 0 ${CONSTANTS.spacing.xl} 0 ${CONSTANTS.spacing.s};

  display: flex;
  ${({ top }) => top && `margin-top: ${CONSTANTS.spacing[top]};`}
`

const Steps = props => (
  <StepsContainer top={props.top}>
    {props.steps.map((step, index) => (
      <Step key={step.key} {...step} count={index + 1} first={index === 0} />
    ))}
  </StepsContainer>
)

Steps.propTypes = {
  top: PropTypes.string,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      active: PropTypes.bool,
      done: PropTypes.bool,
    }),
  ),
}

const VerticalSteps = props =>
  props.steps.map((step, index) => (
    <FlexRow key={step.key}>
      <Block>
        <RoundIcon>{index + 1}</RoundIcon>
        {index + 1 !== props.steps.length && <Line />}
      </Block>
      <Block left="m">{step.label}</Block>
    </FlexRow>
  ))

VerticalSteps.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ),
}

export { Steps, VerticalSteps }
