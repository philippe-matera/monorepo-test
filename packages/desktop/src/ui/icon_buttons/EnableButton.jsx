import PropTypes from 'prop-types'
import React from 'react'

import useTranslation from 'hooks/useTranslation'
import { withBaseTranslationContext } from 'shared/withBaseTranslationContext'
import { IconButton } from 'ui/icon_buttons/components/IconButton'

const TranslatedEnableButton = ({ tooltip_text, ...props }) => {
  const { t } = useTranslation('general')

  return (
    <IconButton icon="check" tooltip_text={tooltip_text || t('general:enable_button')} {...props} />
  )
}

TranslatedEnableButton.propTypes = {
  tooltip_text: PropTypes.string,
}

export const EnableButton = withBaseTranslationContext(TranslatedEnableButton)
