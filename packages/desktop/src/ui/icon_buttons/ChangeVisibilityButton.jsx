import PropTypes from 'prop-types'
import React from 'react'

import useTranslation from 'hooks/useTranslation'
import { withBaseTranslationContext } from 'shared/withBaseTranslationContext'
import { IconButton } from 'ui/icon_buttons/components/IconButton'

const TranslatedChangeVisibilityButton = ({ visible, tooltip_text, ...props }) => {
  const { t } = useTranslation('general')
  const icon = visible ? 'eye' : 'eye_slash'

  return (
    <IconButton
      icon={icon}
      tooltip_text={tooltip_text || t('general:change_visibility_button')}
      {...props}
    />
  )
}

TranslatedChangeVisibilityButton.propTypes = {
  tooltip_text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  visible: PropTypes.bool.isRequired,
}

export const ChangeVisibilityButton = withBaseTranslationContext(TranslatedChangeVisibilityButton)
