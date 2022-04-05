import { COLORS } from '@matera-tech/utils'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { CONSTANTS } from 'src/constants'
import { LoadingWrapper } from 'src/shared/LoadingWrapper'

const StyledContainer = styled.div`
  border-radius: 8px;

  background-color: white;

  height: fit-content;

  position: relative;
  border: ${({ border_color }) => {
      if (border_color === 'default') {
        return `1px solid ${COLORS.gray[400]};`
      }

      return `1px solid ${COLORS[border_color].normal};`
    }}
    & > .circular-spinner {
    padding: ${CONSTANTS.spacing.m} ${CONSTANTS.spacing.m};

    text-align: center;
  }

  ${({ fit }) => fit && 'max-width: max-content'}
`

const Container = ({ id, children, fit, loading, className, border_color }) => (
  <StyledContainer
    border_color={border_color}
    id={id}
    className={`card-container ${className}`}
    fit={fit}
  >
    <LoadingWrapper loading={loading}>{children}</LoadingWrapper>
  </StyledContainer>
)

Container.propTypes = {
  children: PropTypes.node,
  loading: PropTypes.bool,
  fit: PropTypes.bool,
  id: PropTypes.string,
  className: PropTypes.string,
  border_color: PropTypes.oneOf(['success', 'danger', 'primary', 'admin', 'default']),
}

Container.defaultProps = {
  loading: false,
  fit: false,
  id: null,
  className: '',
  border_color: 'default',
}

export { Container }
