import { COLORS } from '@matera-tech/utils'
import MdiIcon from '@mdi/react'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { CONSTANTS } from 'src/constants'

const ICONS = {
  account_box: 'account_box',
  address_book: 'contact_mail',
  address_card: 'contact_mail',
  angle_down: 'expand_more',
  angle_left: 'chevron_left',
  angle_right: 'chevron_right',
  angle_up: 'expand_less',
  arrow_left: 'arrow_back',
  arrow_right: 'arrow_forward',
  article: 'article',
  at: 'alternate_email',
  poll: 'assessment',
  ban: 'block',
  bank: 'account_balance',
  bell: 'notifications',
  bell_ringing: 'notifications_active',
  birthday_cake: 'cake',
  book: 'book',
  briefcase: 'business_center',
  building: 'domain',
  calendar: 'event',
  calendar_check: 'event_available',
  calendar_times: 'event_busy',
  caret_down: 'arrow_drop_down',
  caret_right: 'keyboard_arrow_right',
  caret_up: 'arrow_drop_up',
  cellphone: 'smartphone',
  chart_area: 'pie_chart',
  chart_line: 'show_chart',
  check: 'done',
  check_circle: 'check_circle',
  check_square: 'check_box',
  circle: 'radio_button_unchecked',
  clipboard_list: 'assignment',
  clock: 'alarm',
  close: 'close',
  cloud_download: 'cloud_download',
  cloud_upload: 'cloud_upload',
  cog: 'settings',
  cogs: 'settings',
  comment: 'comment',
  comments: 'forum',
  credit_card: 'credit_card',
  desktop: 'desktop_windows',
  download: 'cloud_download',
  ellipsis_h: 'more_horiz',
  email: 'email',
  envelope: 'email',
  error: 'cancel',
  euro: 'euro_symbol',
  exchange: 'share',
  exclamation_circle: 'error',
  exclamation_triangle: 'warning',
  external_link: 'open_in_new',
  eye: 'visibility',
  eye_slash: 'visibility_off',
  file: 'description',
  file_download: 'cloud_download',
  file_excel: 'description',
  file_pdf: 'description',
  file_signature: 'description',
  file_upload: 'cloud_upload',
  folder: 'folder',
  folder_open: 'folder_open',
  folder_plus: 'create_new_folder',
  gavel: 'gavel',
  gift: 'card_giftcard',
  group: 'group',
  hand_rock: 'drag_handle',
  heart: 'favorite',
  home: 'home',
  info: 'info',
  info_circle: 'info',
  key: 'vpn_key',
  link: 'link',
  list: 'list',
  lock: 'lock',
  lock_open: 'lock_open',
  long_arrow_down: 'arrow_downward',
  long_arrow_left: 'arrow_back',
  long_arrow_right: 'arrow_forward',
  long_arrow_up: 'arrow_upward',
  map: 'map',
  mobile_menu: 'menu',
  money_bill: 'money',
  money_check: 'money',
  pencil: 'edit',
  phone: 'phone',
  navigation: 'navigation',
  place: 'place',
  plus: 'add',
  project_diagram: 'assignment',
  question: 'help',
  question_circle_outlined: 'help_outlined',
  question_circle: 'help',
  redo: 'replay',
  rotate_left: 'rotate_left',
  rotate_right: 'rotate_right',
  sad_tear: 'sentiment_dissatisfied',
  search: 'search',
  search_minus: 'zoom_out',
  search_plus: 'zoom_in',
  send: 'send',
  settings_remote: 'settings_remote',
  sign_in: 'person_add',
  sign_out: ' power_settings_new',
  smartphone: 'smartphone',
  smile: 'mood',
  sort: 'sort_by_alpha',
  square: 'crop_square',
  star: 'grade',
  sticky_note: 'note',
  sync: 'sync',
  sync_alt: 'sync_alt',
  tachometer: 'multiline_chart',
  tag: 'label',
  thumbs_up: 'thumb_up',
  thumbtack: 'local_offer',
  times: 'clear',
  times_circle: 'clear',
  trash: 'delete',
  trophy: 'sentiment_very_satisfied',
  undo: 'undo',
  unlink: 'link_off',
  update: 'update',
  upload: 'cloud_upload',
  user: 'person',
  user_clock: 'person',
  user_plus: 'person',
  user_slash: 'person_add_disabled',
  user_tie: 'assignment_ind',
  user_times: 'person_add_disabled',
  users: 'person',
  video: 'theaters',
  wrench: 'build',
  web: 'web_asset',
  drag_indicator: 'drag_indicator',
}

const getSize = props => {
  if (props.lg) return '25px'
  if (props.xx2) return '40px'
  if (props.x3) return '60px'

  return '20px'
}

const StyledMdiIcon = styled(MdiIcon)`
  width: ${getSize};
  height: ${getSize};
  vertical-align: top;

  line-height: 24px;
  ${({ space_before }) => space_before && `margin-left: ${CONSTANTS.spacing.xxs};`}
  ${({ space_after }) => space_after && `margin-right: ${CONSTANTS.spacing.xxs};`}
  ${({ disabled }) => disabled && `fill: ${COLORS.default.light};`}
`

// internally using xx2 to avoid passing x2 to the dom (x2 is a valid html props)
const StyledIcon = styled.i`
  display: inline-flex;
  vertical-align: top;

  line-height: 24px;
  font-size: ${props => {
    if (props.lg) return '25px'
    if (props.xx2) return '40px'
    if (props.x3) return '60px'

    return '20px'
  }};
  ${({ space_before }) => space_before && `margin-left: ${CONSTANTS.spacing.xxs};`}
  ${({ space_after }) => space_after && `margin-right: ${CONSTANTS.spacing.xxs};`}
  ${({ disabled }) => disabled && `color: ${COLORS.default.light};`}
`

const Icon = props => {
  const getMaterialClass = () => {
    if (props.round) return 'material-icons-round'
    if (props.outlined) return 'material-icons-outlined'

    return 'material-icons'
  }

  if (props.path) {
    return (
      <StyledMdiIcon
        className={props.className}
        space_before={props.space_before}
        space_after={props.space_after}
        disabled={props.disabled}
        path={props.path}
      />
    )
  }

  return (
    <StyledIcon
      className={`${props.className} ${getMaterialClass()}`}
      lg={props.lg}
      xx2={props.x2}
      x3={props.x3}
      space_after={props.space_after}
      space_before={props.space_before}
      disabled={props.disabled}
    >
      {ICONS[props.name] || props.name}
    </StyledIcon>
  )
}

Icon.defaultProps = {
  x2: false,
  x3: false,
  lg: false,
  className: '',
  round: false,
  outlined: true,
  space_after: false,
  space_before: false,
  disabled: false,
}

Icon.propTypes = {
  name: PropTypes.oneOf(Object.keys(ICONS)).isRequired,
  x2: PropTypes.bool,
  x3: PropTypes.bool,
  lg: PropTypes.bool,
  round: PropTypes.bool,
  outlined: PropTypes.bool,
  className: PropTypes.string,
  space_after: PropTypes.bool,
  space_before: PropTypes.bool,
  disabled: PropTypes.bool,
  path: PropTypes.node,
}

export { Icon, ICONS }
