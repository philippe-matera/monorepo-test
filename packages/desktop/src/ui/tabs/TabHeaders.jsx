import { COLORS } from '@matera-tech/utils'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { CONSTANTS } from 'src/constants'
import { Flex } from 'ui/flex/Flex'
import { TabHeader } from 'ui/tabs/components/TabHeader'

const StyledTabHeaders = styled.ul`
  list-style: none;

  margin-bottom: 0;
  padding-left: 0;
  overflow-x: auto;
  overflow-x: overlay;
  white-space: nowrap;

  ${({ sticky_left }) => sticky_left && '& > button:first-child > li { padding-left: 0 }'}
  & > a:not(:first-child) > li {
    padding-left: 16px;
  }
  & > a:not(:last-child) > li {
    padding-right: 16px;
  }
`
const Container = styled(Flex)`
  border-bottom: 1px solid ${COLORS.gray[300]};
  padding: ${CONSTANTS.spacing.xs} 0px 0px
    ${({ sticky_left }) => (sticky_left ? "0px" : CONSTANTS.spacing.m)};
`
const TabHeaders = ({ headers, right_content, centered, sticky_left }) => (
  <Container
    align_items="center"
    sticky_left={sticky_left}
    justify_content={centered ? 'center' : 'space-between'}
  >
    <StyledTabHeaders sticky_left={sticky_left} id="tab-headers">
      {headers.map(header => (
        <TabHeader key={header.key} tab_key={header.key} {...header} />
      ))}
    </StyledTabHeaders>

    {right_content}
  </Container>
)

TabHeaders.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  right_content: PropTypes.node,
  centered: PropTypes.bool,
  sticky_left: PropTypes.bool,
}

TabHeaders.defaultProps = {
  centered: false,
  sticky_left: false,
}

export { TabHeaders }
