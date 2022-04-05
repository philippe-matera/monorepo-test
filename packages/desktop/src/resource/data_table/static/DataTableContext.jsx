import { createContext } from 'react'

const DataTableContext = createContext({
  columns: [],
  filters: {},
  sorting: {
    column: null,
    direction: null,
  },
})

export { DataTableContext }
