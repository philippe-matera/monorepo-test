import { nanoid } from 'nanoid'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { Flex } from 'ui/flex/Flex'
import { Text } from 'ui/typography/Text'
import { Block } from 'ui/wrappers/Block'

const WIDTH_TO_PX = {
  s: '120px',
  m: '160px',
  l: '200px',
}

const StyledBlock = styled(Block)`
  flex: 1;
  ${({ label_width }) =>
    label_width && `width: ${WIDTH_TO_PX[label_width]};max-width: ${WIDTH_TO_PX[label_width]};`}
`

const Infoblock = ({ rows, label_width }) =>
  rows
    .map(v => ({ ...v, id: nanoid() }))
    .map(
      row =>
        (!row.condition || row.condition()) && (
          <Block key={row.id} bottom="s">
            <Flex justify_content="start" align_items="start">
              <StyledBlock right="s" label_width={label_width}>
                <Text muted>{row.label}</Text>
              </StyledBlock>
              <StyledBlock>{row.value}</StyledBlock>
            </Flex>
          </Block>
        ),
    )

Infoblock.defaultProps = {
  label_width: 'm',
}

Infoblock.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.node.isRequired,
      condition: PropTypes.func,
    }),
  ).isRequired,
  label_width: PropTypes.oneOf(['s', 'm', 'l']),
}

export { Infoblock }
