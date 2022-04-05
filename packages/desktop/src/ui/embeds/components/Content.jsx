import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const StyledContent = styled.iframe`
  position: absolute;

  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;

  border: 0;
`

const Content = ({ src, type }) => <StyledContent src={src} type={type} />

Content.propTypes = {
  src: PropTypes.string.isRequired,
  type: PropTypes.string,
}

Content.defaultProps = {
  type: 'application/pdf',
}

export { Content }
