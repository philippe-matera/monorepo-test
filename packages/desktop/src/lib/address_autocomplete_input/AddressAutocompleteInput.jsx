import { COLORS } from '@matera-tech/utils'
import PropTypes from 'prop-types'
import React, { useContext, useRef, useState } from 'react'
import makeAsyncScriptLoader from 'react-async-script'
import PlacesAutocomplete from 'react-places-autocomplete'

import { Select } from 'lib/select/Select'
import { UIContext } from 'src/UIContext'
import { Label } from 'ui/forms/Label'

const AddressAutocompleteInputContent = props => {
  if (props.loading) return <div />

  return (
    <PlacesAutocomplete value={props.value} onChange={props.onChangeValue}>
      {({ getInputProps, suggestions, loading }) => (
        <div className={props.className}>
          {props.label && (
            <Label htmlFor={props.name} className="select-label">
              {props.label}
            </Label>
          )}
          <Select
            {...props.customOptions}
            name={props.name}
            options={props.customSelectOptions.concat(
              suggestions.map(suggestion => ({ value: suggestion, label: suggestion.description })),
            )}
            onInputChange={value => {
              getInputProps().onChange(value)
            }}
            placeholder={props.value === '' ? props.placeholder : props.value}
            isLoading={loading}
            value={props.value}
            onChange={props.onSelect}
            styles={{
              indicatorSeparator: () => ({ display: 'none' }),
              dropdownIndicator: () => ({ display: 'none' }),
              menu: (base, state) =>
                state.options.length === 1
                  ? { display: 'none' }
                  : { ...base, zIndex: '2000 !important' },
              option: (base, { value }) =>
                value === 'no_address' ? { ...base, color: COLORS.primary.normal } : base,
            }}
          />
        </div>
      )}
    </PlacesAutocomplete>
  )
}

const AddressAutocompleteInput = props => {
  const { locale } = useContext(UIContext)
  const [loading, setLoading] = useState(true)
  const componentRef = useRef(
    makeAsyncScriptLoader(
      `https://maps.googleapis.com/maps/api/js?libraries=places&key=${props.google_places_api_key}&language=${locale}`,
    )(AddressAutocompleteInputContent),
  )

  const callAfterScriptLoads = () => setLoading(false)
  const AsyncComponent = componentRef.current

  return <AsyncComponent asyncScriptOnLoad={callAfterScriptLoads} loading={loading} {...props} />
}

AddressAutocompleteInput.propTypes = {
  google_places_api_key: PropTypes.string.isRequired,
}

AddressAutocompleteInputContent.propTypes = {
  loading: PropTypes.bool.isRequired,
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChangeValue: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  className: PropTypes.string,
  customSelectOptions: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  customOptions: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  placeholder: PropTypes.string,
  label: PropTypes.string,
}

AddressAutocompleteInputContent.defaultProps = {
  name: 'address',
  placeholder: '',
  className: '',
  customSelectOptions: [],
  customOptions: {},
}

export { AddressAutocompleteInput }
