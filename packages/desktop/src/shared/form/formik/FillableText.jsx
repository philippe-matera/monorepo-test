import { getIn, useFormikContext } from 'formik'
import PropTypes from 'prop-types'
import React, { useCallback, useContext } from 'react'

import useActiveHover from 'hooks/useActiveHover'
import { HoverContext } from 'shared/form/formik/hoverize_form/HoverContext'
import { FillableText as BaseFillableText } from 'ui/forms/FillableText'
import { FormikUtils } from 'utils/FormikUtils'

const FillableText = ({ name, getDisplayedValue, ...props }) => {
  const formik = useFormikContext()
  const { active, hovered_name, setHoveredName } = useContext(HoverContext)
  const setHover = useCallback(hover => setHoveredName(hover ? name : null), [name, setHoveredName])
  const [hover_ref] = useActiveHover(setHover, active)

  let value = getIn(formik.values, name)
  const is_value_empty = value === undefined || value === '' || value === null
  if (getDisplayedValue && !is_value_empty) value = getDisplayedValue(value)

  const setFieldTouched = () => formik.setFieldTouched(name)

  return (
    <BaseFillableText
      ref={hover_ref}
      name={name}
      value={value}
      error={FormikUtils.isError(formik, name)}
      hover={hovered_name === name}
      onHide={setFieldTouched}
      {...props}
    />
  )
}

FillableText.propTypes = {
  name: PropTypes.string.isRequired,
  getDisplayedValue: PropTypes.func,
}

export { FillableText }
