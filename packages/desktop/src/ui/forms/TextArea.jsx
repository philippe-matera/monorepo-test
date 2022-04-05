import { COLORS } from '@matera-tech/utils'
import PropTypes from 'prop-types'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const TextAreaInput = styled.textarea`
  display: block;

  padding: 10px 16px;

  width: 100%;

  color: ${COLORS.gray[1000]};
  font-weight: 400 !important;

  font-family: inherit;
  font-size: 16px;
  line-height: 20px;

  height: auto;

  resize: vertical;

  overflow: auto;

  border: 1px solid ${COLORS.gray[500]} !important;
  border-radius: 4px;

  &:focus {
    border: 2px solid ${COLORS.primary.light} !important;
    outline: 0;

    padding: 9px 15px;
  }

  ::placeholder {
    color: ${COLORS.gray[600]};
  }

  ${({ border_dashed }) =>
    border_dashed &&
    `
    border-style: dashed !important;
  `}

  ${({ error }) =>
    error &&
    `
        border-color: ${COLORS.danger.normal} !important;
        background-color: ${COLORS.danger.lighter};

        &:focus {
          border: 2px solid ${COLORS.danger.normal} !important;
          outline: 0;
        }
      `}

  ${({ disabled }) =>
    disabled &&
    `
      cursor: not-allowed !important;
      background-color: #eeeeee;
      opacity: 1;
    `}
`

const TextArea = props => {
  const { auto_expand, value } = props
  const text_area_ref = useRef(null)

  const [min_height, setMinHeight] = useState(-1)
  const [current_value, setCurrentValue] = useState(value)

  useLayoutEffect(() => {
    const native_text_el = text_area_ref.current
    if (!native_text_el) return

    if (auto_expand) {
      // Remove, measure and restore previous value
      const current_inline_height = native_text_el.style.height
      native_text_el.style.height = 'initial'
      const { offsetHeight: offset_height } = native_text_el
      native_text_el.style.height = current_inline_height

      if (offset_height && offset_height !== min_height) {
        setMinHeight(offset_height)
      }
    }
  }, [auto_expand, text_area_ref, min_height, setMinHeight])

  useEffect(() => {
    const native_text_el = text_area_ref.current
    if (!native_text_el) return

    if (auto_expand) {
      native_text_el.style.height = '0'
      const { scrollHeight: scroll_height } = native_text_el
      const el_styles = window.getComputedStyle(native_text_el)
      const { borderTopWidth: border_top_width, borderBottomWidth: border_bottom_width } = el_styles
      const new_height =
        parseFloat(border_top_width) + scroll_height + parseFloat(border_bottom_width)

      native_text_el.style.height = `${Math.max(new_height, min_height)}px`
    }
  }, [auto_expand, current_value, min_height])

  useEffect(() => {
    if (value !== current_value) {
      setCurrentValue(value)
    }
  }, [value, current_value, setCurrentValue])

  const onChange = event => {
    setCurrentValue(event.target.value)
    if (props.onChange) props.onChange(event)
  }

  return <TextAreaInput {...props} ref={text_area_ref} value={current_value} onChange={onChange} />
}

TextArea.defaultProps = {
  error: false,
  border_dashed: false,
  withEmoji: false,
  auto_expand: false,
}

TextArea.propTypes = {
  error: PropTypes.bool,
  border_dashed: PropTypes.bool,
  withEmoji: PropTypes.bool,
  auto_expand: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.string,
}

export { TextArea }
