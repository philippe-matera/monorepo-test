import { COLORS } from '@matera-tech/utils'
import styled from 'styled-components'

import { CONSTANTS } from '../constants'

// @todo: Gérer le flicker sur le focus
// @todo: Ajouter le background color pour l'erreur
// @todo: Gérer les icons ?
// @todo: Gérer le suffix
// @todo: Transformer en container pour aussi gérer les selects

const StyledContainer = styled.div`
  margin: 0;
  min-height: 40px;
  padding: 1px;
  border: 1px solid ${COLORS.gray[400]};
  border-radius: ${CONSTANTS.spacing.xxs};
  &:focus-within {
    ${({ borderColor }) =>
      borderColor &&
      `
        border-color:${COLORS[borderColor].normal};
        padding: 0px;
        border-width: 2px; background-color: ${
          borderColor === 'danger' && COLORS[borderColor].lighter
        };
    `}
  }
`

// eslint-disable-next-line react/prop-types
const Container = ({ borderColor, children }) => (
  <StyledContainer borderColor={borderColor}>{children}</StyledContainer>
)

export { Container }
