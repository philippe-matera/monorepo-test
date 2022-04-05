import { COLORS } from '@matera-tech/utils'
import PropTypes from 'prop-types'
import React from 'react'
import styled, { keyframes } from 'styled-components'

const SPINNERCOLORS = {
  white: 'white',
  black: COLORS.gray[700],
  primary: COLORS.primary.normal,
}

const rotation = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(270deg);
  }
`

const turn = keyframes`
  0% {
    stroke-dashoffset: 180;
  }

  50% {
    stroke-dashoffset: 45;
    transform: rotate(135deg);
  }

  100% {
    stroke-dashoffset: 180;
    transform: rotate(450deg);
  }
`

const StyledCircularSpinner = styled.div`
  text-align: center;

  svg {
    ${({ color }) => `stroke: ${SPINNERCOLORS[color]};`}
  }

  .spinner {
    animation: ${rotation} 1.8s linear infinite;
  }
  .circle {
    stroke-dasharray: 180;
    stroke-dashoffset: 0;
    transform-origin: center;

    animation: ${turn} 1.8s ease-in-out infinite;
  }
`

const CircularSpinner = ({ color, xl, size, className }) => {
  const spinner_size = size ? size : xl ? '35px' : '20px' // eslint-disable-line no-nested-ternary

  return (
    <StyledCircularSpinner color={color} className={`circular-spinner ${className}`}>
      <svg
        className="spinner"
        width={spinner_size}
        height={spinner_size}
        viewBox="0 0 66 66"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="circle"
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          cx="33"
          cy="33"
          r="30"
        />
      </svg>
    </StyledCircularSpinner>
  )
}

CircularSpinner.propTypes = {
  size: PropTypes.string,
  color: PropTypes.oneOf(['black', 'white', 'primary']),
  xl: PropTypes.bool,
  className: PropTypes.string,
}

CircularSpinner.defaultProps = {
  color: 'primary',
  xl: false,
  className: '',
}

export { CircularSpinner }
