import styled from 'styled-components'

export const Label = styled.span`
  font-weight: 400;

  display: block;

  text-align: center;
  float: right;

  width: 118px;

  margin-top: 32px;
  margin-right: -72px;

  ${({ active }) =>
    active &&
    `
    text-shadow: .4px 0 0; // bold effect
  `}

  ${({ active, onClick }) =>
    !active &&
    `

      @media (max-width: 992px) {
        display: none;
      }

      ${
        !!onClick &&
        `
        cursor: pointer;
      `
      }

    `}
`
