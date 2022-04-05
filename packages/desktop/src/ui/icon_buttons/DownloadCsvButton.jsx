import PropTypes from 'prop-types'
import React from 'react'

import useTranslation from 'hooks/useTranslation'
import { withBaseTranslationContext } from 'shared/withBaseTranslationContext'
import { Button } from 'ui/buttons/Button'

const TranslatedDownloadCsvButton = ({ button_title, tooltip_text, hide_tooltip, ...props }) => {
  const { t } = useTranslation('general')
  const tooltip = !hide_tooltip && { text: tooltip_text || t('general:download_csv_button') }

  return (
    <Button color="default" tooltip={tooltip} target_blank {...props}>
      {button_title || props.children || t('general:csv')}
    </Button>
  )
}

TranslatedDownloadCsvButton.propTypes = {
  tooltip_text: PropTypes.string,
  hide_tooltip: PropTypes.bool,
  button_title: PropTypes.string,
  sm: PropTypes.bool,
  children: PropTypes.node,
}

TranslatedDownloadCsvButton.defaultProps = {
  sm: true,
}

export const DownloadCsvButton = withBaseTranslationContext(TranslatedDownloadCsvButton)
