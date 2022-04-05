import { COLORS } from '@matera-tech/utils'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const Text = styled.span`
  ${({ small }) =>
    small &&
    `
    font-size: 14px;
    line-height: 20px;
  `}
  ${({ muted }) => muted && `color: ${COLORS.gray[800]};`}
  ${({ crossed }) => crossed && 'text-decoration: line-through;'}
  ${({ underlined }) => underlined && 'text-decoration: underline;'}
  ${({ bold }) => bold && 'font-weight: bold;'}
  ${({ italic }) => italic && 'font-style: italic;'}
  ${({ color }) => color && COLORS[color] && `color: ${COLORS[color].normal};`}
  ${({ block }) => block && 'display: block;'}
  ${({ highlighted }) => highlighted && `background-color: ${COLORS[highlighted].light};`}
  ${({ word_break }) => word_break && 'word-break: break-word;'}
`

const prop_types = {
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
  small: false,
  muted: false,
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
