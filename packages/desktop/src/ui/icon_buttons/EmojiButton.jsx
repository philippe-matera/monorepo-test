import PropTypes from 'prop-types'
import React from 'react'

import useTranslation from 'hooks/useTranslation'
import { withBaseTranslationContext } from 'shared/withBaseTranslationContext'
import { IconButton } from 'ui/icon_buttons/components/IconButton'
import { Block } from 'ui/wrappers/Block'

const TranslatedEmojiButton = props => {
  const { t } = useTranslation('general')

  return (
    <Block inline className="hidden-xs">
      <IconButton
        icon="smile"
        className="inline emoji-toggle"
        tooltip_text={props.tooltip_text || t('general:emoji_button')}
        onClick={props.toggleShowPicker} // eslint-disable-line react/jsx-handler-names
        {...props}
      />
    </Block>
  )
}

TranslatedEmojiButton.propTypes = {
  toggleShowPicker: PropTypes.func.isRequired,
  tooltip_text: PropTypes.string,
}

export const EmojiButton = withBaseTranslationContext(TranslatedEmojiButton)
