import { COLORS } from '@matera-tech/utils'
import PropTypes from 'prop-types'
import React from 'react'
import isEqual from 'react-fast-compare'
import { withTranslation } from 'react-i18next'
import { default as ReactSelect } from 'react-select' // eslint-disable-line import/no-named-default
import Async from 'react-select/async'
import _ from 'underscore'

import { InlineSpinner } from 'lib/select/components/InlineSpinner'
import { withBaseTranslationContext } from 'shared/withBaseTranslationContext'

const custom_styles = {
  indicatorSeparator: () => ({}),
  dropdownIndicator: provided => ({
    ...provided,
    marginRight: '7px',
    color: COLORS.gray[1000],
  }),
  container: provided => ({
    ...provided,
    border: '0',
    boxShadow: 0,
    outline: 0,
    minHeight: '38px',
    minWidth: '150px',
  }),
  menuPortal: provided => ({ ...provided, zIndex: 3000 }),
  control: (provided, { isFocused }) => {
    const style = {
      ...provided,
      border: `1px solid ${COLORS.gray[500]}`,
      boxShadow: 0,
      outline: 0,
      borderRadius: '4px',
      fontSize: '16px',
      fontWeight: '400',
      lineHeight: '20px',
      minHeight: '38px',
      maxHeight: '150px',
      overflow: 'scroll',
      minWidth: '100%',
      padding: isFocused ? '0' : '1px',
      paddingLeft: '6px',
      maxWidth: '0px',
    }
    if (isFocused) style.border = `2px solid ${COLORS.primary.light} !important`

    return style
  },
  menu: provided => ({
    ...provided,
    marginTop: '1px',
    borderRadius: '8px',
  }),
  group: provided => ({
    ...provided,
    borderBottom: `1px solid ${COLORS.gray[400]}`,
  }),
  groupHeading: provided => ({
    ...provided,
    color: COLORS.primary.dark,
    textTransform: 'none',
    fontSize: '15px',
    lineHeight: '24px',
  }),
  placeholder: provided => ({
    ...provided,
    color: COLORS.gray[600],
  }),
}

const modalCloseOnScroll = scroll_event =>
  scroll_event.target.className?.includes('modal-matera-container')

class TranslatedSelect extends React.Component {
  constructor(props) {
    super(props)

    this.parent_ref = React.createRef()
    this.handleChange = this.onChange.bind(this)
    this.getMenuPortalTarget = this.getMenuPortalTarget.bind(this)
  }

  onChange(obj, action) {
    const { isMulti, onChange, name, valueKey } = this.props
    if (isMulti || action.action !== 'pop-value') onChange(obj, name, valueKey)
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props, nextProps)
  }

  getMenuPortalTarget(modal_element) {
    let temp_element = this.parent_ref.current
    while (temp_element !== null && temp_element !== document.body) {
      temp_element = temp_element.parentNode
      if (temp_element === modal_element) return modal_element
    }

    return document.body
  }

  render() {
    const {
      async,
      dataLoading,
      isMulti,
      valueKey,
      error,
      labelKey,
      isDisabled,
      classname,
      styles,
    } = this.props
    let { value, options } = this.props

    if (value !== null && !async && !dataLoading) {
      if (!_.isEmpty(options) && _.has(options[0], 'options')) {
        options = _.flatten(options.map(option => option.options))
      }

      if (isMulti) {
        value = _.compact(value.map(v => _.find(options, { [valueKey]: v })))
      } else {
        value = _.find(options, { [valueKey]: value }) || null
      }
    }

    const Component = async ? Async : ReactSelect

    // Display loader while loading data (not async. we use dataLoading to not conflict with async's isLoading)
    let { components } = this.props
    if (dataLoading) {
      components = {
        ...components,
        Placeholder: () => (
          <InlineSpinner position="left" containerClassName="m-l-sm" color="#a8aaab" />
        ),
      }
    }

    const completed_styles = { ...custom_styles }
    if (styles) {
      _.each(styles, (func, key) => {
        completed_styles[key] = (provided, state) => {
          const baseFunc = custom_styles[key] || (prov => prov)

          return func(baseFunc(provided, state), state)
        }
      })
    }
    const full_styles = { ...completed_styles }
    if (error) {
      full_styles.control = (provided, state) => ({
        ...completed_styles.control(provided, state),
        borderColor: `${COLORS.danger.normal} !important`,
      })
    }

    const modal_element = document.querySelector('.modal-matera')

    const menu_portal_target = this.getMenuPortalTarget(modal_element)
    const in_modal = menu_portal_target === modal_element

    const noOptionsMessage = this.props.noOptionsMessage
      ? this.props.noOptionsMessage
      : () => this.props.t('general:select.no_result')

    return (
      <div ref={this.parent_ref}>
        <Component
          getOptionValue={option => option[valueKey]}
          getOptionLabel={option => option[labelKey]}
          {..._.omit(this.props, [
            'value',
            'labelKey',
            'valueKey',
            'async',
            'isDisabled',
            'onChange',
            'noOptionsMessage',
          ])}
          onChange={this.handleChange}
          classNamePrefix="react-select"
          // eslint-disable-next-line
          className={`react-select ${classname}`}
          value={value}
          key={value}
          isDisabled={dataLoading || isDisabled}
          components={components}
          styles={full_styles}
          menuPortalTarget={menu_portal_target}
          menuPosition={in_modal ? 'fixed' : 'absolute'}
          closeMenuOnScroll={modalCloseOnScroll}
          tabSelectsValue={false}
          noOptionsMessage={noOptionsMessage}
        />
      </div>
    )
  }
}

TranslatedSelect.propTypes = {
  labelKey: PropTypes.string,
  valueKey: PropTypes.string,
  isClearable: PropTypes.bool,
  isMulti: PropTypes.bool,
  classname: PropTypes.string,
  noOptionsMessage: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.object), // eslint-disable-line react/forbid-prop-types
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.shape(),
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  async: PropTypes.bool,
  dataLoading: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onChange: PropTypes.func,
  name: PropTypes.string.isRequired,
  styles: PropTypes.shape(),
  error: PropTypes.bool,
  components: PropTypes.shape(),
  t: PropTypes.func.isRequired,
}

TranslatedSelect.defaultProps = {
  labelKey: 'label',
  valueKey: 'value',
  isClearable: false,
  isMulti: false,
  classname: '',
  options: [],
  value: null,
  async: false,
  dataLoading: false,
  isDisabled: false,
  error: false,
  components: {},
}

const SelectWithTranslation = withTranslation('general')(TranslatedSelect)
const Select = withBaseTranslationContext(SelectWithTranslation)
export { Select, custom_styles }
