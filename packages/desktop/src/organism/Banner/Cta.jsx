import PropTypes from 'prop-types'
import styled from 'styled-components'

import { BannerContainer, Text } from 'src/atoms'
import { Button } from 'src/ui/buttons/Button'
import { Flex } from 'src/ui/flex/Flex'
import { CloseButton } from 'src/ui/icon_buttons/CloseButton'
import { Link } from 'src/ui/links/Link'
import { Block } from 'src/ui/wrappers/Block'
import { ButtonsWrapper } from 'src/ui/wrappers/ButtonsWrapper'

const FlexItem = styled(Flex.Item)`
  display: flex;
`

const FlexContainer = styled(Flex)`
  height: 100%;
`

const Cta = ({ title, content, onClose, image, primary_button_props, secondary_button_props }) => (
  <BannerContainer>
    <FlexContainer no_wrap item_wrapper>
      <FlexItem ratio={4}>
        <Flex direction="column" justify_content="space-between">
          <Block>
            <Block bottom="xs">
              <Text bold>{title}</Text>
            </Block>
            <Text>{content}</Text>
          </Block>
          <Block top="s">
            <ButtonsWrapper>
              <Button {...primary_button_props}>{primary_button_props.label}</Button>
              {secondary_button_props && (
                <Link {...secondary_button_props}>{secondary_button_props.label}</Link>
              )}
            </ButtonsWrapper>
          </Block>
        </Flex>
      </FlexItem>
      <Flex.Item ratio={image ? 1 : 0}>
        {onClose && (
          <Block pull_right>
            <CloseButton onClick={onClose} />
          </Block>
        )}

        {image && (
          <Block top={onClose ? 'l' : ''}>
            <img src={image.url} alt="" width={image.width} height={image.height} />
          </Block>
        )}
      </Flex.Item>
    </FlexContainer>
  </BannerContainer>
)

Cta.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  // Inherits from Button props
  primary_button_props: PropTypes.shape({
    label: PropTypes.string.isRequired,
    block: PropTypes.bool,
    className: PropTypes.string,
    color: PropTypes.oneOf(['primary', 'success', 'danger', 'default', 'tertiary', 'admin']),
    disabled: PropTypes.bool,
    disabled_tooltip: PropTypes.string,
    href: PropTypes.string,
    id: PropTypes.string,
    lg: PropTypes.bool,
    loading: PropTypes.bool,
    onClick: PropTypes.func,
    sm: PropTypes.bool,
    to: PropTypes.string,
    active: PropTypes.bool,
    // eslint-disable-next-line react/forbid-prop-types
    tooltip: PropTypes.any,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
  }).isRequired,
  onClose: PropTypes.func,
  image: PropTypes.shape({
    url: PropTypes.string.isRequired,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  // Inherits from Link props
  secondary_button_props: PropTypes.shape({
    label: PropTypes.string.isRequired,
    color: PropTypes.string,
    color_level: PropTypes.string,
    hover_color: PropTypes.string,
    hover_level: PropTypes.string,
    href: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    icon_before: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    to: PropTypes.string,
  }),
}

export { Cta }
