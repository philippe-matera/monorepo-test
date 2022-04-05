import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const StyledPicturePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`

const PicturePreview = ({ name, src }) => <StyledPicturePreview src={src} alt={name} />

PicturePreview.propTypes = {
  src: PropTypes.string.isRequired,
  name: PropTypes.string,
}

export { PicturePreview }
