import { COLORS } from '@matera-tech/utils'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { Icon } from 'ui/icons/Icon'

const Title = styled.div`
  background-color: ${({ color }) => COLORS[color].normal};

  color: ${({ color }) => (color === "default" ? COLORS[color].normal : "white")};

  padding: 10px 15px;
  border-bottom: 1px solid;
  border-color: ${({ color }) => COLORS[color].normal};

  ${({ color, soft }) =>
    soft &&
    `
      background-color: inherit;
      position: relative;
      top: -10px;
      left: 10px;
      display: inline;
      border-bottom: 0;
      padding: 5px 10px;
      color: ${COLORS[color].normal};
      font-weight: bold;
    `};
`

const PanelTitle = ({ id, color, soft, icon, title }) => {
  // ICON
  let icon_html
  if (!soft) {
    if (icon) icon_html = <Icon name={icon} space_after />
    else if (color === 'primary') icon_html = <Icon name="info_circle" space_after />
    else if (color === 'warning') icon_html = <Icon name="exclamation_triangle" space_after />
  }

  return (
    <Title id={id} color={color} soft={soft}>
      {icon_html}
      {title}
    </Title>
  )
}

PanelTitle.propTypes = {
  id: PropTypes.string,
  color: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.string,
  soft: PropTypes.bool,
}

export { PanelTitle }
