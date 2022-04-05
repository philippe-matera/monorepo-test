import { COLORS } from '@matera-tech/utils'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const COLOR_LEVEL = {
  primary: 'normal',
  warning: 'dark',
  danger: 'dark',
  success: 'dark',
  gray: 'normal',
  admin: 'normal',
  white: 'normal',
}

const Tag = styled.span`
  display: inline;

  padding: ${({ large }) => (large ? "4px 8px" : "2.5px 8px")};

  background-color: ${({ color, background_color }) =>
    (background_color &&
      (background_color === "gray" ? COLORS.gray[200] : `${COLORS[background_color].lighter}`)) ||
    (color === "gray" ? COLORS.gray[200] : `${COLORS[color].lighter}`)};

  font-size: 16px;
  color: ${({ color }) =>
    color === "gray" ? COLORS.gray[800] : COLORS[color][COLOR_LEVEL[color]]};
  line-height: 24px;
  text-align: center;
  font-weight: 500;

  text-shadow: none;
  white-space: nowrap;
  vertical-align: baseline;

  border-radius: 4px;
  user-select: none;

  &:empty {
    display: none;
  }
`

Tag.defaultProps = {
  large: false,
}

Tag.propTypes = {
  color: PropTypes.oneOf(Object.keys(COLOR_LEVEL)).isRequired,
  background_color: PropTypes.oneOf(Object.keys(COLOR_LEVEL)).isRequired,
  large: PropTypes.bool,
}

export { Tag, COLOR_LEVEL }
