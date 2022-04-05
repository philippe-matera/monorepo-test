import PropTypes from 'prop-types'
import { forwardRef } from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'

const AbstractClickableElement = forwardRef(
  ({ children, disabled, href, to, onClick, type, ...optional_props }, ref) => {
    const is_link = href || to

    const link_props = {
      onKeyUp: event => event.key === ' ' && event.target.click(),
      ...(href && {
        Component: 'a',
        href,
        // See: https://www.jitbit.com/alexblog/256-targetblank
        //
        // `noreferrer` is now supported by every mainstream browser and should
        // not be used since it can disturb analytics scripts.
        // https://caniuse.com/#feat=rel-noopener
        rel: 'noopener',
        target: '_blank',
      }),
      ...(to && {
        Component: ReactRouterLink,
        to,
      }),

      ...(disabled && {
        href: undefined,
        to: undefined,
        onClick: event => {
          event.stopPropagation()
          event.preventDefault()
        },
        onKeyUp: undefined,
        tabIndex: -1,
      }),
    }

    const button_props = {
      Component: 'button',
      type,
    }

    const { Component, ...props } = is_link ? link_props : button_props

    return (
      <Component {...optional_props} disabled={disabled} onClick={onClick} {...props} ref={ref}>
        {children}
      </Component>
    )
  },
)

AbstractClickableElement.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  to: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      pathname: PropTypes.string,
      search: PropTypes.string,
      hash: PropTypes.string,
      // eslint-disable-next-line react/forbid-prop-types
      state: PropTypes.object, // can contain anything, defined by a developer
    }),
  ]),
  onClick: PropTypes.func,
  children: PropTypes.node,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
}

AbstractClickableElement.defaultProps = {
  type: 'button',
}

export { AbstractClickableElement }
