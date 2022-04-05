import PropTypes from 'prop-types'
import React from 'react'

import useTranslation from 'hooks/useTranslation'
import { withBaseTranslationContext } from 'shared/withBaseTranslationContext'
import { IconButton } from 'ui/icon_buttons/components/IconButton'

const TranslatedNewFolderButton = ({ tooltip_text, ...props }) => {
  const { t } = useTranslation('general')

  return (
    <IconButton
      icon="folder_plus"
      tooltip_text={tooltip_text || t('general:new_folder_button')}
      {...props}
    />
  )
}

TranslatedNewFolderButton.propTypes = {
  tooltip_text: PropTypes.string,
}

export const NewFolderButton = withBaseTranslationContext(TranslatedNewFolderButton)
