import React from 'react'
import ReactDOM from 'react-dom'

import { Alert } from 'ui/alerts/Alert'

let el = document.getElementById('alerts')

const getAlertElement = () => {
  if (el) return el

  const div = document.createElement('DIV')
  div.id = 'alerts'
  document.body.appendChild(div)
  el = document.getElementById('alerts')

  return el
}

const unmountAlert = () => {
  ReactDOM.unmountComponentAtNode(el)
}

const baseAlert = (type, title, text, click_outside, confirm_props, cancel_props, footer) => {
  const alert_props = {
    type,
    title,
    text,
    confirm_props,
    cancel_props,
    footer,
  }

  return new Promise(accept => {
    const onClickOutside = () => {
      accept({ result: false, dismiss: 'outside' })
      unmountAlert()
    }

    const onCancel = () => {
      accept({ result: false, dismiss: 'cancel' })
      unmountAlert()
    }

    const onConfirm = () => {
      accept({ result: true, dismiss: 'confirm' })
      unmountAlert()
    }

    if (alert_props.confirm_props && !alert_props.confirm_props.color)
      alert_props.confirm_props.color = type === 'info' || type === 'question' ? 'success' : type

    const callbacks = {}
    if (confirm_props) callbacks.onConfirm = onConfirm
    if (cancel_props) callbacks.onCancel = onCancel
    if (click_outside) callbacks.onClickOutside = onClickOutside

    ReactDOM.render(<Alert {...callbacks} {...alert_props} />, getAlertElement())
  })
}

const baseAlertWithButtons = (type, title, text, confirm_text, cancel_text, opts = {}) =>
  baseAlert(
    type,
    title,
    text,
    false,
    { content: confirm_text },
    cancel_text ? { content: cancel_text, color: 'default', ...opts.cancel_opts } : null,
    opts.footer,
  )

// This is a TODO : reuse i18n with ("general.confirm") and ("general.cancel_confirm")
export class AlertUtils {
  static success(title, text, confirm_text) {
    return baseAlert('success', title, text, true, {
      content: confirm_text || 'OK',
      color: 'success',
    })
  }

  static successWithQuestion(
    title,
    text,
    confirm_text,
    cancel_text,
    cancel_opts = {},
    confirm_opts = {},
  ) {
    return baseAlertWithButtons('success', title, text, confirm_text, cancel_text, {
      cancel_opts,
      confirm_opts,
    })
  }

  static info(title, text, opts = {}) {
    return baseAlert(
      'info',
      title,
      text,
      true,
      opts?.confirmButton || { content: 'OK', color: 'primary' },
      opts?.cancelButton || null,
      opts?.footer,
    )
  }

  static error(title, text) {
    return baseAlert('error', title, text, true, { content: 'OK', color: 'danger' })
  }

  static errorFromXhr(xhr) {
    return AlertUtils.error($.parseJSON(xhr.responseText).message.toString())
  }

  static warning(title, text, confirm_text, cancel_text, opts = {}) {
    return baseAlertWithButtons('warning', title, text, confirm_text, cancel_text, opts)
  }

  static confirm(title, confirm_text, callback, opts = {}) {
    return AlertUtils.warning(
      title,
      opts.text,
      confirm_text,
      opts.cancel_text || 'Annuler',
      opts,
    ).then(({ result }) => {
      // eslint-disable-next-line callback-return
      if (result) callback()
      else if (opts.cancelCallback) opts.cancelCallback()
    })
  }

  static question(title, text, confirm_text, cancel_text, opts = {}) {
    return baseAlertWithButtons('question', title, text, confirm_text, cancel_text, opts)
  }
}
