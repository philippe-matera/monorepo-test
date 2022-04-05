import { COLORS } from '@matera-tech/utils'
import PropTypes from 'prop-types'
import React, { useRef } from 'react'
import styled, { keyframes } from 'styled-components'

import useOnOutsideClick from 'hooks/useOnOutsideClick'
import { Container } from 'ui/alerts/components/Container'
import { ErrorIcon } from 'ui/alerts/components/ErrorIcon'
import { InfoIcon } from 'ui/alerts/components/InfoIcon'
import { QuestionIcon } from 'ui/alerts/components/QuestionIcon'
import { SuccessIcon } from 'ui/alerts/components/SuccessIcon'
import { WarningIcon } from 'ui/alerts/components/WarningIcon'
import { Button } from 'ui/buttons/Button'
import { Text } from 'ui/typography/Text'
import { Title } from 'ui/typography/Title'
import { Block } from 'ui/wrappers/Block'
import { ButtonsWrapper } from 'ui/wrappers/ButtonsWrapper'

const animate_show = keyframes`
  0% {
    transform: scale(.7);
  }

  45% {
    transform: scale(1.05);
  }

  80% {
    transform: scale(.95);
  }

  100% {
    transform: scale(1);
  }
`

const StyledAlert = styled.div`
  width: 600px;

  padding: 56px;

  background: white;

  line-height: 24px;
  text-align: center;

  animation: ${animate_show} 0.3s;
  border-radius: 8px;
`

const StyledText = styled(Text)`
  color: ${COLORS.gray[900]};
`

const ButtonContainer = styled.div`
  margin-top: 16px;
`

const FooterContainer = styled.div`
  margin-top: 1.25em;
`

const icon_components = {
  success: SuccessIcon,
  error: ErrorIcon,
  warning: WarningIcon,
  question: QuestionIcon,
  info: InfoIcon,
}

const Alert = ({
  type,
  title,
  text,
  confirm_props,
  cancel_props,
  footer,
  onCancel,
  onConfirm,
  onClickOutside,
}) => {
  const ref = useRef(null)
  useOnOutsideClick(ref, onClickOutside)
  const IconComponent = icon_components[type]

  return (
    <Container>
      <StyledAlert ref={ref}>
        <IconComponent />

        <Block bottom="xxs">
          <Title.H6>{title}</Title.H6>
        </Block>

        {text && <StyledText>{text}</StyledText>}

        <ButtonContainer>
          <ButtonsWrapper>
            {onCancel && (
              <Button
                color={cancel_props.color}
                onClick={onCancel}
                autoFocus // eslint-disable-line jsx-a11y/no-autofocus
                disabled={cancel_props.disabled}
              >
                {cancel_props.content}
              </Button>
            )}
            {onConfirm && (
              <Button
                color={confirm_props.color}
                onClick={onConfirm}
                autoFocus={!onCancel} // eslint-disable-line jsx-a11y/no-autofocus
                disabled={confirm_props.disabled}
              >
                {confirm_props.content}
              </Button>
            )}
          </ButtonsWrapper>
        </ButtonContainer>

        {footer && <FooterContainer>{footer}</FooterContainer>}
      </StyledAlert>
    </Container>
  )
}

Alert.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.node,
  text: PropTypes.node,
  confirm_props: PropTypes.shape({
    content: PropTypes.node.isRequired,
    color: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
  }),
  cancel_props: PropTypes.shape({
    content: PropTypes.node.isRequired,
    color: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
  }),
  footer: PropTypes.node,

  onClickOutside: PropTypes.func,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
}

Alert.defaultProps = {
  confirm_props: PropTypes.shape({
    disabled: false,
  }),
  cancel_props: PropTypes.shape({
    disabled: false,
  }),
}

export { Alert }
