import { COLORS } from '@matera-tech/utils'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const BaseContent = styled.div.withConfig({
  shouldForwardProp: prop => !['divider'].includes(prop),
})`
  overflow: hidden auto;

  &:first-of-type {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  &:last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  ${({ divider }) =>
    divider &&
    `
  &:not(:last-child) {
    &:after {
      content: "";
      display: block;
      border-bottom: 1px solid ${COLORS.gray[400]};
      position: relative;
    }
  }
  `}
`

BaseContent.propTypes = {
  divider: PropTypes.bool,
}

BaseContent.defaultProps = {
  divider: true,
}

export { BaseContent }
