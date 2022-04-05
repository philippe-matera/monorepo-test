import PropTypes from 'prop-types'
import React from 'react'

import { Card } from 'ui/cards/Card'
import { Modal } from 'ui/modals/Modal'
import { Title } from 'ui/typography/Title'
import { Block } from 'ui/wrappers/Block'

const ModalWithTitle = ({ title, subtitle, small, onHide, children }) => (
  <Modal onHide={onHide} small={small}>
    <Card.Container>
      <Card.Content header>
        <Title.H5>{title}</Title.H5>
        {subtitle && (
          <Block>
            <Title.H6>{subtitle}</Title.H6>
          </Block>
        )}
      </Card.Content>
      {children}
    </Card.Container>
  </Modal>
)

ModalWithTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  small: PropTypes.bool,
  onHide: PropTypes.func,
  children: PropTypes.node.isRequired,
}

ModalWithTitle.defaultProps = {
  small: false,
}

export { ModalWithTitle }
