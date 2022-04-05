import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { NumericInput } from 'shared/form/formik/NumericInput'

const SmallerNumericInput = styled(NumericInput)`
  min-width: initial;

  text-align: right;
  ${({ sm }) => sm && `max-width: fit-content;`}
`

const TableNumericInput = ({ sm, errorProps, ...props }) => (
  <SmallerNumericInput {...props} sm={sm} errorProps={errorProps} />
)

TableNumericInput.propTypes = {
  sm: PropTypes.bool,
  errorProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
}

TableNumericInput.defaultProps = {
  sm: false,
  errorProps: { hidden: true },
}

export { TableNumericInput }
