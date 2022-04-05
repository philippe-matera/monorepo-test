import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { CONSTANTS } from 'src/constants'
import { Text } from 'ui/typography/Text'
import { Block } from 'ui/wrappers/Block'

const Wrapper = styled(Block)`
  width: 160px;

  margin-right: ${CONSTANTS.spacing.s};
`
const LayoutDual = ({ left, right }) => (
  <>
    <Wrapper>
      <Text muted>{left}</Text>
    </Wrapper>
    <Block>{right}</Block>
  </>
)

LayoutDual.propTypes = {
  left: PropTypes.node,
  right: PropTypes.node,
}

LayoutDual.defaultProps = {}

export { LayoutDual }
