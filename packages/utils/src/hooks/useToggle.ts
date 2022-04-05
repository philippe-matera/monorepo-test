import {useState, useCallback} from "react"

export const useToggle = (initial_value = false): [boolean, (arg?: boolean) => void] => {
  const [bool, setBool] = useState(initial_value)

  const toggleBool = useCallback((arg?: boolean) => {
    setBool(bool => (typeof arg === "boolean" ? arg : !bool))
  }, [])

  return [bool, toggleBool]
}
