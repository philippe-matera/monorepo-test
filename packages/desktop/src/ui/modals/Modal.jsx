import PropTypes from 'prop-types'
import React, { useRef } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import { useLockParentScroll } from 'hooks/useLockParentScroll'
import { CloseButton } from 'ui/icon_buttons/CloseButton'
import { Container } from 'ui/modals/components/Container'

const StyledCloseButton = styled(CloseButton)`
  position: absolute;
  z-index: 1;

  top: 24px;
  right: 24px;
`

// https://github.com/facebook/react/issues/11387
const Modal = ({ children, onHide, small }) => {
  const ref = useRef(null)
  useLockParentScroll(true, ref)

  const portal_container = document.getElementById('full-page-modal') || document.body

  return ReactDOM.createPortal(
    <Container ref={ref} small={small}>
      {/* eslint-disable-next-line */}
      <div
        className="modal-matera"
        onClick={e => {
          e.stopPropagation()
        }}
      >
        {!!onHide && <StyledCloseButton onClick={onHide} />}
        {children}
      </div>
    </Container>,
    portal_container,
  )
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onHide: PropTypes.func,
}

Modal.Container = Container

export { Modal }
