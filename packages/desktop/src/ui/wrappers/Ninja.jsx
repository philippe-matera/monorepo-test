import PropTypes from 'prop-types'
import {forwardRef} from 'react'
import styled from 'styled-components'

const StyledNinja = styled.span`
  display: contents;

  ${({ hidden }) => hidden && 'visibility: hidden;'}
`

const Ninja = forwardRef((props, ref) => (
  <StyledNinja className="ninja" {...props} ref={ref} />
))

Ninja.propTypes = {
  hidden: PropTypes.bool,
  as: PropTypes.string,
}

Ninja.defaultProps = {
  hidden: false,
  as: 'span',
}

export { Ninja }
