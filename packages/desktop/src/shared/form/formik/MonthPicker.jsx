import PropTypes from 'prop-types'
import React from 'react'

import { useLocalizedDate } from 'hooks/useLocalizedDate'
import { Select } from 'shared/form/formik/Select'

const MonthPicker = props => {

  const {format} = useLocalizedDate()
  const date_options = []

  const start_date = new Date()
  for (let i = 0; i < 10 * 12 + 1; i++) {

    date_options.push({
      value: `${format(start_date, "yyyy-MM")}-01`,
      label: format(start_date, "MMMM yyyy"),
    })
    start_date.setMonth(start_date.getMonth() - 1)
  }

  return <Select name={props.name} placeholder={props.placeholder} options={date_options} />
}

MonthPicker.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
}

export { MonthPicker }
