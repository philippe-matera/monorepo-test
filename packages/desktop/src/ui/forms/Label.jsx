import PropTypes from 'prop-types'
import React from 'react'

import useTranslation from 'hooks/useTranslation'
import { withBaseTranslationContext } from 'shared/withBaseTranslationContext'
import { Icon } from 'ui/icons/Icon'
import { Tooltip } from 'ui/tooltips/Tooltip'
import { Text } from 'ui/typography/Text'
import { Block } from 'ui/wrappers/Block'

const TranslatedLabel = ({
  has_bottom_margin,
  htmlFor,
  children,
  infotip,
  optional,
  inline,
  infotooltip,
  className,
}) => {
  const { t } = useTranslation('general')
  let info
  if (infotooltip) {
    info = (
      <Tooltip {...infotooltip}>
        <Text color="primary" className="cursor-pointer">
          <Icon name="question_circle" space_before space_after />
          {infotip}
        </Text>
      </Tooltip>
    )
  } else if (infotip) {
    info = (
      <Text color="primary">
        <Icon name="info_circle" space_before space_after />
        {infotip}
      </Text>
    )
  }

  return (
    <Block inline={inline} bottom={has_bottom_margin && 'xxs'}>
      <label htmlFor={htmlFor} className={className}>
        {children}
      </label>
      {optional && (
        <Block left="xxs" inline>
          <Text muted small>
            ({t('general:label_optional')})
          </Text>
        </Block>
      )}
      {info}
    </Block>
  )
}

TranslatedLabel.propTypes = {
  has_bottom_margin: PropTypes.bool,
  htmlFor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node,
  infotip: PropTypes.string,
  optional: PropTypes.bool,
  inline: PropTypes.bool,
  infotooltip: PropTypes.shape({ text: PropTypes.string }),
  className: PropTypes.string, // If extended with StyledComponent
}

TranslatedLabel.defaultProps = {
  has_bottom_margin: true,
  htmlFor: null,
  optional: false,
  inline: false,
}

export const Label = withBaseTranslationContext(TranslatedLabel)
