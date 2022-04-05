import styled from 'styled-components'

export const Layout21 = styled.div`
  display: grid;

  @media (max-width: 992px) {
    row-gap: 16px;

    grid-template-columns: 100%;
    column-gap: 8px;
  }

  @media (min-width: 992px) {
    row-gap: 32px;

    grid-template-columns: calc(66.66% - 26.66px) calc(33.33% - 13.33px);
    column-gap: 40px;
  }
`
