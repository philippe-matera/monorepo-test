import { COLORS } from '@matera-tech/utils'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { CONSTANTS } from 'src/constants'
import { LoadingWrapper } from 'src/shared/LoadingWrapper'
import { Flex } from 'ui/flex/Flex'
import { CloseButton } from 'ui/icon_buttons/CloseButton'
import { Icon } from 'ui/icons/Icon'
import { Text } from 'ui/typography/Text'
import { Block } from 'ui/wrappers/Block'

const StyledInfoCard = styled.div`
  padding: ${CONSTANTS.spacing.s};

  background-color: ${({ color }) => COLORS[color].lighter};
  border-radius: 8px;
`

const ICONS = {
  primary: { name: 'info_circle', outlined: false },
  warning: { name: 'exclamation_triangle', outlined: true },
  danger: { name: 'error', outlined: false },
  success: { name: 'check_circle', outlined: false },
  admin: { name: 'info_circle', outlined: false },
}

const InfoCard = ({ color, title, content, children, loading, closable, onClose }) => {
  const icon = <Icon name={ICONS[color].name} space_after outlined={ICONS[color].outlined} />

  return (
    <StyledInfoCard color={color}>
      <LoadingWrapper loading={loading}>
        <Flex no_wrap>
          <Block right="xs">
            <Text color={color}>{icon}</Text>
          </Block>
          <Flex flex={1} direction="column">
            {title && (
              <Flex no_wrap justify_content="space-between" align_items="flex-start">
                <Text bold>{title}</Text>
                {closable && <CloseButton onClick={onClose} />}
              </Flex>
            )}
            {(content || children) && (
              <Block top={title ? 'xs' : null}>{content || children}</Block>
            )}
          </Flex>
        </Flex>
      </LoadingWrapper>
    </StyledInfoCard>
  )
}

InfoCard.defaultProps = {
  color: 'primary',
  loading: false,
  closable: false,
}

InfoCard.propTypes = {
  color: PropTypes.oneOf(['primary', 'warning', 'danger', 'success', 'admin']),
  title: PropTypes.string,
  content: PropTypes.string,
  loading: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
    PropTypes.string,
  ]),
  closable: PropTypes.bool,
  onClose: PropTypes.func,
}

export { InfoCard }
