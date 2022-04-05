import PropTypes from 'prop-types'
import React from 'react'
import { withTranslation } from 'react-i18next'
import { geocodeByAddress } from 'react-places-autocomplete'
import _ from 'underscore'

import { AddressAutocompleteInput } from 'lib/address_autocomplete_input/AddressAutocompleteInput'
import { withBaseTranslationContext } from 'shared/withBaseTranslationContext'
import { Flex } from 'ui/flex/Flex'
import { Label } from 'ui/forms/Label'
import { TextInput } from 'ui/forms/TextInput'
import { Block } from 'ui/wrappers/Block'

// eslint-disable-next-line react/no-unsafe
class TranslatedAddressInput extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      address: '',
      unified_address_fields: _.isEmpty(props.address_street),
    }

    this.handleAddressSelect = this.handleAddressSelect.bind(this)
    this.handleAddressChange = this.handleAddressChange.bind(this)
  }

  static handleFilterOption(option, query) {
    if (option.value === 'no_address') {
      return option && query.length >= 3
    }

    return true
  }

  UNSAFE_componentWillReceiveProps(next_props) {
    if (this.state.unified_address_fields) {
      this.setState({ unified_address_fields: _.isEmpty(next_props.address_street) })
    }
  }

  handleAddressChange(address) {
    this.setState({ address })
  }

  handleAddressSelect(suggestion) {
    if (suggestion.value === 'no_address') {
      this.setState({
        unified_address_fields: false,
      })
    } else {
      geocodeByAddress(suggestion.label).then(results => {
        const [first_result] = results
        const { address_components } = first_result

        const components = {}
        _.each(address_components, address_component => {
          _.each(address_component.types, type => {
            components[type] = address_component.long_name
          })
        })

        this.setState({
          address: results[0].formatted_address,
          unified_address_fields: false,
        })

        const address_country = this.props.country_field ? components.country : null

        this.props.onAddressSelect({
          [`${this.props.prefix}address_street`]: `${
            components.street_number ? `${components.street_number} ` : ''
          }${components.route || ''}`,
          [`${this.props.prefix}address_city`]: components.locality,
          [`${this.props.prefix}address_zipcode`]: components.postal_code,
          [`${this.props.prefix}address_country`]: address_country,
        })
      })
    }
  }

  render() {
    let fields

    if (this.state.unified_address_fields && this.props.google_places_api_key) {
      fields = (
        <AddressAutocompleteInput
          name="address"
          value={this.state.address}
          onChangeValue={this.handleAddressChange}
          onSelect={this.handleAddressSelect}
          className="m-t"
          customSelectOptions={[
            { label: this.props.t('general:address_input.cant_find_address'), value: 'no_address' },
          ]}
          customOptions={{
            filterOption: TranslatedAddressInput.handleFilterOption,
          }}
          label={this.props.t('general:address_input.address')}
          google_places_api_key={this.props.google_places_api_key}
        />
      )
    } else {
      let country_field
      if (this.props.country_field) {
        country_field = (
          <>
            <Label>{this.props.t('general:address_input.address_country')}</Label>
            <TextInput
              name={`${this.props.prefix}address_country`}
              value={this.props.address_country || ''}
              onChange={this.props.updateField} // eslint-disable-line react/jsx-handler-names
            />
          </>
        )
      }

      fields = (
        <>
          <Label>{this.props.t('general:address_input.address_street')}</Label>
          <TextInput
            name={`${this.props.prefix}address_street`}
            value={this.props.address_street || ''}
            onChange={this.props.updateField} // eslint-disable-line react/jsx-handler-names
          />

          <Block top="s">
            <Label>{this.props.t('general:address_input.address_complement')}</Label>
            <TextInput
              name={`${this.props.prefix}address_complement`}
              value={this.props.address_complement || ''}
              onChange={this.props.updateField} // eslint-disable-line react/jsx-handler-names
            />
          </Block>

          <Block top="s">
            <Flex item_wrapper>
              <Flex.Item>
                <Label>{this.props.t('general:address_input.address_zipcode')}</Label>
                <TextInput
                  name={`${this.props.prefix}address_zipcode`}
                  value={this.props.address_zipcode || ''}
                  onChange={this.props.updateField} // eslint-disable-line react/jsx-handler-names
                />
              </Flex.Item>
              <Flex.Item>
                <Label>{this.props.t('general:address_input.address_city')}</Label>
                <TextInput
                  name={`${this.props.prefix}address_city`}
                  value={this.props.address_city || ''}
                  onChange={this.props.updateField} // eslint-disable-line react/jsx-handler-names
                />
              </Flex.Item>
            </Flex>
          </Block>

          <Block top="s">{country_field}</Block>
        </>
      )
    }

    return fields
  }
}

TranslatedAddressInput.propTypes = {
  address_street: PropTypes.string,
  address_complement: PropTypes.string,
  address_zipcode: PropTypes.string,
  address_city: PropTypes.string,
  address_country: PropTypes.string,
  updateField: PropTypes.func.isRequired,
  onAddressSelect: PropTypes.func.isRequired,
  country_field: PropTypes.bool,
  prefix: PropTypes.string,
  google_places_api_key: PropTypes.string,
  t: PropTypes.func.isRequired,
}

TranslatedAddressInput.defaultProps = {
  country_field: false,
  prefix: '',
}

const AddressInputWithTranslation = withTranslation('general')(TranslatedAddressInput)
const AddressInput = withBaseTranslationContext(AddressInputWithTranslation)
export { AddressInput }
