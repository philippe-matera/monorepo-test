import { useCallback, useEffect } from 'react'
import _ from 'underscore'

const useOnOutsideClick = (ref, callback, excluded_refs = []) => {
  const handleClickOutside = useCallback(
    e => {
      if (
        callback &&
        ref.current &&
        !ref.current.contains(e.target) &&
        !_.any(
          excluded_refs,
          excluded_ref => excluded_ref.current && excluded_ref.current.contains(e.target),
        )
      ) {
        return callback()
      }

      return null
    },
    [callback, excluded_refs, ref],
  )

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handleClickOutside])
}

export default useOnOutsideClick
