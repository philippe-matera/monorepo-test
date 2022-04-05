import { Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css' // eslint-disable-line import/no-unassigned-import
import PropTypes from 'prop-types'
import React from 'react'
import { withTranslation } from 'react-i18next'

import { withBaseTranslationContext } from 'shared/withBaseTranslationContext'
import { Block } from 'ui/wrappers/Block'

class TranslatedEmojiPicker extends React.Component {
  constructor(props) {
    super(props)

    this.setWrapperRef = this.setWrapperRef.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  setWrapperRef(node) {
    this.wrapperRef = node
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target) && this.props.closeEmojiPicker) {
      this.props.closeEmojiPicker()
    }
  }

  render() {
    return (
      <Block inline ref={this.setWrapperRef}>
        <Picker
          set="facebook"
          onSelect={this.props.onSelect}
          title={this.props.t('general:emoji_picker.title')}
          style={{
            zIndex: 5,
            position: 'absolute',
            left: this.props.left,
            right: this.props.right,
            bottom: this.props.bottom,
          }}
          color="#3288B7"
          emoji="heart"
          // Need to improve our parser if we whish to support skins
          showSkinTones={false}
          skin={1}
          i18n={{
            search: this.props.t('general:emoji_picker.search'),
            notfound: this.props.t('general:emoji_picker.not_found'),
            categories: {
              search: this.props.t('general:emoji_picker.categories.search'),
              recent: this.props.t('general:emoji_picker.categories.recent'),
              people: this.props.t('general:emoji_picker.categories.people'),
              nature: this.props.t('general:emoji_picker.categories.nature'),
              foods: this.props.t('general:emoji_picker.categories.foods'),
              activity: this.props.t('general:emoji_picker.categories.activity'),
              places: this.props.t('general:emoji_picker.categories.places'),
              objects: this.props.t('general:emoji_picker.categories.objects'),
              symbols: this.props.t('general:emoji_picker.categories.symbols'),
              flags: this.props.t('general:emoji_picker.categories.flags'),
            },
          }}
        />
      </Block>
    )
  }
}

TranslatedEmojiPicker.propTypes = {
  onSelect: PropTypes.func.isRequired,
  closeEmojiPicker: PropTypes.func,
  left: PropTypes.string,
  right: PropTypes.string,
  bottom: PropTypes.string,
  t: PropTypes.func.isRequired,
}

const EmojiPickerWithTranslation = withTranslation('general')(TranslatedEmojiPicker)

export const EmojiPicker = withBaseTranslationContext(EmojiPickerWithTranslation)
