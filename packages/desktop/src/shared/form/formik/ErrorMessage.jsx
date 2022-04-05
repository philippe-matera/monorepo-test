import { COLORS } from '@matera-tech/utils'
import { ErrorMessage as FormikErrorMessage } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { CONSTANTS } from 'src/constants'
import { Icon } from 'ui/icons/Icon'

const StyledErrorMessage = styled.span`
  color: ${COLORS.danger.normal};

  display: block;

  font-size: 11px;

  padding: 0;

  ${({ inline }) =>
    inline &&
    `
    display: inline-block;
    padding-left: ${CONSTANTS.spacing.s};
    vertical-align: text-top;

    &:empty {
      display: none;
    }
  `}

  ${({ remove_min_height, sm }) =>
    !remove_min_height &&
    `
    min-height: ${sm ? '15' : '20'}px;
  `}
`

const ErrorMessage = ({ name, sm, remove_min_height, hidden, icon, inline }) => {
  if (hidden) return null

  return (
    <StyledErrorMessage
      data-cy="error"
      inline={inline}
      sm={sm}
      remove_min_height={remove_min_height}
    >
      <FormikErrorMessage name={name}>
        {msg =>
          typeof msg === 'string' && (
            <>
              <Icon name="exclamation_triangle" space_after={!icon} />
              {icon || msg}
            </>
          )
        }
      </FormikErrorMessage>
    </StyledErrorMessage>
  )
}

ErrorMessage.propTypes = {
  icon: PropTypes.bool,
  inline: PropTypes.bool,
  name: PropTypes.string,
  sm: PropTypes.bool,
  remove_min_height: PropTypes.bool,
  hidden: PropTypes.bool,
}

ErrorMessage.defaultProps = {
  icon: false,
  inline: false,
  sm: false,
  remove_min_height: false,
  hidden: false,
}

export { ErrorMessage }
