import PropTypes from 'prop-types'
import React from 'react'

import useTranslation from 'hooks/useTranslation'
import { withBaseTranslationContext } from 'shared/withBaseTranslationContext'
import { Link } from 'ui/links/Link'
import { Block } from 'ui/wrappers/Block'
import { ButtonsWrapper } from 'ui/wrappers/ButtonsWrapper'

const TranslatedCursorNavigator = ({ onPreviousPage, onNextPage }) => {
  const { t } = useTranslation('general')

  return (
    <Block centered>
      <ButtonsWrapper>
        {onPreviousPage && (
          <Link icon_before icon="arrow_left" onClick={onPreviousPage}>
            {t('general:cursor_navigator.previous')}
          </Link>
        )}
        {onNextPage && (
          <Link icon="arrow_right" onClick={onNextPage}>
            {t('general:cursor_navigator.next')}
          </Link>
        )}
      </ButtonsWrapper>
    </Block>
  )
}

TranslatedCursorNavigator.propTypes = {
  onPreviousPage: PropTypes.func,
  onNextPage: PropTypes.func,
}

export const CursorNavigator = withBaseTranslationContext(TranslatedCursorNavigator)
