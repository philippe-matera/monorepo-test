import PropTypes from 'prop-types'
import styled from 'styled-components'

import { CONSTANTS } from 'src/constants'

const Block = styled.div`
  ${({ inline }) => inline && 'display: inline-block;'}

  ${({ all }) => all && `margin: ${CONSTANTS.spacing[all]};`}
  ${({ top }) => top && `margin-top: ${CONSTANTS.spacing[top]};`}
  ${({ right }) => right && `margin-right: ${CONSTANTS.spacing[right]};`}
  ${({ bottom }) => bottom && `margin-bottom: ${CONSTANTS.spacing[bottom]};`}
  ${({ left }) => left && `margin-left: ${CONSTANTS.spacing[left]};`}

  ${({ righted }) => righted && 'text-align: right;'}
  ${({ centered }) => centered && 'text-align: center;'}
  ${({ lefted }) => lefted && 'text-align: left;'}
  ${({ justified }) => justified && 'text-align: justify;'}
  ${({ pull_right }) => pull_right && 'float: right;'}
  ${({ pull_left }) => pull_left && 'float: left;'}

  ${({ grid_full_width }) => grid_full_width && `grid-column: 1 / -1;`}
  ${({ vertical_centered }) => vertical_centered && 'vertical-align: middle;'}
`

Block.propTypes = {
  all: PropTypes.string,
  top: PropTypes.string,
  bottom: PropTypes.string,
  right: PropTypes.string,
  left: PropTypes.string,
  inline: PropTypes.bool,
}

Block.defaultProps = {
  inline: false,
}

export { Block }
