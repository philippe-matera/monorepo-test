import PropTypes from 'prop-types'
import React from 'react'

import useTranslation from 'hooks/useTranslation'
import { withBaseTranslationContext } from 'shared/withBaseTranslationContext'
import { IconButton } from 'ui/icon_buttons/components/IconButton'

const TranslatedUploadButton = ({ tooltip_text, ...props }) => {
  const { t } = useTranslation('general')

  return (
    <IconButton
      icon="upload"
      tooltip_text={tooltip_text || t('general:upload_button')}
      {...props}
    />
  )
}

TranslatedUploadButton.propTypes = {
  tooltip_text: PropTypes.string,
}

export const UploadButton = withBaseTranslationContext(TranslatedUploadButton)
