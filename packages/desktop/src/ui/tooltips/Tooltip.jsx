import PropTypes from 'prop-types'
import React from 'react'
import { Tooltip as TippyTooltip } from 'react-tippy'

import { Button } from 'ui/buttons/Button'
import { Text } from 'ui/typography/Text'
import { Title } from 'ui/typography/Title'
import { Block } from 'ui/wrappers/Block'

const Tooltip = ({ children, title, text, button, image, html, ...props }) => {
  const simple = text && !title && !button && !image?.url

  const custom_html = (
    <Block className={`tooltip-${simple ? 'simple' : 'complex'}`}>
      {image?.url && <img src={image.url} alt={image.alt} />}
      {title && (
        <Block>
          <Title.H6>{title}</Title.H6>
        </Block>
      )}
      {text && (
        <Block>
          <Text small>{text}</Text>
        </Block>
      )}
      {button?.url && (
        <Button block color="default" href={button.url}>
          {button.text}
        </Button>
      )}
    </Block>
  )

  const default_html = <Block className="tooltip-default">{html}</Block>

  return (
    <TippyTooltip
      className="tooltip-wrapper"
      html={html ? default_html : custom_html}
      animateFill={false}
      animation="shift"
      {...props}
    >
      {children}
    </TippyTooltip>
  )
}

Tooltip.propTypes = {
  size: PropTypes.oneOf(['small', 'regular', 'big']),
  position: PropTypes.oneOf(['top', 'left', 'right', 'bottom']),
  theme: PropTypes.oneOf(['dark', 'light', 'transparent']),
  interactive: PropTypes.bool,
  children: PropTypes.node.isRequired,
  distance: PropTypes.number,

  html: PropTypes.node,
  title: PropTypes.string,
  text: PropTypes.string,
  image: PropTypes.shape({
    url: PropTypes.string,
    alt: PropTypes.string,
  }),
  button: PropTypes.shape({
    text: PropTypes.string,
    url: PropTypes.string,
  }),
}

Tooltip.defaultProps = {
  size: 'regular',
  position: 'top',
  theme: 'dark',
  interactive: false,
  distance: 4,
}

export { Tooltip }
