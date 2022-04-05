import { COLORS } from '@matera-tech/utils'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { CONSTANTS } from '../constants'

const Text = styled.span`
  ${({ muted }) => muted && `color: ${COLORS.gray[800]};`}
  ${({ crossed }) => crossed && 'text-decoration: line-through;'}
  ${({ underlined }) => underlined && 'text-decoration: underline;'}
  ${({ bold }) => bold && 'font-weight: bold;'}
  ${({ weight }) => weight && `font-weight: ${weight};`}
  ${({ italic }) => italic && 'font-style: italic;'}
  ${({ color, intensity = 'normal' }) => COLORS[color] && `color: ${COLORS[color][intensity]};`}
  ${({ size }) =>
    CONSTANTS.font[size] &&
    `font-size: ${CONSTANTS.font[size].fs};line-height: ${CONSTANTS.font[size].lh};`}
  ${({ highlighted }) => highlighted && `background-color: ${COLORS[highlighted].light};`}
  ${({ word_break }) => word_break && 'word-break: break-word;'}
`

const prop_types = {
  size: PropTypes.string,
  intensity: PropTypes.string,
  weight: PropTypes.string,
  small: PropTypes.bool,
  muted: PropTypes.bool,
  crossed: PropTypes.bool,
  underlined: PropTypes.bool,
  bold: PropTypes.bool,
  italic: PropTypes.bool,
  word_break: PropTypes.bool,
  block: PropTypes.bool,
  color: PropTypes.oneOf(['danger', 'primary', 'success', 'admin']),
  highlighted: PropTypes.oneOf(['success']),
}
Text.propTypes = prop_types

const default_props = {
  muted: false,
  intensity: 'normal',
  crossed: false,
  underlined: false,
  bold: false,
  italic: false,
  word_break: false,
  block: false,
}
Text.defaultProps = default_props

const StorybookText = props => <Text {...props} />
StorybookText.defaultProps = default_props
StorybookText.propTypes = prop_types

export { Text, StorybookText }
