import styled from 'styled-components'

export const DocumentPreview = styled.div`
  width: 100px;
  height: 100px;

  background-size: cover;
  background-position: center;
  ${({ doc_url }) => `background-image: url(${doc_url})`}
`
