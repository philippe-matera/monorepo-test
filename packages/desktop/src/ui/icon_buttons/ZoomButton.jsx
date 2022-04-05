import PropTypes from 'prop-types'
import React from 'react'

import useTranslation from 'hooks/useTranslation'
import { withBaseTranslationContext } from 'shared/withBaseTranslationContext'
import { IconButton } from 'ui/icon_buttons/components/IconButton'

const TranslatedZoomButton = ({ tooltip_text, direction, ...props }) => {
  const { t } = useTranslation('general')

  return (
    <IconButton
      icon={direction === 'in' ? 'search_plus' : 'search_minus'}
      tooltip_text={tooltip_text || t(`general:buttons.zoom.${direction}`)}
      {...props}
    />
  )
}

TranslatedZoomButton.propTypes = {
  tooltip_text: PropTypes.string,
  direction: PropTypes.oneOf(['in', 'out']).isRequired,
}

export const ZoomButton = withBaseTranslationContext(TranslatedZoomButton)
