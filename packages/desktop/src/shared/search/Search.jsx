import { Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import _ from 'underscore'

import useTranslation from 'hooks/useTranslation'
import { TextInput } from 'shared/form/formik/TextInput'
import { SearchButton } from 'shared/search/search/SearchButton'

const StyledInput = styled(TextInput)`
  max-width: 360px;
  @media (min-width: 1100px) {
    width: 230px;
  }

  @media (min-width: 1300px) {
    width: 360px;
  }
`

const initial_values = {
  query: '',
}

const Search = ({ onSubmit: props_onSubmit }) => {
  const { t } = useTranslation('general')
  const onFormSubmit = (values, { setSubmitting }) => {
    const filters = {}
    _.each(values, (value, key) => {
      if (!_.isEmpty(value)) filters[key] = value
    })

    setSubmitting(false)
    props_onSubmit(filters)
  }

  return (
    <Formik initialValues={initial_values} onSubmit={onFormSubmit}>
      {({ handleSubmit }) => (
        <Form>
          <StyledInput
            name="query"
            placeholder={t('general:search')}
            errorProps={{ hidden: true }}
          />
          <SearchButton onClick={handleSubmit} />
        </Form>
      )}
    </Formik>
  )
}

Search.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export { Search }
