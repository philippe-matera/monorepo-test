import { COLORS } from '@matera-tech/utils'
import PropTypes from 'prop-types'
import React, { useCallback, useRef, useState } from 'react'
import { Manager, Reference } from 'react-popper'
import styled from 'styled-components'

import useOnOutsideClick from 'hooks/useOnOutsideClick'
import { Button } from 'ui/buttons/Button'
import { Divider } from 'ui/dropdowns/components/Divider'
import { Item } from 'ui/dropdowns/components/Item'
import { MenuInTargetPortal } from 'ui/dropdowns/components/MenuInTargetPortal'
import { Title } from 'ui/dropdowns/components/Title'
import { Icon } from 'ui/icons/Icon'
import { Utils } from 'utils/Utils'

const Container = styled.div`
  display: inline-flex;

  > :first-child {
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
  }
`

const CaretButton = styled(Button)`
  border-left: 1px solid ${COLORS.primary.dark};
  padding-right: 4px;
  padding-left: 4px;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
`

const DropdownButtonGroup = ({ children, items, ...props }) => {
  const [show_menu, setShowMenu] = useState(false)
  const menu_ref = useRef(null)
  const caret_ref = useRef(null)
  const parent_ref = useRef(null)

  const toggleShowMenu = useCallback(() => setShowMenu(state => !state), [setShowMenu])
  const hideMenu = useCallback(() => setShowMenu(false), [setShowMenu])

  useOnOutsideClick(menu_ref, hideMenu, [caret_ref])

  if (Utils.isBlankNode(items)) return children

  return (
    <Container ref={parent_ref}>
      {children}

      <Manager>
        <Reference>
          {({ ref }) => (
            <span ref={ref}>
              <CaretButton ref={caret_ref} {...props} onClick={toggleShowMenu}>
                <Icon name="expand_more" />
              </CaretButton>
            </span>
          )}
        </Reference>

        <MenuInTargetPortal
          items={items}
          show_menu={show_menu}
          menu_ref={menu_ref}
          onClick={toggleShowMenu}
          target_ref={parent_ref}
        />
      </Manager>
    </Container>
  )
}

DropdownButtonGroup.propTypes = {
  children: PropTypes.node.isRequired,
  items: PropTypes.node,
}

DropdownButtonGroup.Item = Item
DropdownButtonGroup.Divider = Divider
DropdownButtonGroup.Title = Title

export { DropdownButtonGroup }
