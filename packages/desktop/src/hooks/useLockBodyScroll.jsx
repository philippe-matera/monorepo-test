import { useLayoutEffect } from 'react'

const useLockBodyScroll = lock =>
  useLayoutEffect(() => {
    if (!lock) return undefined

    // Get original body overflow
    const original_style = window.getComputedStyle(document.body).overflow
    // Prevent scrolling on mount
    document.body.style.setProperty('overflow', 'hidden', 'important')

    // Re-enable scrolling when component unmounts
    return () => (document.body.style.overflow = original_style)
  }, [lock])

export { useLockBodyScroll }
