import { createContext } from 'react'

const DEFAULT_CONTEXT = {
  country: 'fr',
  locale: 'fr',
}

const UIContext = createContext(DEFAULT_CONTEXT)
UIContext.DEFAULT_CONTEXT = DEFAULT_CONTEXT

export { UIContext }
