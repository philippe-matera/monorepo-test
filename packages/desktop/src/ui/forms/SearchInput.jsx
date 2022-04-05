import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import useTranslation from 'hooks/useTranslation'
import { withBaseTranslationContext } from 'shared/withBaseTranslationContext'
import { Input } from 'ui/forms/Input'
import { TextInput } from 'ui/forms/TextInput'

const StyledInput = styled(Input)`
  ${({ max_width }) => max_width && 'max-width: 360px;'}
`

const TranslatedSearchInput = ({ max_width, ...props }) => {
  const { t } = useTranslation('general')

  return (
    <StyledInput icon="search" icon_left max_width={max_width}>
      <TextInput placeholder={t('general:search_input')} {...props} />
    </StyledInput>
  )
}

TranslatedSearchInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  max_width: PropTypes.bool,
}

TranslatedSearchInput.defaultProps = {
  name: 'search',
  max_width: true,
}

export const SearchInput = withBaseTranslationContext(TranslatedSearchInput)
