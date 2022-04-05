import { connect } from 'formik'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { geocodeByAddress } from 'react-places-autocomplete'
import _ from 'underscore'

import useTranslation from 'hooks/useTranslation'
import { AddressAutocompleteInput } from 'lib/address_autocomplete_input/AddressAutocompleteInput'
import { CountrySelect } from 'shared/form/formik/CountrySelect'
import { ErrorMessage } from 'shared/form/formik/ErrorMessage'
import { TextInput } from 'shared/form/formik/TextInput'
import { withBaseTranslationContext } from 'shared/withBaseTranslationContext'
import { Flex } from 'ui/flex/Flex'
import { Label } from 'ui/forms/Label'

const handleFilterOption = (option, query) => {
  if (option.value === 'no_address') {
    return option && query.length >= 3
  }

  return true
}

const ConnectedAddressInput = props => {
  const { t } = useTranslation('general')
  const { google_places_api_key } = props
  const [address, setAddress] = useState('')
  const [unified_address_fields, setUnifiedAddressFields] = useState(
    _.isEmpty(props.formik.values[`${props.prefix}address_street`]),
  )

  useEffect(() => {
    if (unified_address_fields)
      setUnifiedAddressFields(_.isEmpty(props.formik.values[`${props.prefix}address_street`]))
  }, [props.formik.values, props.prefix, setUnifiedAddressFields, unified_address_fields])

  const onAddressSelect = useCallback(
    suggestion => {
      if (suggestion.value === 'no_address') {
        setUnifiedAddressFields(false)
      } else {
        geocodeByAddress(suggestion.label).then(results => {
          // eslint-disable-next-line prefer-destructuring
          const { address_components } = results[0]

          const components = {}
          _.each(address_components, address_component => {
            _.each(address_component.types, type => {
              components[type] = address_component.long_name
            })
          })

          setAddress(results[0].formatted_address)
          setUnifiedAddressFields(false)

          let address_country = props.country_field ? components.country : null
          if (props.country_field && props.country_select)
            address_country = address_country.slice(0, 2).toUpperCase()

          props.formik.setFieldValue(
            `${props.prefix}address_street`,
            `${components.street_number ? `${components.street_number} ` : ''}${
              components.route || ''
            }`,
          )
          props.formik.setFieldValue(`${props.prefix}address_zipcode`, components.postal_code)
          props.formik.setFieldValue(`${props.prefix}address_city`, components.locality)
          props.formik.setFieldValue(`${props.prefix}address_country`, address_country)
        })
      }
    },
    [props.country_field, props.country_select, props.formik, props.prefix],
  )

  const fields = useMemo(() => {
    const { prefix, disabled } = props

    if (unified_address_fields && google_places_api_key) {
      return (
        <>
          <AddressAutocompleteInput
            name="address"
            value={address}
            onChangeValue={setAddress}
            onSelect={onAddressSelect}
            customSelectOptions={[
              { label: t('general:address_input.cant_find_address'), value: 'no_address' },
            ]}
            customOptions={{
              filterOption: handleFilterOption,
            }}
            label={props.address_label || t('general:address_input.address')}
            google_places_api_key={google_places_api_key}
          />
          <ErrorMessage name="address" />
        </>
      )
    }

    const input_type = props.country_select ? (
      <CountrySelect
        name={`${prefix}address_country`}
        label={props.country_label || t('general:address_input.address_country')}
      />
    ) : (
      <>
        <Label>{t('general:address_input.address_country')}</Label>
        <TextInput name={`${prefix}address_country`} />
      </>
    )

    let country_field
    if (props.country_field) {
      country_field = (
        <Flex item_wrapper>
          <Flex.Item>{input_type}</Flex.Item>
          <Flex.Item />
        </Flex>
      )
    }

    return (
      <>
        <Label>{props.address_street_label || t('general:address_input.address_street')}</Label>
        <TextInput disabled={disabled} name={`${prefix}address_street`} />

        {!props.no_address_complement && (
          <>
            <Label>{t('general:address_input.address_complement')}</Label>
            <TextInput disabled={disabled} name={`${prefix}address_complement`} />
          </>
        )}

        <Flex item_wrapper>
          <Flex.Item>
            <Label>{t('general:address_input.address_zipcode')}</Label>
            <TextInput disabled={disabled} name={`${prefix}address_zipcode`} />
          </Flex.Item>
          <Flex.Item>
            <Label>{t('general:address_input.address_city')}</Label>
            <TextInput disabled={disabled} name={`${prefix}address_city`} />
          </Flex.Item>
        </Flex>

        {country_field}
      </>
    )
  }, [unified_address_fields, google_places_api_key, props, t, address, onAddressSelect])

  return fields
}

ConnectedAddressInput.propTypes = {
  google_places_api_key: PropTypes.string,
  country_field: PropTypes.bool,
  prefix: PropTypes.string,
  address_label: PropTypes.string,
  disabled: PropTypes.bool,
  no_address_complement: PropTypes.bool,
  address_street_label: PropTypes.string,
  country_label: PropTypes.string,
  country_select: PropTypes.bool,

  formik: PropTypes.shape({
    values: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    setFieldValue: PropTypes.func.isRequired,
  }).isRequired,
}

ConnectedAddressInput.defaultProps = {
  country_field: false,
  prefix: '',
  disabled: false,
  no_address_complement: false,
  country_select: false,
}

const AddressInput = connect(withBaseTranslationContext(ConnectedAddressInput))
export { AddressInput }
