import { connect } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'underscore'

import useTranslation from 'hooks/useTranslation'
import { withBaseTranslationContext } from 'shared/withBaseTranslationContext'
import { Text } from 'ui/typography/Text'
import { Block } from 'ui/wrappers/Block'

const ConnectedErrorCount = ({ formik }) => {
  const { t } = useTranslation('general')
  const count = _.intersection(Object.keys(formik.errors), Object.keys(formik.touched)).length

  return count > 0 ? (
    <Block inline right="s">
      <Text color="danger">{t('general:error_count', { count })}</Text>
    </Block>
  ) : null
}

ConnectedErrorCount.propTypes = {
  formik: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
}

const ErrorCount = connect(withBaseTranslationContext(ConnectedErrorCount))
export { ErrorCount }
