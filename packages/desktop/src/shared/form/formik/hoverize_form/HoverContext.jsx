import { createContext } from 'react'

const HoverContext = createContext({
  active: false,
  hovered_name: null,
  setHoveredName: () => null,
})

export { HoverContext }
