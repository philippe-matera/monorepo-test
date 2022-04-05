import { COLORS } from '@matera-tech/utils'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { CONSTANTS } from 'src/constants'
import { Text } from 'ui/typography/Text'

const StyledSuffix = styled.div`
  height: 40px;

  border: 1px solid ${COLORS.gray[500]} !important;
  padding: ${CONSTANTS.spacing.xs} 12px;

  background-color: ${COLORS.gray[100]};

  font-size: 16px;
  font-family: inherit;
  line-height: 20px;
  float: right;
  border-left-width: 0px !important;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  font-weight: 400 !important;
`

const Suffix = ({ children }) => (
  <StyledSuffix>
    <Text>{children}</Text>
  </StyledSuffix>
)

Suffix.propTypes = {
  children: PropTypes.node,
}

export { Suffix }
