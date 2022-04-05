import { COLORS } from '@matera-tech/utils'
import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Tooltip } from 'react-tippy'
import styled from 'styled-components'

import { Icon } from 'ui/icons/Icon'

const StyledListItem = styled.li`
  font-size: 16px;
  text-decoration: none;

  display: block !important;

  color: ${COLORS.gray[1000]};

  ${props =>
    !props.disabled &&
    (props.href || props.to) &&
    `
      cursor: pointer;

      &:hover {
        text-decoration: none !important;
        color: ${COLORS.primary.dark};
      }

      &:active, &:focus {
        color: ${COLORS.primary.darker};
      }
    `}

  ${props =>
    props.disabled &&
    `
      color: ${COLORS.gray[600]};
      cursor: not-allowed;
    `}
`

const StyledIcon = styled(Icon)`
  color: ${COLORS.gray[600]};

  ${({ done }) => done && `color: ${COLORS.success.normal}`}
`

const ListItem = ({ as, content, disabled, done, href, onClick, to, tooltip }) => {
  const AsComponent = useMemo(() => {
    if (as) return as
    if (to && !disabled) return Link
    else if (href && !disabled) return 'a'

    return 'li'
  }, [as, disabled, to, href])

  return (
    <StyledListItem
      as={AsComponent}
      disabled={disabled}
      done={done}
      href={href}
      onClick={onClick}
      to={to}
    >
      <StyledIcon name="check_circle" space_after outlined={false} done={done} />
      {tooltip ? <Tooltip text={tooltip}>{content}</Tooltip> : content}
    </StyledListItem>
  )
}

ListItem.propTypes = {
  as: PropTypes.string,
  to: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  tooltip: PropTypes.string,
  content: PropTypes.string,
  done: PropTypes.bool,
}

ListItem.defaultProps = {
  disabled: false,
}

export { ListItem }
