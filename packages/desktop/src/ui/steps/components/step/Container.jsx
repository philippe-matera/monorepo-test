import { COLORS } from '@matera-tech/utils'
import styled from 'styled-components'

export const Container = styled.div`
  display: contents;

  ${({ onClick, active, done }) =>
    !active &&
    !!onClick &&
    `
    :hover > .step-icon {
      border-color: ${COLORS.primary.dark};
      color: ${done ? COLORS.success.dark : COLORS.primary.dark};

      ${
        done &&
        `
        background-color: ${COLORS.success.dark}1A;
      `
      }
    }

    :active > .step-icon {
      border-color: ${COLORS.primary.darker};
      color: ${done ? COLORS.success.darker : COLORS.primary.darker};

      ${
        done &&
        `
        background-color: ${COLORS.success.darker}1A;
      `
      }
    }

    :hover > .step-label {
      color: ${COLORS.primary.dark};
    }

    :active > .step-label {
      color: ${COLORS.primary.darker};
    }
  `}
`
