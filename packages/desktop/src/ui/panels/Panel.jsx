import { COLORS } from '@matera-tech/utils'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { CONSTANTS } from 'src/constants'
import { PanelBody } from 'ui/panels/components/PanelBody'
import { PanelTitle } from 'ui/panels/components/PanelTitle'

const StyledPanel = styled.div`
  margin-bottom: ${CONSTANTS.layout.line_height_computed}px;
  border: 1px solid;
  border-color: ${({ color }) => COLORS[color].normal || "inherit"};

  background-color: #fff;

  font-size: 13px;
  border-radius: 4px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
`

const Panel = ({ title, ...props }) => {
  const { id, color, children, margin, className } = props

  return (
    <StyledPanel id={id} color={color} className={`${margin} ${className}`}>
      {title && <PanelTitle {...props} title={title} />}
      <PanelBody {...props}>{children}</PanelBody>
    </StyledPanel>
  )
}

Panel.defaultProps = {
  color: 'default',
  margin: 'm-t',
  className: '',
}

Panel.propTypes = {
  id: PropTypes.string,
  color: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  margin: PropTypes.string,
  className: PropTypes.string,
}

export { Panel }
