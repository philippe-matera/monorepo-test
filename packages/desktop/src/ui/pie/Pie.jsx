import { COLORS } from '@matera-tech/utils'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import _ from 'underscore'

import useAsyncState from 'hooks/useAsyncState'
import { toPercentage } from 'lib/numeral'
import { Text } from 'ui/typography/Text'

const Percentage = styled.span`
  position: absolute;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const Container = styled.div`
  position: relative;
  ${({ size }) =>
    size &&
    `
    height: ${size}px;
    width: ${size}px;
  `}
`

const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  }
}

const describeArc = (x, y, radius, startAngle, endAngle) => {
  const start = polarToCartesian(x, y, radius, endAngle)
  const end = polarToCartesian(x, y, radius, startAngle)

  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'

  return ['M', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(' ')
}

const Pie = ({ percentage, thresholds, size }) => {
  const [color, color_loading, setColor] = useAsyncState(null)
  // modifying a number won't change the original one
  // eslint-disable-next-line no-param-reassign
  if (percentage < 0) percentage = 0

  useEffect(() => {
    _.sortBy(thresholds, 'percentage').forEach(threshold => {
      if (percentage >= threshold.percentage) setColor(threshold.color)
    })
  }, [thresholds, color, percentage, setColor])

  return (
    !color_loading && (
      <Container size={size}>
        <Percentage centered>
          <Text color={color}>{toPercentage(percentage * 100, { precision: 0 })}</Text>
        </Percentage>
        <svg height={size} width={size}>
          {percentage > 0.99 ? (
            <circle
              cx={size / 2}
              cy={size / 2}
              r={size / 3}
              stroke={COLORS[color].light}
              strokeWidth="15"
              fill="none"
            />
          ) : (
            <>
              <circle
                cx={size / 2}
                cy={size / 2}
                r={size / 3}
                stroke={COLORS.gray[400]}
                strokeWidth="15"
                fill="none"
              />
              <path
                fill="none"
                stroke={COLORS[color].light}
                strokeWidth="15"
                d={describeArc(size / 2, size / 2, size / 3, 0, percentage * 360)}
              />
            </>
          )}
        </svg>
      </Container>
    )
  )
}

Pie.defaultProps = {
  size: 98,
  thresholds: [
    { percentage: 0.76, color: 'success' },
    { percentage: 0.33, color: 'warning' },
    { percentage: 0, color: 'danger' },
  ],
}

Pie.propTypes = {
  percentage: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  thresholds: PropTypes.array,
  size: PropTypes.number,
}

export { Pie }
