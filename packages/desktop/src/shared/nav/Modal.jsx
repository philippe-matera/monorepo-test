import PropTypes from 'prop-types'
import React, { useState } from 'react'

import { ModalWithTitle } from 'shared/nav/modal/ModalWithTitle'

const Modal = props => {
  const [show, setShow] = useState(props.initially_shown)

  const handleShowModal = e => {
    if (props.stop_propagation) e.stopPropagation()

    setShow(true)
  }

  const handleHideModal = () => {
    if (props.onHide) props.onHide()

    setShow(false)
  }

  let modal = null
  if (show) {
    const WrappedComponent = props.wrapped_component
    modal = (
      <ModalWithTitle
        title={props.modal_props.title}
        subtitle={props.modal_props.subtitle}
        small={props.modal_props.small}
        onHide={handleHideModal}
      >
        <WrappedComponent {...props.wrapped_props} onHide={handleHideModal} />
      </ModalWithTitle>
    )
  }

  if (!props.children) return modal

  return props.children({ modal, showModal: handleShowModal })
}

Modal.propTypes = {
  wrapped_component: PropTypes.func.isRequired,
  wrapped_props: PropTypes.shape({
    onSuccess: PropTypes.func,
  }),
  modal_props: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    small: PropTypes.bool,
  }),
  initially_shown: PropTypes.bool,
  stop_propagation: PropTypes.bool,
  onHide: PropTypes.func,
}

Modal.defaultProps = {
  initially_shown: false,
  modal_props: {},
  wrapped_props: {},
  stop_propagation: false,
}

export { Modal }
