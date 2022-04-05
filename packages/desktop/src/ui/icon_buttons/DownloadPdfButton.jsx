import PropTypes from 'prop-types'
import React from 'react'

import useTranslation from 'hooks/useTranslation'
import { withBaseTranslationContext } from 'shared/withBaseTranslationContext'
import { Button } from 'ui/buttons/Button'

const TranslatedDownloadPdfButton = ({ label, tooltip_text, children, ...button_props }) => {
  const { t } = useTranslation('general')

  return (
    <Button
      color="default"
      tooltip={{ text: tooltip_text || t('general:download_pdf_button') }}
      target_blank
      sm
      {...button_props}
    >
      {label || children || t('general:pdf')}
    </Button>
  )
}

TranslatedDownloadPdfButton.propTypes = {
  label: PropTypes.string,
  tooltip_text: PropTypes.string,
  children: PropTypes.string,
}

export const DownloadPdfButton = withBaseTranslationContext(TranslatedDownloadPdfButton)
