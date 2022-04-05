import styled from 'styled-components'

import { CONSTANTS } from 'src/constants'
import { Block } from 'ui/wrappers/Block'

const Item = styled.div`
  margin-top: ${CONSTANTS.spacing.xs};
  &:not(:last-child),
  &:only-child {
    ${({ space_after }) => `
        @media (max-width: ${CONSTANTS.breakpoints.mobile}) {
          margin-right: ${CONSTANTS.spacing.s};
        }
        margin-right: ${CONSTANTS.spacing[space_after]};
      `}
  }

  ${({ ratio, half }) => {
    if (half) {
      return `
        flex: 0.5;
        margin-right: calc(${CONSTANTS.spacing.l} + ${CONSTANTS.spacing.l});
      `
    }
    if (ratio === 0) return 'flex: 0 1 auto;'
    if (!ratio) return 'flex: 1;'

    return `flex: ${ratio};`
  }}
`

const Flex = styled.div`
  ${({ item_wrapper }) =>
    item_wrapper &&
    `
    margin-top: -${CONSTANTS.spacing.xs};
  `}

  display: flex;

  flex-wrap: ${({ no_wrap }) => (no_wrap ? "nowrap" : "wrap")};
  ${({ reverse }) => reverse && `flex-direction: row-reverse;`}
  ${({ direction }) => direction && `flex-direction: ${direction};`}

  ${({ justify_content }) => justify_content && `justify-content: ${justify_content};`}
  ${({ align_items }) => align_items && `align-items: ${align_items};`}

  ${({ flex }) => flex && `flex: ${flex};`}
`

const FixedItem = styled(Block)`
  ${({ min }) =>
    min &&
    `
    flex-basis: 0%;
    flex-grow: 1;
  `}

  ${({ fixed }) =>
    fixed &&
    `
    flex-shrink: 0;
  `}
`

Flex.Item = Item
Flex.FixedItem = FixedItem

Item.defaultProps = {
  space_after: 'l',
}

export { Flex }
