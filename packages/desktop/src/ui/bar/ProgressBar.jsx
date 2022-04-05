import { COLORS } from '@matera-tech/utils'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { CONSTANTS } from 'src/constants'
import { Block } from 'ui/wrappers/Block'

const ProgressBar = ({
  progress,
  height = 's',
  color = 'primary',
  color_level = 'normal',
  round = false,
}) => {
  const size = CONSTANTS.spacing[height]
  const BackgroundBlock = styled(Block)`
    height: ${size};

    background-color: ${COLORS.gray[200]};
    ${round && `border-radius: ${size}`};
  `

  const ProgressBlock = styled(Block)`
    width: ${progress}%;
    height: ${size};

    background-color: ${COLORS[color][color_level]};
    ${round && `border-radius: ${size}`};
  `

  return (
    <BackgroundBlock>
      <ProgressBlock />
    </BackgroundBlock>
  )
}

ProgressBar.propTypes = {
  color: PropTypes.oneOf(['primary', 'warning', 'danger', 'success', 'admin']),
  color_level: PropTypes.oneOf(['lighter', 'light', 'normal', 'dark', 'darker']),
  height: PropTypes.oneOf(['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl']),
  progress: PropTypes.number.isRequired,
  round: PropTypes.bool,
}

ProgressBar.defaultProps = {
  color: 'primary',
  color_level: 'normal',
  height: 's',
  round: false,
}

export { ProgressBar }
