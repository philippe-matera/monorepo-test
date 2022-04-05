import { useCallback, useState } from 'react'

const useAsyncState = (initial_state, init_loading) => {
  let initial_loading = init_loading

  if (initial_loading === undefined) initial_loading = true
  const [state, setState] = useState({ internal_state: initial_state, loading: initial_loading })

  const setInternalState = useCallback(
    (...args) => {
      const loading = args[1] || false
      if (typeof args[0] === 'function') {
        setState(({ internal_state }) => ({ internal_state: args[0](internal_state), loading }))
      } else {
        const [internal_state] = args
        setState({ internal_state, loading })
      }
    },
    [setState],
  )

  // eslint-disable-next-line no-shadow
  const setLoading = useCallback((loading = true) => setState(state => ({ ...state, loading })), [])

  return [state.internal_state, state.loading, setInternalState, setLoading]
}

export default useAsyncState
