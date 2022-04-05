import PropTypes from 'prop-types'
import React from 'react'

import useTranslation from 'hooks/useTranslation'
import { withBaseTranslationContext } from 'shared/withBaseTranslationContext'
import { IconButton } from 'ui/icon_buttons/components/IconButton'

const TranslatedCancelButton = ({ tooltip_text, ...props }) => {
  const { t } = useTranslation('general')

  return (
    <IconButton icon="times" tooltip_text={tooltip_text || t('general:cancel_button')} {...props} />
  )
}

TranslatedCancelButton.propTypes = {
  tooltip_text: PropTypes.string,
}

export const CancelButton = withBaseTranslationContext(TranslatedCancelButton)
