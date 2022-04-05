import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { SearchButton as SearchIconButton } from 'ui/icon_buttons/SearchButton'

const StyledContainer = styled.div`
  position: relative;
`

const StyledButton = styled.div`
  position: absolute;

  top: -29px;
  right: 12px;
`

const SearchButton = ({ ...props }) => (
  <StyledContainer>
    <StyledButton>
      <SearchIconButton {...props} />
    </StyledButton>
  </StyledContainer>
)

SearchButton.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export { SearchButton }
