import PropTypes from 'prop-types'
import React from 'react'

import useTranslation from 'hooks/useTranslation'
import { withBaseTranslationContext } from 'shared/withBaseTranslationContext'
import { IconButton } from 'ui/icon_buttons/components/IconButton'

const TranslatedDisableButton = ({ tooltip_text, ...props }) => {
  const { t } = useTranslation('general')

  return (
    <IconButton icon="ban" tooltip_text={tooltip_text || t('general:disable_button')} {...props} />
  )
}

TranslatedDisableButton.propTypes = {
  tooltip_text: PropTypes.string,
}

export const DisableButton = withBaseTranslationContext(TranslatedDisableButton)
