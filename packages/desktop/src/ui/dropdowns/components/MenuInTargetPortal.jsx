import PropTypes from 'prop-types'
import { useState } from 'react'
import { usePopper } from 'react-popper'

import { Menu } from 'ui/dropdowns/components/Menu'

const MenuInTargetPortal = ({ placement, items, target_ref, show_menu, menu_ref, onClick }) => {
  const [popperElement, setPopperElement] = useState(null)
  const { styles } = usePopper(target_ref, popperElement, {
    modifiers: [{ name: 'preventOverflow', options: {
      rootBoundary: 'document',
    }, }],
    placement,
  })
  let customStyles = {
    position: styles.popper.position,
    left: styles.popper.left,
  }
  if (placement === 'right') customStyles = {
    ...customStyles,
    left: '',
    right: '0'
  }

  return (
    <Menu
      ref={setPopperElement}
      items={items}
      show={show_menu}
      menu_ref={menu_ref}
      onClick={onClick}
      container_ref={popperElement}
      style={customStyles}
      placement={placement}
    />
  )
}

MenuInTargetPortal.defaultPropTypes = {
  placement: 'bottom-start',
}

MenuInTargetPortal.propTypes = {
  items: PropTypes.node,
  show_menu: PropTypes.bool,
  menu_ref: PropTypes.oneOf([null]),
  onClick: PropTypes.func,
  placement: PropTypes.string,
}

export { MenuInTargetPortal }
