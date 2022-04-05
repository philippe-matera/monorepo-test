import { COLORS } from '@matera-tech/utils'
import PropTypes from 'prop-types'
import React from 'react'
import styled, { keyframes } from 'styled-components'

const animate_show = keyframes`
  0% {
    transform: translate(0, -30%);

    opacity: 0;
  }

  100% {
    transform: translate(0, 0);

    opacity: 1;
  }
`

const StyledContainer = styled.div`
  position: fixed;
  z-index: 2060;

  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;

  padding: 10px 3%;

  background-color: #00000064;
  overflow-x: hidden;
  overflow-y: auto;
  .modal-matera {
    position: relative;

    max-width: ${({ small }) => (small ? "530px" : "900px")};

    margin: 0 auto;
  }
  .card-container {
    width: auto;

    animation: ${animate_show} 0.3s ease-out;
    .card-header,
    .card-footer {
      background-color: ${COLORS.gray[100]};
    }
    }
  }
`

const Container = React.forwardRef(({ children, small }, ref) => (
  <StyledContainer ref={ref} small={small} className="modal-matera-container">
    {children}
  </StyledContainer>
))

Container.propTypes = {
  children: PropTypes.node.isRequired,
  small: PropTypes.bool,
}

export { Container }
