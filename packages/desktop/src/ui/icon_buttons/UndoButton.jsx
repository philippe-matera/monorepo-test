import PropTypes from 'prop-types'
import React from 'react'

import useTranslation from 'hooks/useTranslation'
import { withBaseTranslationContext } from 'shared/withBaseTranslationContext'
import { IconButton } from 'ui/icon_buttons/components/IconButton'

const TranslatedUndoButton = ({ tooltip_text, ...props }) => {
  const { t } = useTranslation('general')

  return (
    <IconButton icon="undo" tooltip_text={tooltip_text || t('general:undo_button')} {...props} />
  )
}

TranslatedUndoButton.propTypes = {
  tooltip_text: PropTypes.string,
}

export const UndoButton = withBaseTranslationContext(TranslatedUndoButton)
