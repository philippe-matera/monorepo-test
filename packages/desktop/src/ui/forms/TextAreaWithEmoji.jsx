import { useToggle } from '@matera-tech/utils'
import { connect, getIn } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { EmojiPicker } from 'lib/communication/emoji/EmojiPicker'
import { TextArea } from 'ui/forms/TextArea'
import { EmojiButton } from 'ui/icon_buttons/EmojiButton'

const StyledContainer = styled.div`
  position: relative;
`
const StyledButton = styled.div`
  position: absolute;

  top: -30px;
  right: 13px;
`

const BaseTextAreaWithEmoji = ({
  id,
  rows,
  name,
  error,
  textareaHeight,
  placeholder,
  formik: { values, handleChange: handleFormikChange, handleBlur },
  className,
  onSelect,
}) => {
  const [showEmojiPicker, toggleShowEmojiPicker] = useToggle(false)

  const handleChange = event => {
    const textareaRectBefore = event.target.getBoundingClientRect()
    const diffBefore = window.innerHeight - textareaRectBefore.top + textareaRectBefore.height

    handleFormikChange(event)

    const styles = getComputedStyle(event.target)
    const borderWidth = parseInt(styles.borderWidth, 10)
    // the 300px value is due to formik textarea max height. Omitting it causes weird blink on textarea.
    // Check core/communication/message/public/wrapper/list/topic/CommentForm.jsx for more info
    event.target.style.height = `${Math.min(event.target.scrollHeight + borderWidth, 300)}px`
    event.target.scrollTop = event.target.scrollHeight

    const textareaRectAfter = event.target.getBoundingClientRect()
    const diffAfter = window.innerHeight - textareaRectAfter.top + textareaRectAfter.height

    window.scrollBy(0, diffAfter - diffBefore)
  }

  return (
    <>
      <TextArea
        id={id}
        rows={rows}
        name={name}
        className={className}
        error={error}
        style={{ resize: 'none', height: `${textareaHeight}px` }}
        value={getIn(values, name)}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        withEmoji
      />
      <StyledContainer>
        <StyledButton>
          <EmojiButton toggleShowPicker={toggleShowEmojiPicker} />
        </StyledButton>
      </StyledContainer>
      {showEmojiPicker && (
        <EmojiPicker
          onSelect={obj => {
            onSelect(obj.colons)
            toggleShowEmojiPicker()
          }}
          right="9%"
          closeEmojiPicker={toggleShowEmojiPicker}
        />
      )}
    </>
  )
}

BaseTextAreaWithEmoji.propTypes = {
  id: PropTypes.string,
  rows: PropTypes.number,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  error: PropTypes.bool,
  textareaHeight: PropTypes.number,
  onSelect: PropTypes.func,
  formik: PropTypes.shape({
    // eslint-disable-next-line react/forbid-prop-types
    values: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
  }).isRequired,
}

const TextAreaWithEmoji = connect(BaseTextAreaWithEmoji)

export { TextAreaWithEmoji }
