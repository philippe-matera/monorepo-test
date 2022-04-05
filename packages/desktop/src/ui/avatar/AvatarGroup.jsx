import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { CONSTANTS } from 'src/constants'
import { Avatar } from 'src/ui/avatar/Avatar'

const DEFAULT_MAX_AVATARS = 5

const StyledGroup = styled.div`
  .tooltip-avatar:not(:first-child) > .grouped-avatar {
    outline: 2px white solid;
    margin-left: -${CONSTANTS.spacing.xs};
  }
  .span {
    display: inline-block;
    vertical-align: top;
  }
`

const AvatarGroup = ({ avatars, size }) => {
  const has_counter = avatars.length > DEFAULT_MAX_AVATARS
  const tooltips = []
  if (has_counter) {
    avatars.slice(DEFAULT_MAX_AVATARS).forEach(avatar => {
      tooltips.push(avatar.full_name)
    })
  }

  return (
    <StyledGroup>
      {/* +boolean returns 1 if true, 0 if false */}
      {avatars.slice(0, DEFAULT_MAX_AVATARS - +has_counter).map(avatar => {
        if (avatar.src.includes('ui-avatars')) {
          const avatar_src =
            avatar.first_name?.[0] + avatar.last_name?.[0] || avatar.name?.[0] || ''
          avatar.src = `${avatar_src}`.toUpperCase()
        }

        return (
          <Avatar
            className="grouped-avatar"
            key={avatar.src}
            src={avatar.src}
            xs={size === 'small'}
            textual={avatar.src.length === 2}
            tooltip_text={avatar.full_name}
          />
        )
      })}
      {has_counter && (
        <Avatar
          className="grouped-avatar"
          src={`+${avatars.length - DEFAULT_MAX_AVATARS}`}
          xs={size === 'small'}
          textual={has_counter}
          tooltip_text={tooltips.map(name => (
            <div key={name}>{name}</div>
          ))}
        />
      )}
    </StyledGroup>
  )
}

AvatarGroup.propTypes = {
  avatars: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      full_name: PropTypes.string.isRequired,
    }),
  ),
  size: PropTypes.oneOf(['small', '']),
}

AvatarGroup.defaultProps = {
  avatars: [],
  size: '',
}

export { AvatarGroup }
