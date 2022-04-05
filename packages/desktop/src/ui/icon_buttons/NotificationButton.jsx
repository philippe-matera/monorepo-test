import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import useTranslation from 'hooks/useTranslation'
import { withBaseTranslationContext } from 'shared/withBaseTranslationContext'
import { ElementBox } from 'src/layout/action_bar/ElementBox'
import { Icon } from 'ui/icons/Icon'
import { Clickable } from 'ui/links/Clickable'
import { Tooltip } from 'ui/tooltips/Tooltip'
import { Block } from 'ui/wrappers/Block'

const IconContainer = styled(Block)`
  margin-top: 6px;
`

const TranslatedNotificationButton = ({ tooltip_text, has_notifications, onClick }) => {
  const { t } = useTranslation('general')

  return (
    <Tooltip html={tooltip_text || t('general:notification_button')}>
      <Clickable onClick={onClick}>
        <ElementBox>
          <IconContainer>
            <Icon name={has_notifications ? 'bell_ringing' : 'bell'} />
          </IconContainer>
        </ElementBox>
      </Clickable>
    </Tooltip>
  )
}

TranslatedNotificationButton.propTypes = {
  tooltip_text: PropTypes.string,
  has_notifications: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
}
TranslatedNotificationButton.defaultProps = {
  has_notifications: false,
}

export const NotificationButton = withBaseTranslationContext(TranslatedNotificationButton)
