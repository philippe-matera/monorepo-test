import PropTypes from 'prop-types'
import React from 'react'

import useTranslation from 'hooks/useTranslation'
import { withBaseTranslationContext } from 'shared/withBaseTranslationContext'
import { IconButton } from 'ui/icon_buttons/components/IconButton'

const TranslatedEditButton = ({ tooltip_text, ...props }) => {
  const { t } = useTranslation('general')

  return (
    <IconButton icon="pencil" tooltip_text={tooltip_text || t('general:edit_button')} {...props} />
  )
}

TranslatedEditButton.propTypes = {
  tooltip_text: PropTypes.string,
}

export const EditButton = withBaseTranslationContext(TranslatedEditButton)
