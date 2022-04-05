import { Formik } from 'formik'
import React from 'react'

import { TypePicker } from 'shared/form/formik/TypePicker'

// eslint-disable-next-line react/prop-types
const Template = ({ story_errors, ...args }) => (
  <Formik
    initialValues={{ value: '' }}
    initialErrors={{ value: 'Required!' }}
    initialTouched={{ value: story_errors || false }}
  >
    <TypePicker {...args} />
  </Formik>
)

const Basic = Template.bind({})
Basic.args = {
  name: 'value',
  available_types: [
    {
      value: '1',
      label: 'Option 1',
      description: 'Lorem Ipsum',
      image_src: 'images/avatar/picture.jpg',
      image_alt: 'Image alt',
    },
    null,
    undefined,
    false,
    {
      value: '2',
      label: 'Option 2',
      description: 'Lorem Ipsum',
      image_src: 'images/avatar/picture.jpg',
    },
    {
      value: '3',
      label: 'Option 3',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non eleifend metus, pretium bibendum arcu. Sed non varius eros',
      image_src: 'images/avatar/picture.jpg',
    },
  ],
}

const Detailed = Template.bind({})
Detailed.args = {
  ...Basic.args,
  detailed: true,
}

const DetailedList = Template.bind({})
DetailedList.args = {
  name: 'value',
  available_types: [
    {
      value: '1',
      label: 'Option 1',
    },
    { value: '2', label: 'Option 2' },
    {
      value: '3',
      label: 'Option 3',
    },
  ],
  detailed: true,
  full_width: true,
}

const Media = Template.bind({})
Media.args = {
  ...Basic.args,
  media: true,
}

const Error = Template.bind({})
Error.args = {
  ...Basic.args,
  story_errors: true,
}

const Disabled = Template.bind({})
Disabled.args = {
  ...Basic.args,
  disabled: true,
}

export default {
  title: 'Form/TypePicker',
  component: TypePicker,
}

export { Basic, Detailed, DetailedList, Media, Error, Disabled }
