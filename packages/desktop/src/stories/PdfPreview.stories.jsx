import React from 'react'

import { PdfPreview } from 'ui/previews/PdfPreview'

const Template = args => <PdfPreview {...args} />

const Basic = Template.bind({})
Basic.args = {
  name: 'archives.pdf',
}

export default {
  title: 'PdfPreview',
  component: PdfPreview,
}
export { Basic }
