import { COLORS } from '@matera-tech/utils'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { CONSTANTS } from 'src/constants'

const Container = styled.span`
  display: inline-block;

  width: 41px;
  height: 41px;

  margin-right: ${CONSTANTS.spacing.xs};
  border: 1px dotted ${COLORS.primary.normal};
  padding: 9px 0px;

  text-align: center;
  transform: rotate(40deg);
  border-radius: 100%;
  font-weight: bold;
`

const Number = styled.span`
  display: inline-block;
  transform: rotate(-40deg);

  color: ${COLORS.primary.normal};
`

const Separator = styled.span`
  display: inline-block;
  transform: rotate(-30deg);

  color: ${COLORS.gray[800]};
`

const FormNumber = ({ current, max }) => (
  <Container>
    <Number>{current}</Number>
    &nbsp;
    <Separator>/</Separator>
    &nbsp;
    <Number>{max}</Number>
  </Container>
)

FormNumber.propTypes = {
  current: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
}

export { FormNumber }
