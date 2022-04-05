import PropTypes from 'prop-types'
import React, { useCallback, useState } from 'react'
import _ from 'underscore'

import { Select } from 'lib/select/Select'

let timeout = null

const custom_styles = {
  indicatorSeparator: () => ({ display: 'none' }),
  dropdownIndicator: () => ({ display: 'none' }),
  control: base => ({ ...base, cursor: 'text' }),
  input: base => ({ ...base, opacity: 1 }),
}

const AutocompleteInput = ({ value, ...props }) => {
  const [options, setOptions] = useState([])

  const optionsMethod = useCallback(
    loaded_options =>
      props.optionsMethod
        ? props.optionsMethod(props.titleMethod, props.labelMethod, loaded_options)
        : loaded_options.map(opt => ({ label: props.labelMethod(opt), value: opt })),
    [props],
  )

  const loadOptions = useCallback(
    (inputValue, callback) => {
      clearTimeout(timeout)

      timeout = setTimeout(
        () =>
          props.loadOptions(inputValue, loaded_options => {
            const formatted_options =
              loaded_options.length === 0 && inputValue.length > 3 && props.no_result_select
                ? [{ label: props.no_result_select, value: null }]
                : optionsMethod(loaded_options)
            setOptions(formatted_options)
            callback(formatted_options)
          }),
        500,
      )
    },
    [optionsMethod, props],
  )

  const styles = { ...custom_styles }
  if (props.styles) {
    _.each(props.styles, (func, key) => {
      styles[key] = (provided, state) => {
        const baseFunc = custom_styles[key] || (prov => prov)

        return func(baseFunc(provided, state), state)
      }
    })
  }

  return (
    <Select
      {...props}
      loadOptions={loadOptions}
      inputValue={value}
      isOptionSelected={() => false}
      controlShouldRenderValue={false}
      onInputChange={(new_value, obj) => {
        if (_.contains(['input-change'], obj.action)) {
          props.onChange(new_value)
        }
      }}
      onChange={select => props.onChange(select && select.value)}
      closeMenuOnSelect={false}
      async
      styles={styles}
      cacheOptions
      onBlurResetsInput={false}
      defaultOptions={options}
    />
  )
}

AutocompleteInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  loadOptions: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  labelMethod: PropTypes.func.isRequired,
  titleMethod: PropTypes.func,
  optionsMethod: PropTypes.func,
  no_result_select: PropTypes.string,
  styles: PropTypes.object, // eslint-disable-line react/forbid-prop-types
}

AutocompleteInput.defaultProps = {
  placeholder: '',
}

export { AutocompleteInput }
