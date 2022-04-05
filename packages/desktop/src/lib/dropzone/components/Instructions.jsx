import filesize from 'filesize'
import PropTypes from 'prop-types'
import React from 'react'

import useTranslation from 'hooks/useTranslation'
import { DropzoneUtils } from 'lib/dropzone/static/DropzoneUtils'
import { withBaseTranslationContext } from 'shared/withBaseTranslationContext'
import { Button } from 'ui/buttons/Button'
import { Link } from 'ui/links/Link'
import { Text } from 'ui/typography/Text'
import { Title } from 'ui/typography/Title'
import { Block } from 'ui/wrappers/Block'

const TranslatedInstructions = ({
  multiple,
  maxSize,
  accept,
  open,
  instructions,
  instructions_html,
  small,
  button_color,
}) => {
  const { t } = useTranslation('general')
  const size = filesize.partial({
    bits: false,
    round: 0,
    symbols: {
      B: t('general:dropzone.file_sizes.B'),
      KB: t('general:dropzone.file_sizes.KB'),
      MB: t('general:dropzone.file_sizes.MB'),
    },
  })

  const title =
    instructions_html ||
    (small ? (
      <Text>
        {instructions || t(`general:dropzone.drag_file_here.${multiple ? 'multiple' : 'single'}`)}
      </Text>
    ) : (
      <Title.H5>
        {instructions || t(`general:dropzone.drag_file_here.${multiple ? 'multiple' : 'single'}`)}
      </Title.H5>
    ))

  return (
    <>
      {title}
      <Block top="xs">{t('general:or').toUpperCase()}</Block>
      <Block top="xs">
        {small ? (
          <Link id="add-document" onClick={open}>
            {t(`general:dropzone.ctas.choose_file.${multiple ? 'multiple' : 'single'}`)}
          </Link>
        ) : (
          <Button id="add-document" color={button_color} onClick={open}>
            {t(`general:dropzone.ctas.choose_file.${multiple ? 'multiple' : 'single'}`)}
          </Button>
        )}
      </Block>
      {!small && (
        <Block top="s">
          <Text muted>
            {t('general:dropzone.restrictions', {
              max: size(maxSize),
              formats_list: DropzoneUtils.formats(t, accept),
            })}
          </Text>
        </Block>
      )}
    </>
  )
}

TranslatedInstructions.defaultProps = {
  small: false,
  button_color: 'primary',
}

TranslatedInstructions.propTypes = {
  multiple: PropTypes.bool,
  maxSize: PropTypes.number,
  accept: PropTypes.string,
  open: PropTypes.func,
  instructions: PropTypes.string,
  instructions_html: PropTypes.element,
  small: PropTypes.bool,
  button_color: PropTypes.string,
}

const Instructions = withBaseTranslationContext(TranslatedInstructions)
export { Instructions }
