import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { LoadingWrapper } from 'src/shared/LoadingWrapper'

const StyledContainer = styled.div`
  display: block;
  position: relative;
  overflow: hidden;

  height: 0;

  padding: 0;
  padding-bottom: 75%;
`

const Container = ({ children }) => (
  <StyledContainer>
    <LoadingWrapper loading />
    {children}
  </StyledContainer>
)

Container.propTypes = {
  children: PropTypes.node.isRequired,
}

export { Container }
