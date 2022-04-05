import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { CONSTANTS } from 'src/constants'
import { ListItem } from 'ui/checklists/components/ListItem'

const StyledChecklist = styled.ul`
  display: inline-block !important;

  margin: 0;
  padding: 0;

  text-align: left;

  & & {
    padding: 0 ${CONSTANTS.spacing.l};
  }

  & > * + * {
    margin-top: ${CONSTANTS.spacing.xs};
  }
`

const Checklist = ({ children, steps }) => {
  const listItems = steps.map(step => <ListItem key={step.key} {...step} />)

  return <StyledChecklist>{children || listItems}</StyledChecklist>
}

Checklist.propTypes = {
  children: PropTypes.element,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
    }).isRequired,
  ),
}

Checklist.defaultProps = {
  steps: [],
}

export { Checklist }
