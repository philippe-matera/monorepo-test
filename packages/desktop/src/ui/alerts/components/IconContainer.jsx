import styled from 'styled-components'

export const IconContainer = styled.div`
  display: flex;
  position: relative;

  align-items: center;
  justify-content: center;

  width: 56px;
  height: 56px;

  margin: 0 auto 16px;

  font-family: inherit;
  line-height: 2.5em;
  box-sizing: content-box;
  zoom: normal;
  border-radius: 50%;
  cursor: default;
  user-select: none;

  ::before {
    display: flex;

    align-items: center;

    height: 92%;

    font-size: 3.75em;
  }
`
