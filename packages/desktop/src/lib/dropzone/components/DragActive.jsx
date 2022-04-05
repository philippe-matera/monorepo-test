import React from 'react'

import useTranslation from 'hooks/useTranslation'
import { withBaseTranslationContext } from 'shared/withBaseTranslationContext'
import { Icon } from 'ui/icons/Icon'
import { Title } from 'ui/typography/Title'
import { Block } from 'ui/wrappers/Block'

const TranslatedDragActive = () => {
  const { t } = useTranslation('general')

  return (
    <>
      <Block top="xl">
        <Title.H5>
          <Icon name="file" x3 />
        </Title.H5>
      </Block>
      <Block top="m">
        <Title.H5>{t('general:dropzone.active.drop_file_here')}</Title.H5>
      </Block>
    </>
  )
}

TranslatedDragActive.propTypes = {}

const DragActive = withBaseTranslationContext(TranslatedDragActive)
export { DragActive }
