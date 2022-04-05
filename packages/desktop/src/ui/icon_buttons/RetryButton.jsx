import PropTypes from 'prop-types'
import React from 'react'

import useTranslation from 'hooks/useTranslation'
import { withBaseTranslationContext } from 'shared/withBaseTranslationContext'
import { IconButton } from 'ui/icon_buttons/components/IconButton'

const TranslatedRetryButton = ({ tooltip_text, ...props }) => {
  const { t } = useTranslation('general')

  return (
    <IconButton icon="redo" tooltip_text={tooltip_text || t('general:retry_button')} {...props} />
  )
}

TranslatedRetryButton.propTypes = {
  tooltip_text: PropTypes.string,
}

export const RetryButton = withBaseTranslationContext(TranslatedRetryButton)
