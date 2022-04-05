import styled from 'styled-components'

export const Layout11 = styled.div`
  display: grid;

  @media (max-width: 992px) {
    row-gap: 16px;

    grid-template-columns: 100%;
    column-gap: 8px;
  }

  @media (min-width: 992px) {
    row-gap: 32px;

    grid-template-columns: calc(50% - 20px) calc(50% - 20px);
    column-gap: 40px;
  }
`
