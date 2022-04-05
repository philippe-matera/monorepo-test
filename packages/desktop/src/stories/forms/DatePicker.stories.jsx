import { Formik } from 'formik'
import React from 'react'

import { DatePicker } from 'shared/form/formik/DatePicker'
import { UIContext } from 'src/UIContext'

// eslint-disable-next-line react/prop-types
const Template = ({ story_errors, locale, ...args }) => (
  <UIContext.Provider value={{ locale }}>
    <Formik
      initialValues={{ value: '' }}
      initialErrors={{ value: 'Required!' }}
      initialTouched={{ value: story_errors || false }}
    >
      <DatePicker {...args} />
    </Formik>
  </UIContext.Provider>
)

const Basic = Template.bind({})
Basic.args = {
  name: 'value',
  locale: 'fr',
}

const Error = Template.bind({})
Error.args = {
  ...Basic.args,
  story_errors: true,
}

const AllDatesFeatures = Template.bind({})
AllDatesFeatures.args = {
  ...Basic.args,
  minDate: new Date('2020-10-15'),
  maxDate: new Date('2021-01-15'),
  showMonthDropdown: true,
  showYearDropdown: true,
}

const AllDatesFeaturesGerman = Template.bind({})
AllDatesFeaturesGerman.args = {
  ...AllDatesFeatures.args,
  locale: 'de',
}

const DateAndTime = Template.bind({})
DateAndTime.args = {
  ...Basic.args,
  showTimeSelect: true,
  dateFormat: 'dd MMMM yyyy, HH:mm',
}

const TimeOnly = Template.bind({})
TimeOnly.args = {
  ...Basic.args,
  showTimeSelect: true,
  showTimeSelectOnly: true,
  dateFormat: 'HH:mm',
}

export default {
  title: 'Form/DatePicker',
  component: DatePicker,
}

export { Basic, Error, AllDatesFeatures, AllDatesFeaturesGerman, DateAndTime, TimeOnly }
