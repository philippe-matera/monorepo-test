import { COLORS } from '@matera-tech/utils'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { CONSTANTS } from 'src/constants'
import { ButtonsWrapper } from 'ui/wrappers/ButtonsWrapper'

const StyledPageFooter = styled.div`
  position: fixed;
  width: 100%;
  bottom: ${CONSTANTS.layout.footer_menu_height};
  z-index: 2;
  ${({ border }) => border && `border-top: 1px solid ${COLORS.gray[400]};`}

  margin-left: -${CONSTANTS.spacing.s};
  margin-right: -${CONSTANTS.spacing.s};
  margin-top: ${CONSTANTS.spacing.l};
  padding: ${CONSTANTS.spacing.xs} ${CONSTANTS.spacing.m};

  background-color: white;
  box-shadow: 0px 4px 12px ${COLORS.gray[1000]}0D;

  ${ButtonsWrapper} {
    & > *:not(.tooltip-wrapper):not(.ninja),
    & > .tooltip-wrapper > *,
    & > .ninja > * {
      margin-top: 0;
    }
  }

  @media (min-width: 992px) {
    bottom: 0;
    width: calc(100% - ${CONSTANTS.layout.menu_width});
    margin-left: -${CONSTANTS.spacing.xl};
    margin-right: -${CONSTANTS.spacing.xl};
  }
`

const Content = styled.div`
  max-width: 1280px;

  margin: 0 auto;
`

const PageFooter = ({ children, max_width, ...props }) => {
  const content = max_width ? <Content>{children}</Content> : children

  return <StyledPageFooter {...props}>{content}</StyledPageFooter>
}

PageFooter.propTypes = {
  children: PropTypes.node.isRequired,
  max_width: PropTypes.bool,
}

PageFooter.defaultProps = {
  max_width: false,
}

export { PageFooter, StyledPageFooter }
