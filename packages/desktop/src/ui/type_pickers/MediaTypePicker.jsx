import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { CONSTANTS } from 'src/constants'
import { Flex } from 'ui/flex/Flex'
import { Clickable } from 'ui/links/Clickable'
import { MediaType } from 'ui/type_pickers/components/MediaType'

const StyledFlex = styled(Flex)`
  ${({ has_label }) => has_label && `margin-top: 13px`};
  margin-right: -${CONSTANTS.spacing.l};
`

const MediaTypePicker = ({ name, available_types, selected_type, onChange }) => {
  const has_label = available_types.some(available_type => available_type.label)

  return (
    <StyledFlex item_wrapper has_label={has_label}>
      {available_types.map(available_type => {
        const { value, title, text, image_src, image_alt, label } = available_type
        const selected = available_type.value === selected_type

        return (
          <Clickable key={value} onClick={() => onChange(value, name)}>
            <MediaType
              selected={selected}
              label={label}
              image_src={image_src}
              image_alt={image_alt}
              title={title}
              text={text}
            />
          </Clickable>
        )
      })}
    </StyledFlex>
  )
}

MediaTypePicker.propTypes = {
  name: PropTypes.string.isRequired,
  available_types: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      text: PropTypes.string,
      label: PropTypes.string,
      image_src: PropTypes.string.isRequired,
      image_alt: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  selected_type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

export { MediaTypePicker }
