import { createContext } from 'react'

const DropzoneDragContext = createContext({
  isDragActive: false,
  isDragOverDropzone: false,
  setIsDragOverDropzone: () => undefined,
})

export { DropzoneDragContext }
