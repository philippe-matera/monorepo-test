import { PdfBox } from '@mdi/react'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { Icon } from 'ui/icons/Icon'
import { Text } from 'ui/typography/Text'
import { Block } from 'ui/wrappers/Block'

const StyledBlock = styled(Block)`
  width: 100%;
  height: 100%;
`

const PdfPreview = ({ name }) => (
  <StyledBlock>
    <Text color="danger">
      <Icon space_after path={PdfBox} />
    </Text>
    {name}
  </StyledBlock>
)

PdfPreview.propTypes = {
  name: PropTypes.string.isRequired,
}

export { PdfPreview }
