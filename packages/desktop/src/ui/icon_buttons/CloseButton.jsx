import PropTypes from 'prop-types'
import React from 'react'

import useTranslation from 'hooks/useTranslation'
import { withBaseTranslationContext } from 'shared/withBaseTranslationContext'
import { IconButton } from 'ui/icon_buttons/components/IconButton'

const TranslatedCloseButton = ({ tooltip_text, ...props }) => {
  const { t } = useTranslation('general')

  return (
    <IconButton
      icon="times"
      tooltip_text={tooltip_text || t('general:close_button')}
      lg
      {...props}
    />
  )
}

TranslatedCloseButton.propTypes = {
  tooltip_text: PropTypes.string,
}

export const CloseButton = withBaseTranslationContext(TranslatedCloseButton)
