import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { CONSTANTS } from 'src/constants'
import { DynamicTitle } from 'ui/typography/Title'
import { Block } from 'ui/wrappers/Block'

const StyledContainer = styled.div`
  display: flex;

  flex-direction: column;
  align-items: center;
`

const StyledImg = styled.img`
  max-height: 72px;

  margin-bottom: ${CONSTANTS.spacing.s};
  object-fit: contain;
`

const Empty = ({ title, title_size, subtitle, image_src, image_alt, children }) => (
  <StyledContainer>
    {image_src && <StyledImg src={image_src} alt={image_alt} />}

    <DynamicTitle size={title_size}>{title}</DynamicTitle>

    {subtitle && (
      <Block top="xs" centered>
        {subtitle}
      </Block>
    )}

    {children && <Block top="xs">{children}</Block>}
  </StyledContainer>
)

Empty.propTypes = {
  title: PropTypes.string.isRequired,
  title_size: PropTypes.oneOf(['2', '3', '4', '5', '6']),
  subtitle: PropTypes.string,
  image_src: PropTypes.string,
  image_alt: PropTypes.string,
  children: PropTypes.node,
}

Empty.defaultProps = {
  title_size: '6',
}

export { Empty }
