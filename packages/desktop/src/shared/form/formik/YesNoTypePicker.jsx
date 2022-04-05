import PropTypes from 'prop-types'
import React from 'react'

import useTranslation from 'hooks/useTranslation'
import { TypePicker } from 'shared/form/formik/TypePicker'
import { withBaseTranslationContext } from 'shared/withBaseTranslationContext'

const TranslatedYesNoTypePicker = props => {
  const { t } = useTranslation('general')

  const types = [
    { value: true, label: t(`general:yes_no_type_picker.yes`) },
    { value: false, label: t(`general:yes_no_type_picker.no`) },
  ]

  return <TypePicker {...props} available_types={types} />
}

TranslatedYesNoTypePicker.propTypes = {
  name: PropTypes.string.isRequired,
}

const YesNoTypePicker = withBaseTranslationContext(TranslatedYesNoTypePicker)
export { YesNoTypePicker }
