import PropTypes from 'prop-types'
import React from 'react'

import useTranslation from 'hooks/useTranslation'
import { withBaseTranslationContext } from 'shared/withBaseTranslationContext'
import { IconButton } from 'ui/icon_buttons/components/IconButton'

const TranslatedAddButton = ({ tooltip_text, ...props }) => {
  const { t } = useTranslation('general')

  return (
    <IconButton icon="plus" tooltip_text={tooltip_text || t('general:add_button')} {...props} />
  )
}

TranslatedAddButton.propTypes = {
  tooltip_text: PropTypes.string,
}

export const AddButton = withBaseTranslationContext(TranslatedAddButton)
