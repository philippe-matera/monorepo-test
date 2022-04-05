import PropTypes from 'prop-types'
import React from 'react'

import useTranslation from 'hooks/useTranslation'
import { withBaseTranslationContext } from 'shared/withBaseTranslationContext'
import { IconButton } from 'ui/icon_buttons/components/IconButton'

const TranslatedDownloadFileButton = ({ tooltip_text, ...props }) => {
  const { t } = useTranslation('general')

  return (
    <IconButton
      icon="cloud_download"
      tooltip_text={tooltip_text || t('general:download_file_button')}
      target_blank
      {...props}
    />
  )
}

TranslatedDownloadFileButton.propTypes = {
  tooltip_text: PropTypes.string,
}

export const DownloadFileButton = withBaseTranslationContext(TranslatedDownloadFileButton)
