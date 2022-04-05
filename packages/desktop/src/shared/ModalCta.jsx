import PropTypes from 'prop-types'
import React, { cloneElement } from 'react'

import { Modal } from 'shared/nav/Modal'

const ModalCta = props => (
  <Modal
    wrapped_component={props.wrappedComponent}
    wrapped_props={props.wrappedProps}
    modal_props={props.modalProps}
    stop_propagation={props.stop_propagation}
    initially_shown={props.initially_shown}
    onHide={props.onHide}
  >
    {({ modal, showModal }) => (
      <>
        {modal}
        {cloneElement(props.children, {
          disabled: props.children.disabled || props.disabled,
          onClick: props.disabled ? () => 0 : showModal,
        })}
      </>
    )}
  </Modal>
)

ModalCta.propTypes = {
  disabled: PropTypes.bool,
  wrappedComponent: PropTypes.func.isRequired,
  wrappedProps: PropTypes.shape({
    onSuccess: PropTypes.func,
  }),
  modalProps: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    small: PropTypes.bool,
  }),
  children: PropTypes.element.isRequired,
  initially_shown: PropTypes.bool,
  stop_propagation: PropTypes.bool,
  onHide: PropTypes.func,
}

ModalCta.defaultProps = {
  initially_shown: false,
  modalProps: {},
  wrappedProps: {},
  stop_propagation: false,
}

export { ModalCta }
