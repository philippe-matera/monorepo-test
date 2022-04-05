import { COLORS } from '@matera-tech/utils'
import PropTypes from 'prop-types'
import { useCallback, useRef, useState } from 'react'
import { Manager, Reference } from 'react-popper'
import styled from 'styled-components'

import useOnOutsideClick from 'hooks/useOnOutsideClick'
import { Divider } from 'ui/dropdowns/components/Divider'
import { Item } from 'ui/dropdowns/components/Item'
import { MenuInTargetPortal } from 'ui/dropdowns/components/MenuInTargetPortal'
import { Title } from 'ui/dropdowns/components/Title'
import { Icon } from 'ui/icons/Icon'
import { Clickable } from 'ui/links/Clickable'
import { Ninja } from 'ui/wrappers/Ninja'
import { Utils } from 'utils/Utils'

const StyledIcon = styled(Icon)`
  vertical-align: initial;
`

const StyledClikable = styled(Clickable)`
  color: ${COLORS.primary.normal};
  font-weight: 500;

  &:hover {
    color: ${COLORS.primary.hover};
  }
  &:active,
  &:focus {
    color: ${COLORS.primary.dark};
  }
`

const DropdownLink = ({ children, items, no_icon, placement, ...props }) => {
  const [show_menu, setShowMenu] = useState(false)
  const menu_ref = useRef(null)
  const link_ref = useRef(null)
  const parent_ref = useRef(null)

  const toggleShowMenu = useCallback(() => setShowMenu(state => !state), [setShowMenu])
  const hideMenu = useCallback(() => setShowMenu(false), [setShowMenu])

  useOnOutsideClick(menu_ref, hideMenu, [link_ref])

  if (Utils.isBlankNode(items)) return children

  return (
    <Ninja ref={parent_ref}>
      <Manager>
        <Reference>
          {({ ref }) => (
            <span ref={ref}>
              <StyledClikable ref={link_ref} {...props} onClick={toggleShowMenu} hover>
                {children}
                {!no_icon && <StyledIcon name="angle_down" space_before />}
              </StyledClikable>
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

DropdownLink.propTypes = {
  children: PropTypes.node.isRequired,
  items: PropTypes.node,
  no_icon: PropTypes.bool,
  placement: PropTypes.string,
}
DropdownLink.defaultProps = {
  placement: 'bottom-start',
}

DropdownLink.Item = Item
DropdownLink.Divider = Divider
DropdownLink.Title = Title

export { DropdownLink }
