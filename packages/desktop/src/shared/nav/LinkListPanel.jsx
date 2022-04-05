import PropTypes from 'prop-types'
import React from 'react'

import { Card } from 'ui/cards/Card'
import { Icon } from 'ui/icons/Icon'
import { Link } from 'ui/links/Link'
import { Text } from 'ui/typography/Text'
import { Title } from 'ui/typography/Title'
import { Block } from 'ui/wrappers/Block'

const LinkListPanel = props => {
  const links = props.links.map(link => (
    <Card.Content key={link.key}>
      <Block bottom="xs">
        <Title.H6>
          <Text color={link.admin ? 'admin' : 'primary'}>
            <Icon name={link.icon} lg space_after />
          </Text>
          <Link color={link.admin ? 'admin' : undefined} to={link.to} href={link.href}>
            {link.title}
          </Link>
        </Title.H6>
      </Block>
      {link.subtitle}
    </Card.Content>
  ))

  return (
    <Card.Container>
      <Card.Content header>
        <Title.H5>{props.title}</Title.H5>
      </Card.Content>
      {links}
    </Card.Container>
  )
}

LinkListPanel.propTypes = {
  title: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string.isRequired,
      admin: PropTypes.bool,
      to: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string.isRequired,
    }),
  ),
}

export { LinkListPanel }
