import { COLORS } from '@matera-tech/utils'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledMenu = styled.ul`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 8px 16px 1px ${COLORS.gray[1000]}1A, 0px 4px 8px 1px ${COLORS.gray[1000]}1A,
    0px 0px 0px 1px ${COLORS.gray[1000]}1A;
  list-style: none;
  text-shadow: none;

  z-index: 1000;
  display: block;

  max-height: 50vh;
  min-width: max-content;

  font-size: 14px;
  font-weight: 400;
  overflow-y: auto;
  overflow-y: overlay;

  text-align: left;

  padding: 8px 0;
  ${({ show }) => !show && 'display: none;'}
`

const Menu = ({ items, show, menu_ref, container_ref, style, placement, onClick }) => (
    <div ref={container_ref} style={{ ...style, zIndex: 1000 }} data-placement={placement}>
      <StyledMenu show={show} ref={menu_ref} onClick={onClick}>
        {items}
      </StyledMenu>
    </div>
  )

Menu.propTypes = {
  items: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  show: PropTypes.bool.isRequired,
  menu_ref: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  container_ref: PropTypes.func,
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  placement: PropTypes.string,
  onClick: PropTypes.func.isRequired,
}

export { Menu }
