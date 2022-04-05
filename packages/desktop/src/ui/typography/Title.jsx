import PropTypes from 'prop-types'
import React from 'react'

import H2 from 'ui/typography/components/H2'
import H3 from 'ui/typography/components/H3'
import H4 from 'ui/typography/components/H4'
import H5 from 'ui/typography/components/H5'
import H6 from 'ui/typography/components/H6'

const Title = {
  H2,
  H3,
  H4,
  H5,
  H6,
}

const DynamicTitle = ({ size, ...props }) => {
  const TitleComponent = Title[`H${size}`]

  return <TitleComponent {...props} />
}

DynamicTitle.propTypes = {
  size: PropTypes.oneOf(['2', '3', '4', '5', '6']).isRequired,
}

export { Title, DynamicTitle }
