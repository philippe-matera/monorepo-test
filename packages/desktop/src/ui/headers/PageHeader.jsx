import { COLORS } from '@matera-tech/utils'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { CONSTANTS } from 'src/constants'
import { LoadingWrapper } from 'src/shared/LoadingWrapper'

const StyledPageHeader = styled('div')`
  margin-left: -${CONSTANTS.spacing.s};
  margin-right: -${CONSTANTS.spacing.s};
  margin-top: -${CONSTANTS.spacing.s};
  margin-bottom: ${CONSTANTS.spacing.s};
  padding: ${CONSTANTS.spacing.m} ${CONSTANTS.spacing.xl};

  border-bottom: 1px solid ${COLORS.gray[400]};

  background-color: white;

  @media (min-width: 992px) {
    margin-top: -${CONSTANTS.spacing.l};
    margin-right: -${CONSTANTS.spacing.xl};
    margin-bottom: ${CONSTANTS.spacing.l};
    margin-left: -${CONSTANTS.spacing.xl};
  }

  ${({ $loading, $no_padding_bottom }) => !$loading && $no_padding_bottom && 'padding-bottom: 0;'}
`

StyledPageHeader.propTypes = {
  $loading: PropTypes.bool.isRequired,
  $no_padding_bottom: PropTypes.bool.isRequired,
}

const PageHeader = ({ children, loading, no_padding_bottom }) => (
  <StyledPageHeader $loading={loading} $no_padding_bottom={no_padding_bottom}>
    <LoadingWrapper loading={loading}>{children}</LoadingWrapper>
  </StyledPageHeader>
)

PageHeader.propTypes = {
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool,
  no_padding_bottom: PropTypes.bool,
}

PageHeader.defaultProps = {
  loading: false,
  no_padding_bottom: false,
}

export { PageHeader }
