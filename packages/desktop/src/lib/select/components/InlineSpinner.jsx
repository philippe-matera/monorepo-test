import PropTypes from 'prop-types'
import React from 'react'
import { BarLoader } from 'react-spinners'

const InlineSpinner = ({
  height,
  width: widthProps,
  color,
  wide,
  position,
  containerClassName,
  containerStyle,
}) => {
  let width = widthProps
  if (!width && wide) width = 240
  else if (!width) width = 120

  let left
  if (position === 'right') left = `calc(100% - ${width}px)`
  else if (position === 'left') left = 0
  else left = `calc(50% - ${width / 2}px)`

  const spinner_style = {
    position: 'relative',
    left,
    width: '45%',
    top: `calc(50% - ${height / 2}px)`,
  }

  let content = (
    <div style={spinner_style}>
      <BarLoader color={color} height={height} width={width} />
    </div>
  )
  if (containerClassName || containerStyle) {
    content = (
      <div className={containerClassName} style={containerStyle}>
        {content}
      </div>
    )
  }

  return content
}
InlineSpinner.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  color: PropTypes.string,
  wide: PropTypes.bool,
  position: PropTypes.oneOf(['center', 'right', 'left']),
  containerClassName: PropTypes.string,
  containerStyle: PropTypes.object, // eslint-disable-line react/forbid-prop-types
}
InlineSpinner.defaultProps = {
  height: 10,
  color: '#32b796',
  wide: false,
  position: 'center',
  containerClassName: null,
  containerStyle: null,
}

export { InlineSpinner }
