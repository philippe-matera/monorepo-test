import PropTypes from 'prop-types'
import React, { useCallback, useRef, useState } from 'react'
import { Manager, Reference } from 'react-popper'

import { useLockBodyScroll } from 'hooks/useLockBodyScroll'
import useOnOutsideClick from 'hooks/useOnOutsideClick'
import { Button } from 'ui/buttons/Button'
import { Divider } from 'ui/dropdowns/components/Divider'
import { Item } from 'ui/dropdowns/components/Item'
import { MenuInTargetPortal } from 'ui/dropdowns/components/MenuInTargetPortal'
import { Title } from 'ui/dropdowns/components/Title'
import { Icon } from 'ui/icons/Icon'
import { Ninja } from 'ui/wrappers/Ninja'

const DropdownButton = ({ children, items, placement, prioritize_item_title, ...props }) => {
  const [show_menu, setShowMenu] = useState(false)
  const menu_ref = useRef(null)
  const button_ref = useRef(null)
  const parent_ref = useRef(null)

  const toggleShowMenu = useCallback(() => setShowMenu(state => !state), [setShowMenu])
  const hideMenu = useCallback(() => setShowMenu(false), [setShowMenu])

  useOnOutsideClick(menu_ref, hideMenu, [button_ref])
  useLockBodyScroll(show_menu)

  if (Array.isArray(items)) {
    const real_items = items.filter(item => item?.type === Item) // Ignore falsy, Divider and Title
    if (real_items.length === 0) return null

    if (real_items.length === 1) {
      return (
        <Button {...props} {...real_items[0].props}>
          {prioritize_item_title ? real_items[0].props.children : children}
        </Button>
      )
    }
  }

  return (
    <Ninja ref={parent_ref}>
      <Manager>
        <Reference>
          {({ ref }) => (
            <span ref={ref}>
              <Button active={show_menu} ref={button_ref} {...props} onClick={toggleShowMenu}>
                {children}
                <Icon name="angle_down" space_before />
              </Button>
            </span>
          )}
        </Reference>

        <MenuInTargetPortal
          items={items}
          show_menu={show_menu}
          menu_ref={menu_ref}
          onClick={toggleShowMenu}
          target_ref={parent_ref}
          placement={placement}
        />
      </Manager>
    </Ninja>
  )
}

DropdownButton.propTypes = {
  children: PropTypes.node.isRequired,
  items: PropTypes.node.isRequired,
  color: PropTypes.string,
  placement: PropTypes.string,
  prioritize_item_title: PropTypes.bool,
}
DropdownButton.defaultProps = {
  color: 'success',
  placement: 'bottom-end',
  prioritize_item_title: false,
}

DropdownButton.Item = Item
DropdownButton.Divider = Divider
DropdownButton.Title = Title

export { DropdownButton }
