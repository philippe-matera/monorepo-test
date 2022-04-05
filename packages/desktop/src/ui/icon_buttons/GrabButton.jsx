import PropTypes from 'prop-types'
import React from 'react'

import useTranslation from 'hooks/useTranslation'
import { withBaseTranslationContext } from 'shared/withBaseTranslationContext'
import { IconButton } from 'ui/icon_buttons/components/IconButton'

const TranslatedGrabButton = ({ tooltip_text, ...props }) => {
  const { t } = useTranslation('general')

  return (
    <IconButton
      icon="drag_indicator"
      tooltip_text={tooltip_text || t('general:grab_button')}
      cursor="grab"
      {...props}
    />
  )
}

TranslatedGrabButton.propTypes = {
  tooltip_text: PropTypes.string,
}

export const GrabButton = withBaseTranslationContext(TranslatedGrabButton)
