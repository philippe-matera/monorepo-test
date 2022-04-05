import { useLayoutEffect } from 'react'

const useLockParentScroll = (lock, ref) =>
  useLayoutEffect(() => {
    if (!lock) return undefined

    const element = ref?.current?.parentElement
    if (!element) return undefined

    // Get original element overflow
    const original_style = window.getComputedStyle(element).overflow
    // Prevent scrolling on mount
    element.style.setProperty('overflow', 'hidden', 'important')

    // Re-enable scrolling when component unmounts
    return () => (element.style.overflow = original_style)
  }, [lock, ref])

export { useLockParentScroll }
