import React from 'react'
import styled from 'styled-components'

const StyledIframe = styled.iframe`
  width: 100%;
  height: 100%;
  min-height: 80vh;
`

const Iframe = props => <StyledIframe {...props} />

Iframe.propTypes = {}

export { Iframe }
