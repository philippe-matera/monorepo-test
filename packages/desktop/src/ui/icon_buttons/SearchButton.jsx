import PropTypes from 'prop-types'
import React from 'react'

import useTranslation from 'hooks/useTranslation'
import { withBaseTranslationContext } from 'shared/withBaseTranslationContext'
import { IconButton } from 'ui/icon_buttons/components/IconButton'

const TranslatedSearchButton = ({ tooltip_text, ...props }) => {
  const { t } = useTranslation('general')

  return (
    <IconButton
      icon="search"
      tooltip_text={tooltip_text || t('general:search_button')}
      {...props}
    />
  )
}

TranslatedSearchButton.propTypes = {
  tooltip_text: PropTypes.string,
}

export const SearchButton = withBaseTranslationContext(TranslatedSearchButton)
