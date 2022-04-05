import { connect } from 'formik'
import debounce from 'lodash.debounce'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ReactSelect from 'react-select'

import useTranslation from 'hooks/useTranslation'
import { custom_styles } from 'lib/select/Select'
import {
  MultiValueContainer,
  MultiValueLabel,
  MultiValueRemove,
  componentStyles,
  mapOptions,
} from 'shared/form/EmailAutocompletePrivate/EmailMultiValue'
import { ErrorMessage } from 'shared/form/formik/ErrorMessage'
import { Text } from 'ui/typography/Text'

const DEFAULT_LIMIT = 7

const BasicEmailAutocomplete = ({
  useQuery,
  name,
  hide_menu,
  hide_no_option,
  placeholder,
  search,
  afterOnChange,
  formik,
  ...props
}) => {
  const [query, setQuery] = useState('')
  const [displayed, setDisplayed] = useState('')
  const [search_text, setSearchText] = useState('')
  const [render, setRender] = useState(false)
  const [initial_values, setInitialValues] = useState([])
  const setQueryDebounced = useRef(debounce(new_value => setQuery(new_value), 500)).current
  const { t } = useTranslation(['mailbox', 'general'])
  const { data: options = [] } = useQuery({ query })
  const no_message = hide_no_option ? null : t('general:select.no_result')
  const input_ref = useRef(null)

  const onInputChange = (input_value, event) => {
    if (event.action !== 'input-blur' && event.action !== 'menu-close') {
      setSearchText(input_value)
      setQueryDebounced(input_value)
      setDisplayed(input_value)
    }
  }

  const onChange = useCallback(obj => {
    formik?.setFieldValue(name, obj)
    afterOnChange?.(obj)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (formik?.values[name]) {
      const vals = formik.values[name].map(current => ({
        value: current,
        label: <Text>{`${current}`}</Text>,
      }))
      setInitialValues(vals)
    }
    setTimeout(() => setRender(true), 150)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (initial_values.length > 0) onChange(initial_values)
  }, [initial_values, onChange])

  const isCurrentEmailValid = useCallback(() => {
    // eslint-disable-next-line prefer-named-capture-group
    if (search || displayed.match(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/u))
      return 'gray'

    return 'danger'
  }, [displayed, search])

  const handleBlur = e => {
    const { current: { select } } = input_ref

    if (select.state.focusedOption && e.target.value) {
      select.selectOption(select.state.focusedOption)
    }
    formik?.setFieldTouched(name)
  }

  const memoOptions = useMemo(() => {
    const memoized_options = [...mapOptions(options)]
    if (displayed !== '' && memoized_options.length !== (props.limit || DEFAULT_LIMIT))
      memoized_options.push({
        value: displayed,
        tag: isCurrentEmailValid(),
        label: <Text>{`${displayed}`}</Text>,
      })

    return [...initial_values, ...memoized_options, ...props.aliases]
  }, [options, displayed, isCurrentEmailValid, props.limit, props.aliases, initial_values])

  let components = { MultiValueContainer, MultiValueLabel, MultiValueRemove }

  // eslint-disable-next-line no-warning-comments
  // Todo: remove 'hide_menu' when a real MultiEmail component is done, this is a hack to adapt this current component to a MultiEmail
  if (hide_menu) {
    components = { ...components, Menu: () => null }
  }

  if (!render) return null

  return (
    <>
      <ReactSelect
        {...props}
        ref={input_ref}
        isLoading={false}
        defaultValue={initial_values}
        components={components}
        inputValue={search_text}
        styles={{
          ...custom_styles,
          ...componentStyles,
          control: (base, control_ref) => ({
            ...componentStyles.control(base, control_ref, formik.errors?.recipients),
          }),
        }}
        options={memoOptions}
        getOptionLabel={color => color.label}
        onInputChange={onInputChange}
        backspaceRemovesValue
        valueKey="value"
        classNamePrefix="react-select"
        isClearable={false}
        labelKey="label"
        isMulti
        maxLength={1}
        max={1}
        filterOption={null}
        onChange={onChange}
        placeholder={placeholder || t('select.search')}
        noOptionsMessage={() => no_message}
        onBlur={handleBlur}
      />
      <ErrorMessage name={name} {...props.errorProps} />
    </>
  )
}

BasicEmailAutocomplete.propTypes = {
  useQuery: PropTypes.func.isRequired,
  afterOnChange: PropTypes.func,
  errorProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  name: PropTypes.string.isRequired,
  limit: PropTypes.number,
  placeholder: PropTypes.string,
  hide_no_option: PropTypes.bool,
  hide_menu: PropTypes.bool,
  isMulti: PropTypes.bool,
  search: PropTypes.bool,
  aliases: PropTypes.arrayOf(
    PropTypes.shape({
      tag: PropTypes.string,
      value: PropTypes.string,
      label: PropTypes.node,
    }),
  ),
  formik: PropTypes.shape({
    error: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    setFieldValue: PropTypes.func.isRequired,
    setFieldTouched: PropTypes.func.isRequired,
    values: PropTypes.shape({}),
  }),
}

const EmailAutocomplete = connect(BasicEmailAutocomplete)
export { EmailAutocomplete }
