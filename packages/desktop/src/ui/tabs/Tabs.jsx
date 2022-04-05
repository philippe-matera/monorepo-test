import PropTypes from 'prop-types'
import React, { useState } from 'react'
import _ from 'underscore'

import { TabHeaders } from 'ui/tabs/TabHeaders'
import { TabContent } from 'ui/tabs/components/TabContent'

const Tabs = ({
  initial_active_key,
  active_key: controlled_active_key,
  tabs,
  children,
  right_content,
  centered,
  sticky_left,
  onHeaderClick,
}) => {
  const [uncontrolled_active_key, setActivekey] = useState(initial_active_key)
  const active_key = controlled_active_key || uncontrolled_active_key

  const filtered_tabs = tabs.filter(tab => tab?.props)
  const active_tab = filtered_tabs.find(tab => tab.key === active_key) || filtered_tabs[0]

  let tabs_headers
  if (filtered_tabs.length > 1) {
    const header_props = filtered_tabs.map(tab => ({
      key: tab.key,
      active: active_tab.key === tab.key,
      ..._.pick(tab.props, ['title', 'badge', 'badge_color', 'icon']),
      color: tab.props.title_color,
      onClick: controlled_active_key ? onHeaderClick : setActivekey,
    }))

    tabs_headers = (
      <TabHeaders
        headers={header_props}
        right_content={right_content}
        centered={centered}
        sticky_left={sticky_left}
      />
    )
  }

  if (_.isFunction(children)) return children(tabs_headers, active_tab)

  return (
    <>
      {tabs_headers}
      {active_tab}
    </>
  )
}

Tabs.propTypes = {
  initial_active_key: PropTypes.string,
  active_key: PropTypes.string,
  tabs: PropTypes.node.isRequired,
  children: PropTypes.func,
  right_content: PropTypes.node,
  centered: PropTypes.bool,
  sticky_left: PropTypes.bool,
  onHeaderClick: PropTypes.func,
}

Tabs.defaultProps = {
  centered: false,
  sticky_left: false,
}

Tabs.TabContent = TabContent

export { Tabs }
