import { Form } from 'formik'
import PropTypes from 'prop-types'
import React, { useState } from 'react'

import { HoverContext } from 'shared/form/formik/hoverize_form/HoverContext'

const HoverizeForm = ({ children }) => {
  const [hovered_name, setHoveredName] = useState(null)

  return (
    <HoverContext.Provider value={{ active: true, hovered_name, setHoveredName }}>
      <Form>{children}</Form>
    </HoverContext.Provider>
  )
}

HoverizeForm.propTypes = {
  children: PropTypes.node,
}

export { HoverizeForm }
