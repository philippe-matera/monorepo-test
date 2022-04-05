import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { CONSTANTS } from 'src/constants'
import { Link } from 'ui/links/Link'
import { Tooltip } from 'ui/tooltips/Tooltip'
import { Block } from 'ui/wrappers/Block'
import { Ninja } from 'ui/wrappers/Ninja'

const Container = styled.div`
  position: absolute;

  right: 0;
  bottom: ${CONSTANTS.spacing.s};
  left: 0;

  margin: 0 auto;
`

const CheckAllTool = ({ id, color, disabled, tooltip_text, text, checkAll }) => {
  let content = (
    <Link color={color} id={id} disabled={disabled} onClick={checkAll}>
      {text}
    </Link>
  )

  if (tooltip_text) {
    content = <Tooltip text={tooltip_text}>{content}</Tooltip>
  }

  return (
    <>
      <Ninja hidden>
        <Block top="xs">{content}</Block>
      </Ninja>
      <Container>{content}</Container>
    </>
  )
}

CheckAllTool.propTypes = {
  tooltip_text: PropTypes.string,
  text: PropTypes.string,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  checkAll: PropTypes.func.isRequired,
}

CheckAllTool.defaultProps = {
  disabled: false,
}

export { CheckAllTool }
