import PropTypes from 'prop-types'
import styled from 'styled-components'

import { CONSTANTS } from 'src/constants'

const PanelBody = styled.div`
  padding: 15px;

  ${({ soft }) =>
    soft &&
    `
      padding: 0px 15px 15px 15px;
    `};

  ${({ fixedHeight }) =>
    fixedHeight &&
    `
    overflow-y: scroll;
    height: calc(38vh - (${CONSTANTS.layout.action_bar_height} + 60px));
    `};

  ${({ fixedHeight2x }) =>
    fixedHeight2x &&
    `
    height: calc(88vh - (${CONSTANTS.layout.action_bar_height}));
    `};
`

PanelBody.propTypes = {
  soft: PropTypes.bool,
  fixedHeight: PropTypes.bool,
  fixedHeight2x: PropTypes.bool,
}

export { PanelBody }
