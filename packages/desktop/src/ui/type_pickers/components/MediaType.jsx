import { COLORS } from '@matera-tech/utils'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { CONSTANTS } from 'src/constants'
import { Flex } from 'ui/flex/Flex'
import { Text } from 'ui/typography/Text'
import { Block } from 'ui/wrappers/Block'

const StyledItem = styled(Flex.Item)`
  position: relative;

  padding: ${CONSTANTS.spacing.l} ${CONSTANTS.spacing.s} ${CONSTANTS.spacing.m}
    ${CONSTANTS.spacing.s};
  border: ${({ selected }) =>
    selected ? `1px solid ${COLORS.primary.normal};` : `1px solid ${COLORS.gray[400]};`};
  ${({ selected }) => selected && `background-color: ${COLORS.primary.lighter};`};

  border-radius: 8px;

  text-align: center;
  line-height: 24px;

  ${({ selected }) =>
    !selected &&
    `
      &:hover {
        border: 1px solid ${COLORS.primary.light};
        box-shadow: 0px 4px 8px rgba(46, 69, 184, 0.05), 0px 8px 16px rgba(46, 69, 184, 0.05);
      }
    `}

  &:active {
    border: 2px solid ${COLORS.primary.light};
  }

  img {
    height: 140px;
    min-height: 140px;
  }
`

const LabelContainer = styled(Block)`
  position: absolute;

  top: -13px;
  right: 0;
  left: 0;
`
const LabelContent = styled(Text)`
  padding: 6px ${CONSTANTS.spacing.s};
  border-radius: 18px;

  color: ${({ selected }) => (selected ? COLORS.white.normal : COLORS.primary.normal)};

  background: ${({ selected }) => (selected ? COLORS.primary.normal : COLORS.primary.lighter)};

  font-size: 14px;
  line-height: 20px;

  ${({ selected }) =>
    !selected &&
    `
      ${StyledItem}:hover & {
        border: 1px solid ${COLORS.primary.light};
      }
    `}
`

const StyledText = styled(Text)`
  color: ${COLORS.gray[900]};
`

const MediaType = ({ selected, label, image_src, image_alt, title, text }) => (
  <StyledItem selected={selected}>
    {label && (
      <LabelContainer>
        <LabelContent bold selected={selected}>
          {label}
        </LabelContent>
      </LabelContainer>
    )}
    <img src={image_src} alt={image_alt} className="mb-m" />
    <Text bold block className="mb-xxs">
      {title}
    </Text>
    {text && <StyledText>{text}</StyledText>}
  </StyledItem>
)

MediaType.propTypes = {
  selected: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
  label: PropTypes.string,
  image_src: PropTypes.string.isRequired,
  image_alt: PropTypes.string.isRequired,
}

export { MediaType }
