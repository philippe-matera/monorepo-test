import PropTypes from 'prop-types'
import React from 'react'

import useTranslation from 'hooks/useTranslation'
import { withBaseTranslationContext } from 'shared/withBaseTranslationContext'
import { Label } from 'ui/forms/Label'
import { Radio } from 'ui/forms/Radio'
import { Block } from 'ui/wrappers/Block'

const TranslatedRadioBoolean = ({ label, name, updateBoolean, value, disabled }) => {
  const { t } = useTranslation('general')

  const onChange = e => {
    if (e.target.value === 'true') {
      updateBoolean(true, name)
    } else if (e.target.value === 'false') {
      updateBoolean(false, name)
    }
  }

  return (
    <Block top="s" left="m">
      <Label inline>{label}</Label>
      <Block inline left="s" pull_right>
        <Radio
          inline
          name={name}
          value="false"
          checked={String(value) === 'false'}
          onChange={onChange}
          label={t('general:radio_boolean.no')}
          disabled={disabled}
        />
      </Block>
      <Block inline left="s" pull_right>
        <Radio
          inline
          name={name}
          value="true"
          checked={String(value) === 'true'}
          onChange={onChange}
          label={t('general:radio_boolean.yes')}
          disabled={disabled}
        />
      </Block>
    </Block>
  )
}

TranslatedRadioBoolean.defaultProps = {
  value: null,
  disabled: false,
}

TranslatedRadioBoolean.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  updateBoolean: PropTypes.func.isRequired,
  value: PropTypes.bool,
  disabled: PropTypes.bool,
}

export const RadioBoolean = withBaseTranslationContext(TranslatedRadioBoolean)
