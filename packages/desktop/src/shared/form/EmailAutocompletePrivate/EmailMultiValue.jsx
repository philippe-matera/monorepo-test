import { COLORS } from '@matera-tech/utils'
import PropTypes from 'prop-types'
import React from 'react'
import { components } from 'react-select'
import styled from 'styled-components'

import { Avatar } from 'ui/avatar/Avatar'
import { Flex } from 'ui/flex/Flex'
import { IconButton } from 'ui/icon_buttons/components/IconButton'
import { Tag } from 'ui/tags/Tag'
import { Text } from 'ui/typography/Text'
import { Title } from 'ui/typography/Title'
import { Block } from 'ui/wrappers/Block'

const borderControlProperty = (error, isFocused) => {
  if (error) {
    return `1px solid ${COLORS.danger.normal} !important`
  } else if (isFocused) {
    return `2px solid ${COLORS.primary.light} !important`
  }

  return `1px solid ${COLORS.gray[500]}`
}

const componentStyles = {
  indicatorSeparator: () => ({ display: 'none' }),
  dropdownIndicator: () => ({ display: 'none' }),
  control: (base, { hasValue, isFocused }, error) => ({
    ...base,
    backgroundColor: error ? COLORS.danger.lighter : 'inherit',
    border: borderControlProperty(error, isFocused),
    boxShadow: 'none',
    cursor: 'text',
    minHeight: '40px',
    padding: isFocused || hasValue ? '0 0 0 5px' : '1px 1px 1px 6px',
  }),
  valueContainer: (base, { hasValue }) => ({ ...base, padding: hasValue ? '0 0 0 0' : '2px 0px' }),
  input: base => ({ ...base, opacity: 1 }),
  multiValueLabel: base => ({ ...base, backgroundColor: 'inherit' }),
  multiValueRemove: base => ({ ...base, '&:hover': { backgroundColor: 'inherit' } }),
  multiValue: base => ({ ...base, backgroundColor: 'inherit' }),
}

const ContentsBlock = styled(Block)`
  display: flex;
  margin-top: 3px;
  margin-bottom: 3px;

  ${Tag} {
    padding: 1px 8px;
  }
`

const mapOptions = opts =>
  opts.map(opt => ({
    value: opt.email,
    label: (
      <Flex align_items="center">
        <Block right="xs">
          <Avatar src={opt.avatar_url} />
        </Block>
        <Block right="xs">
          <Title.H6>{opt.name}</Title.H6>
        </Block>
        <Text muted>{`<${opt.email}>`}</Text>
      </Flex>
    ),
  }))

const MultiValueContainer = props => (
  <ContentsBlock right="xs">
    <Tag color={props.data.tag || 'gray'}>
      <components.MultiValueContainer {...props} />
    </Tag>
  </ContentsBlock>
)

const MultiValueLabel = ({ data }) => (
  <Flex align_items="center">
    <Text>{data.tag ? data.label : data.value}</Text>
  </Flex>
)

const MultiValueRemove = props => (
  <components.MultiValueRemove {...props}>
    <IconButton icon="times" {...props} no_tooltip color={props.data.tag} />
  </components.MultiValueRemove>
)

MultiValueLabel.propTypes = {
  data: PropTypes.shape({
    value: PropTypes.shape({
      email: PropTypes.string,
    }),
    label: PropTypes.node,
    tag: PropTypes.string,
  }),
}

MultiValueContainer.propTypes = {
  data: PropTypes.shape({
    tag: PropTypes.string,
  }),
}

MultiValueRemove.propTypes = {
  data: PropTypes.shape({
    tag: PropTypes.string,
  }),
}

export { mapOptions, componentStyles, MultiValueContainer, MultiValueRemove, MultiValueLabel }
