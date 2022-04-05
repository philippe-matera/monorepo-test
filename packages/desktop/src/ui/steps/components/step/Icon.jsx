import { COLORS } from '@matera-tech/utils'
import styled from 'styled-components'

export const Icon = styled.div`
  width: 26px;
  height: 26px;

  border: 1px solid ${COLORS.primary.normal};

  background-color: white;

  font-size: 14px;
  color: ${COLORS.primary.normal};
  line-height: 24px;
  text-align: center;

  transition: background-color 0.2s ease;
  transition: color 0.2s ease;
  font-weight: 500;
  border-radius: 26px;
  float: right;
  user-select: none;
  ${({ done }) =>
    done &&
    `
    color: ${COLORS.success.normal};
    border: none;
    background-color: ${COLORS.success.normal}1A;
  `}

  ${({ active }) =>
    active &&
    `
    color: white;
    background-color: ${COLORS.primary.normal};
    border-color: ${COLORS.primary.normal};

  `}

  ${({ disabled, active }) =>
    disabled &&
    `
    color: ${COLORS.gray[600]};
    border-color: ${COLORS.gray[600]};

    ${
      active &&
      `
        color: white;
        background-color: ${COLORS.gray[600]};
        border-color: ${COLORS.gray[600]};
      `
    }
  `}

  ${({ onClick, active }) =>
    !active &&
    !!onClick &&
    `
    cursor: pointer;
  `}

  span {
    position: relative;

    top: -1px;
  }

  i {
    vertical-align: middle;

    margin-top: -2px;
  }
`
