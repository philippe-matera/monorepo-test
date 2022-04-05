import { COLORS, useToggle } from '@matera-tech/utils'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { VelocityTransitionGroup } from 'velocity-react'

import { CONSTANTS } from 'src/constants'
import { Card } from 'ui/cards/Card'
import { Flex } from 'ui/flex/Flex'
import { Icon } from 'ui/icons/Icon'
import { Clickable } from 'ui/links/Clickable'
import { Tag } from 'ui/tags/Tag'
import { Text } from 'ui/typography/Text'
import { DynamicTitle } from 'ui/typography/Title'
import { Block } from 'ui/wrappers/Block'

const ANIMATION_DURATION = 150
const DEFAULT_SHADOW =
  '0px 0px 0px 1px rgba(13, 22, 63, 0.1), 0px 4px 6px -2px rgba(13, 22, 63, 0.05)'
const ACTIVE_SHADOW =
  '0px 0px 0px 1px rgba(13, 22, 63, 0.1), 0px 6px 12px -2px rgba(13, 22, 63, 0.08)'

const StyledIcon = styled(Icon)`
  transition: transform ${ANIMATION_DURATION}ms ease-in-out;

  font-size: 24px;
  color: ${COLORS.primary.normal};

  margin-right: ${CONSTANTS.spacing.xs};
  user-select: none;

  ${({ open }) => open && 'transform: rotate(90deg);'};
`
const StyledFlexItem = styled(Flex.Item)`
  margin: 0;
`
const LightClickableCard = styled(Card.Content)`
  cursor: pointer;

  &:hover {
    color: ${COLORS.primary.normal};
  }
`
const ContentCard = styled(Card.Content)`
  padding-top: 0;
`
const ShadowedCardContainer = styled(Card.Container)`
  transition: box-shadow 100ms ease-in-out;

  box-shadow: ${DEFAULT_SHADOW};

  border: none;

  ${({ open }) =>
    open &&
    `
    box-shadow: ${ACTIVE_SHADOW};`};

  &:hover {
    box-shadow: ${ACTIVE_SHADOW};
  }
`
const StyledCurrentTitle = styled(DynamicTitle)`
  width: 100%;

  &:hover {
    color: ${COLORS.primary.normal};
  }
`

const Accordion = ({
  content,
  controlled,
  title,
  title_size,
  without_container,
  expanded,
  tag,
  tag_color,
  tag_content,
  content_top,
  crossed_title,
  onClick,
}) => {
  const [open, toggleOpen] = useToggle(expanded)

  const is_open = controlled ? expanded : open

  const MainContainer = without_container ? React.Fragment : ShadowedCardContainer
  const container_props = without_container ? {} : { open: is_open }
  const Wrapper = without_container ? Clickable : LightClickableCard
  const wrapper_props = without_container ? {} : { divider: false }

  const handleOnClick = () => {
    if (onClick) onClick(!is_open)
    if (!controlled) toggleOpen()
  }

  const expanded_content = without_container ? (
    <Block top={content_top} left="l">
      {content}
    </Block>
  ) : (
    <ContentCard>
      <Block left="l">{content}</Block>
    </ContentCard>
  )

  return (
    <MainContainer {...container_props}>
      <Wrapper {...wrapper_props} onClick={handleOnClick}>
        <Flex no_wrap align_items="center">
          <StyledIcon open={is_open} name="angle_right" />
          <StyledFlexItem>
            <Flex align_items="center">
              <StyledCurrentTitle size={title_size}>
                <Text crossed={crossed_title}>{title}</Text>
                {tag && (
                  <Block inline left="xs">
                    <Tag color={tag_color}>{tag_content}</Tag>
                  </Block>
                )}
              </StyledCurrentTitle>
            </Flex>
          </StyledFlexItem>
        </Flex>
      </Wrapper>
      <VelocityTransitionGroup
        enter={{ animation: 'slideDown', duration: ANIMATION_DURATION, easing: 'ease-in-out' }}
        leave={{ animation: 'slideUp', duration: ANIMATION_DURATION, easing: 'ease-in-out' }}
      >
        {is_open && expanded_content}
      </VelocityTransitionGroup>
    </MainContainer>
  )
}

Accordion.propTypes = {
  title: PropTypes.string.isRequired,
  title_size: PropTypes.oneOf(['2', '3', '4', '5', '6']),
  content: PropTypes.node.isRequired,
  without_container: PropTypes.bool,
  expanded: PropTypes.bool,
  tag: PropTypes.bool,
  tag_color: PropTypes.string,
  tag_content: PropTypes.string,
  content_top: PropTypes.oneOf(['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl']),
  crossed_title: PropTypes.bool,
  onClick: PropTypes.func,
}

Accordion.defaultProps = {
  title_size: '6',
  without_container: false,
  expanded: false,
  content_top: 's',
  crossed_title: false,
}

export { Accordion }
