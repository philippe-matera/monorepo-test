import { COLORS } from '@matera-tech/utils'
import PropTypes from 'prop-types'
import React, { useCallback, useRef, useState } from 'react'
import { Manager, Reference } from 'react-popper'
import styled from 'styled-components'

import useOnOutsideClick from 'hooks/useOnOutsideClick'
import { CONSTANTS } from 'src/constants'
import { Button } from 'ui/buttons/Button'
import { Divider } from 'ui/dropdowns/components/Divider'
import { Item } from 'ui/dropdowns/components/Item'
import { MenuInTargetPortal } from 'ui/dropdowns/components/MenuInTargetPortal'
import { Title } from 'ui/dropdowns/components/Title'
import { Icon } from 'ui/icons/Icon'
import { Ninja } from 'ui/wrappers/Ninja'

const Ellipsis = styled(Button)`
  border-radius: ${CONSTANTS.spacing.xxs};
  width: 40px;
  height: 40px;
  font-size: 14px;
  font-weight: 400;
  padding: 4px 10px;
`

const StyleColorIcon = styled(Icon)`
  color: ${COLORS.gray[700]};
`

const DropdownEllipsis = ({ items, color }) => {
  const [show_menu, setShowMenu] = useState(false)
  const menu_ref = useRef(null)
  const ellipsis_ref = useRef(null)
  const parent_ref = useRef(null)

  const toggleShowMenu = useCallback(
    e => {
      e.stopPropagation()
      setShowMenu(state => !state)
    },
    [setShowMenu],
  )
  const hideMenu = useCallback(() => setShowMenu(false), [setShowMenu])

  useOnOutsideClick(menu_ref, hideMenu, [ellipsis_ref])

  return (
    <Ninja ref={parent_ref}>
      <Manager>
        <Reference>
          {({ ref }) => (
            <span ref={ref}>
              <Ellipsis ref={ellipsis_ref} color={color} onClick={toggleShowMenu}>
                <StyleColorIcon name="ellipsis_h" />
              </Ellipsis>
            </span>
          )}
        </Reference>

        <MenuInTargetPortal
          items={items}
          show_menu={show_menu}
          menu_ref={menu_ref}
          onClick={toggleShowMenu}
          target_ref={parent_ref}
          placement="bottom-end"
        />
      </Manager>
    </Ninja>
  )
}
DropdownEllipsis.propTypes = {
  items: PropTypes.node.isRequired,
  color: PropTypes.oneOf(['admin', 'default']),
}

DropdownEllipsis.defaultProps = {
  color: 'default',
}

DropdownEllipsis.Item = Item
DropdownEllipsis.Divider = Divider
DropdownEllipsis.Title = Title

export { DropdownEllipsis }
