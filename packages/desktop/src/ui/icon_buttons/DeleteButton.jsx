import PropTypes from 'prop-types'
import React, { useCallback } from 'react'

import { useAlert } from 'hooks/useAlert'
import useTranslation from 'hooks/useTranslation'
import { withBaseTranslationContext } from 'shared/withBaseTranslationContext'
import { IconButton } from 'ui/icon_buttons/components/IconButton'

const TranslatedDeleteButton = ({ tooltip_text, confirm, onClick, stop_propagation, ...props }) => {
  const { t } = useTranslation('general')
  const { confirmAlert } = useAlert()
  const onButtonClick = useCallback(
    e => {
      if (stop_propagation) e.stopPropagation()

      if (confirm) {
        confirmAlert(
          confirm.title,
          confirm.confirm_text || t('general:delete_button.delete_confirm'),
          () => onClick(e),
          {
            text: confirm.text,
          },
        )
      } else {
        onClick(e)
      }
    },
    [confirm, onClick, stop_propagation, t, confirmAlert],
  )

  return (
    <IconButton
      icon="trash"
      tooltip_text={tooltip_text || t('general:delete_button.delete')}
      onClick={onButtonClick}
      {...props}
    />
  )
}

TranslatedDeleteButton.propTypes = {
  tooltip_text: PropTypes.string,
  confirm: PropTypes.shape({
    title: PropTypes.string.isRequired,
    text: PropTypes.string,
    confirm_text: PropTypes.string,
  }),
  onClick: PropTypes.func.isRequired,
  stop_propagation: PropTypes.bool,
}

TranslatedDeleteButton.defaultProps = {
  stop_propagation: false,
}

export const DeleteButton = withBaseTranslationContext(TranslatedDeleteButton)
