import { FileExcelBox } from '@mdi/react'
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
  color: #217346;
`

const ExcelPreview = ({ name }) => (
  <StyledBlock>
    <StyledText>
      <Icon space_after path={FileExcelBox} />
    </StyledText>
    {name}
  </StyledBlock>
)

ExcelPreview.propTypes = {
  name: PropTypes.string.isRequired,
}

export { ExcelPreview }
