import styled from 'styled-components'

import { CONSTANTS } from 'src/constants'

// This is a workaround for PageContent.jsx padding offset
const PAGE_CONTENT_PADDING_OFFSET = CONSTANTS.spacing.xl

const MainLayout = styled.div`
  margin: 0 calc(${CONSTANTS.spacing.xl} - ${PAGE_CONTENT_PADDING_OFFSET});

  width: 100%;
  max-width: 1280px;

  display: grid;
  row-gap: ${CONSTANTS.spacing.xl};

  grid-template-columns: minmax(0, 1fr);

  ${/* 1280 (max layout width) 281 (size of the left sidenav) + Margins  */ ''}
  @media (min-width: calc(1561px + calc((${CONSTANTS.spacing
    .xl} - ${PAGE_CONTENT_PADDING_OFFSET}) * 2))) {
    margin: 0 auto;
    margin-top: ${CONSTANTS.spacing.xl};
  }
  ${({ small }) =>
    small &&
    `
    max-width: 480px;
    margin: 0 auto;
    
    @media (max-width: ${CONSTANTS.breakpoints.mobile}) {
      margin: 0 calc((100vw - min(480px, 100%)) / 2)
    }
  `}
  ${({ aside }) => {
    if (!aside) return false
    const default_aside = `
        
        @media (max-width: ${CONSTANTS.breakpoints.mobile}) {
            grid-template-columns: 100%;
        }
        @media (min-width: ${CONSTANTS.breakpoints.mobile}) {
            column-gap: ${CONSTANTS.spacing.xxl};
        }
    `
    let aside_layout = `
            @media (min-width: ${CONSTANTS.breakpoints.mobile}) {
            grid-template-columns: calc(66.66% - 26.66px) calc(33.33% - 13.33px);
            }
        `
    if (aside === 'left') {
      aside_layout = `
        @media (min-width: ${CONSTANTS.breakpoints.mobile}) {
          grid-template-columns: calc(33.33% - 13.33px) calc(66.66% - 26.66px);
        }
        `
    } else if (aside === 'middle') {
      aside_layout = `
        @media (min-width: ${CONSTANTS.breakpoints.mobile}) {
            grid-template-columns: calc(50% - 20px) calc(50% - 20px);
        }
        `
    }

    return default_aside + aside_layout
  }}
`

export { MainLayout }
