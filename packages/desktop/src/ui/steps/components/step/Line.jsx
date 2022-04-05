import { COLORS } from '@matera-tech/utils'
import styled from 'styled-components'

export const Line = styled.div`
  display: ${props => (props.first ? "none" : "inline-block")};
  position: absolute;

  left: 0;
  width: calc(100% - 46px);

  margin-right: 36px;
  margin-left: 10px;

  ::before {
    content: "";
    display: inline-block;

    width: 100%;
    height: 1px;

    background: ${props => (props.disabled ? COLORS.gray[600] : COLORS.primary.normal)};
    border-radius: 1px;
  }
`
