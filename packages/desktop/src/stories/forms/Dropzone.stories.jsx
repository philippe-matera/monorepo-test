import { Formik } from 'formik'
import React from 'react'

import { Dropzone } from 'shared/form/formik/Dropzone'
import { UIContext } from 'src/UIContext'

// eslint-disable-next-line react/prop-types
const Template = ({ story_errors, locale, ...args }) => (
  <UIContext.Provider value={{ locale }}>
    <Formik
      initialValues={{ value: '' }}
      initialErrors={{ value: 'Required!' }}
      initialTouched={{ value: story_errors || false }}
    >
      <Dropzone {...args} />
    </Formik>
  </UIContext.Provider>
)

const Basic = Template.bind({})
Basic.args = {
  name: 'value',
  pdf: true,
  images: true,
  word: true,
  excel: true,
  locale: 'fr',
}

const German = Template.bind({})
German.args = {
  ...Basic.args,
  locale: 'de',
}

const Error = Template.bind({})
Error.args = {
  ...Basic.args,
  story_errors: true,
}

export default {
  title: 'Form/Dropzone',
  component: Dropzone,
}

export { Basic, German, Error }
