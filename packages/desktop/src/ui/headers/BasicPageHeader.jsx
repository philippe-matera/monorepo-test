import PropTypes from 'prop-types'
import React from 'react'

import { Flex } from 'ui/flex/Flex'
import { PageHeader } from 'ui/headers/PageHeader'
import { BackLink } from 'ui/links/BackLink'
import { Title } from 'ui/typography/Title'
import { Block } from 'ui/wrappers/Block'
import { ButtonsWrapper } from 'ui/wrappers/ButtonsWrapper'

const BasicPageHeader = ({ title, title_color, subtitle, ctas, back_link, tabs, ...props }) => (
  /* eslint-disable react/jsx-handler-names */
  <PageHeader no_padding_bottom={!!tabs} {...props}>
    {back_link && (
      <Block bottom="s">
        <BackLink href={back_link.href} to={back_link.to} onClick={back_link.onClick}>
          {back_link.title}
        </BackLink>
      </Block>
      /* eslint-enable react/jsx-handler-names */
    )}

    <Flex justify_content="space-between" align_items="center">
      <Title.H4 color={title_color}>{title}</Title.H4>

      {ctas && <ButtonsWrapper>{ctas}</ButtonsWrapper>}
    </Flex>

    {subtitle && <Block top="s">{subtitle}</Block>}

    {tabs}
  </PageHeader>
)

BasicPageHeader.propTypes = {
  title: PropTypes.node.isRequired,
  title_color: PropTypes.oneOf(['admin']),
  subtitle: PropTypes.node,
  ctas: PropTypes.node,
  back_link: PropTypes.shape({
    href: PropTypes.string,
    to: PropTypes.string,
    onClick: PropTypes.func,
    title: PropTypes.string.isRequired,
  }),
  tabs: PropTypes.node,
  loading: PropTypes.bool,
}

export { BasicPageHeader }
