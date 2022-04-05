import styled from 'styled-components'

// title is voluntarily removed from html props
// eslint-disable-next-line no-unused-vars
export const TabContent = styled('div').withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) =>
    !['title'].includes(prop) && defaultValidatorFn(prop),
})`
  padding-top: 0;
`
