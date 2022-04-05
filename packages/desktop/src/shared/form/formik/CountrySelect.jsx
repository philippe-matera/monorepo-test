import { connect } from 'formik'
import iso3311a2 from 'iso-3166-1-alpha-2'
import PropTypes from 'prop-types'
import React from 'react'

import useTranslation from 'hooks/useTranslation'
import { Select } from 'shared/form/formik/Select'
import { Label } from 'ui/forms/Label'
import { Block } from 'ui/wrappers/Block'

const ConnectedCountrySelect = ({ label, name, placeholder }) => {
  const { t } = useTranslation('general')
  const countries = iso3311a2
    .getCodes()
    .map(code => ({ label: iso3311a2.getCountry(code), value: code }))

  return (
    <Block>
      <Label>{label}</Label>
      <Select
        name={name}
        placeholder={placeholder || t('general:country_select.placeholder')}
        options={countries}
      />
    </Block>
  )
}

ConnectedCountrySelect.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
}

ConnectedCountrySelect.defaultProps = {}

const CountrySelect = connect(ConnectedCountrySelect)
export { CountrySelect }
