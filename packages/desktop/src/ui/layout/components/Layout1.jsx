import PropTypes from 'prop-types'
import styled from 'styled-components'

import { CONSTANTS } from 'src/constants'

const Layout1 = styled.div`
  display: grid;

  grid-template-columns: 100%;
  grid-template-rows: min-content;

  @media (max-width: 992px) {
    row-gap: ${CONSTANTS.spacing.s};
  }

  @media (min-width: 992px) {
    ${({ row_gap }) => `row-gap: ${CONSTANTS.spacing[row_gap]}`}
  }
`

Layout1.propTypes = {
  row_gap: PropTypes.oneOf(['s', 'm', 'l', 'xl']),
}

Layout1.defaultProps = {
  row_gap: 'l',
}

export { Layout1 }
