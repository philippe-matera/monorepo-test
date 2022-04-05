import { FilePowerpointBox } from '@mdi/react'
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

const StyledText = styled(Text)`
  color: #d04423;
`

const PowerpointPreview = ({ name }) => (
  <StyledBlock>
    <StyledText>
      <Icon space_after path={FilePowerpointBox} />
    </StyledText>
    {name}
  </StyledBlock>
)

PowerpointPreview.propTypes = {
  name: PropTypes.string.isRequired,
}

export { PowerpointPreview }
