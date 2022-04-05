import { connect, getIn } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import _ from 'underscore'

import { Text } from 'ui/typography/Text'

const List = styled.ul`
  list-style: none;

  padding-left: 0;
`

const ConnectedErrorList = ({ formik }) => {
  const displayedErrors = _.filter(
    formik.errors,
    (error, key) => !!error && getIn(formik.touched, key),
  )

  if (_.isEmpty(displayedErrors)) return null

  return (
    <List>
      {_.map(_.flatten(displayedErrors), (error, key) => (
        <li key={key}>
          <Text color="danger">{typeof error === 'object' ? Object.values(error)[0] : error}</Text>
        </li>
      ))}
    </List>
  )
}

ConnectedErrorList.propTypes = {
  formik: PropTypes.shape({
    errors: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    touched: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  }).isRequired,
}

ConnectedErrorList.defaultProps = {}

const ErrorList = connect(ConnectedErrorList)
export { ErrorList }
