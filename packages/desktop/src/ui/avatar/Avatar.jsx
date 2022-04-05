import { COLORS } from '@matera-tech/utils'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { CONSTANTS } from 'src/constants'
import { Tooltip } from 'ui/tooltips/Tooltip'
import { Text } from 'ui/typography/Text'

const FSIZE = {
  xs: 10,
  medium: 24,
  large: 64,
  default: 16,
}

const StyledAvatar = styled.img`
  border-radius: 50%;
  ${({ xs, medium, large, vertical_align }) =>
    `
      width: ${
        CONSTANTS.avatar[(xs && 'xs') || (medium && 'medium') || (large && 'large') || 'default']
      };
      height: ${
        CONSTANTS.avatar[(xs && 'xs') || (medium && 'medium') || (large && 'large') || 'default']
      };
      vertical-align: ${vertical_align};
  `}

  ${({ editable }) =>
    editable &&
    `
    cursor: pointer;
  `}
`

const StyledText = styled.div`
  color: ${COLORS.gray[700]};
  border-radius: 50%;
  font-weight: 500;
  text-align: center;
  user-select: none;
  display: table-caption;

  background-color: ${COLORS.gray[200]};
  ${({ xs, medium, large }) => `
      width: ${
        CONSTANTS.avatar[(xs && 'xs') || (medium && 'medium') || (large && 'large') || 'default']
      };
      height: ${
        CONSTANTS.avatar[(xs && 'xs') || (medium && 'medium') || (large && 'large') || 'default']
      };
      line-height: ${
        CONSTANTS.avatar[(xs && 'xs') || (medium && 'medium') || (large && 'large') || 'default']
      };
      font-size: ${
        FSIZE[(xs && 'xs') || (medium && 'medium') || (large && 'large') || 'default']
      }px;
  `}

  ${({ editable }) =>
    editable &&
    `
    cursor: pointer;
  `}
`

const Avatar = ({ src, textual, tooltip_text, ...props }) => {
  const content = (
    <>
      {textual && (
        <StyledText small={!props.xs} {...props}>
          <Text>{src}</Text>
        </StyledText>
      )}
      {!textual && <StyledAvatar src={src} {...props} />}
    </>
  )
  if (tooltip_text)
    return (
      <Tooltip className="tooltip-avatar" text={tooltip_text}>
        {content}
      </Tooltip>
    )

  return content
}

Avatar.propTypes = {
  src: PropTypes.string.isRequired,
  tooltip_text: PropTypes.string,
  textual: PropTypes.bool,
  large: PropTypes.bool,
  medium: PropTypes.bool,
  xs: PropTypes.bool,
  vertical_align: PropTypes.string,
  editable: PropTypes.bool,
  onClick: PropTypes.func,
}

Avatar.defaultProps = {
  large: false,
  medium: false,
  xs: false,
  editable: false,
}

export { Avatar }
