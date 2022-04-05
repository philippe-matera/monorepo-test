import { useCallback, useEffect, useRef } from 'react'

const useActiveHover = (setHover, active = true) => {
  const ref = useRef(null)

  const handleMouseEnter = useCallback(() => setHover(true), [setHover])
  const handleMouseLeave = useCallback(() => setHover(false), [setHover])

  useEffect(() => {
    const node = ref.current

    if (!node || !active) return () => undefined

    node.addEventListener('mouseenter', handleMouseEnter)
    node.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      node.removeEventListener('mouseenter', handleMouseEnter)
      node.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [active, handleMouseEnter, handleMouseLeave])

  return [ref]
}

export default useActiveHover
