import { COLORS } from '@matera-tech/utils'
import PropTypes from 'prop-types'
import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { VelocityTransitionGroup } from 'velocity-react'

import { useLockBodyScroll } from 'hooks/useLockBodyScroll'
import useTranslation from 'hooks/useTranslation'
import { withBaseTranslationContext } from 'shared/withBaseTranslationContext'
import { CONSTANTS } from 'src/constants'
import { Button } from 'ui/buttons/Button'
import { Flex } from 'ui/flex/Flex'
import { StyledPageFooter } from 'ui/footers/PageFooter'
import { Icon } from 'ui/icons/Icon'
import { Title } from 'ui/typography/Title'
import { Block } from 'ui/wrappers/Block'

const Container = styled.div`
  display: grid;
  position: fixed;
  overflow: hidden;
  z-index: 2065;

  grid-template-rows: min-content auto min-content;

  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-color: white;

  ${StyledPageFooter} {
    bottom: 0;
    left: 0;
    width: 100%;

    margin: 0;
    padding: ${CONSTANTS.spacing.xs} ${CONSTANTS.spacing.xl};
  }
`
const Content = styled.div`
  max-width: 1280px;

  margin: 0 auto;
`
const Header = styled.div`
  border-bottom: 1px solid ${COLORS.gray[400]};
  padding: ${CONSTANTS.spacing.m} ${CONSTANTS.spacing.xl};
`
const Body = styled.div`
  overflow-y: auto;

  padding: ${CONSTANTS.spacing.l} ${CONSTANTS.spacing.xl} 72px ${CONSTANTS.spacing.xl};
`

const FullPageModalTranslate = ({ visible, title, subtitle, onHide, children }) => {
  const { t } = useTranslation('general')
  useLockBodyScroll(visible)

  let close_button
  if (onHide) {
    close_button = (
      <Button color="default" onClick={onHide}>
        <Icon name="times" space_after />
        {t('general:close_button')}
      </Button>
    )
  }

  return ReactDOM.createPortal(
    <VelocityTransitionGroup
      enter={{ animation: { translateY: '0px', opacity: 1 }, duration: 200, easing: 'ease-in' }}
      leave={{ animation: { translateY: '80px', opacity: 0 }, duration: 200, easing: 'ease-out' }}
    >
      {visible && (
        <Container id="full-page-modal">
          <Header>
            <Content>
              <Flex justify_content="space-between" align_items="center">
                <Title.H4>{title}</Title.H4>
                {close_button}
              </Flex>
              {subtitle && <Block top="s">{subtitle}</Block>}
            </Content>
          </Header>
          <Body>
            <Content>{children}</Content>
          </Body>
        </Container>
      )}
    </VelocityTransitionGroup>,
    document.body,
  )
}

FullPageModalTranslate.propTypes = {
  visible: PropTypes.bool,
  title: PropTypes.node.isRequired,
  subtitle: PropTypes.node,
  onHide: PropTypes.func,
  children: PropTypes.node.isRequired,
}
FullPageModalTranslate.defaultProps = {
  visible: false,
}

const FullPageModal = withBaseTranslationContext(FullPageModalTranslate)
export { FullPageModal }
