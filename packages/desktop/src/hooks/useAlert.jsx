import React, { useCallback } from 'react'
import ReactDOM from 'react-dom'

import useTranslation from 'hooks/useTranslation'
import { Alert } from 'ui/alerts/Alert'

const useAlert = () => {
  const { t } = useTranslation('general')

  const baseAlert = useCallback(
    (type, title, text, click_outside, confirm_props, cancel_props, footer) => {
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
          alert_props.confirm_props.color =
            type === 'info' || type === 'question' ? 'success' : type

        const callbacks = {}
        if (confirm_props) callbacks.onConfirm = onConfirm
        if (cancel_props) callbacks.onCancel = onCancel
        if (click_outside) callbacks.onClickOutside = onClickOutside

        ReactDOM.render(<Alert {...callbacks} {...alert_props} />, getAlertElement())
      })
    },
    [],
  )

  const baseAlertWithButtons = useCallback(
    (type, title, text, confirm_text, cancel_text, opts = {}) =>
      baseAlert(
        type,
        title,
        text,
        false,
        { content: confirm_text },
        cancel_text ? { content: cancel_text, color: 'default', ...opts.cancel_opts } : null,
        opts.footer,
      ),
    [baseAlert],
  )

  const successAlert = useCallback(
    (title, text, confirm_text) =>
      baseAlert('success', title, text, true, {
        content: confirm_text || t('general:confirm'),
        color: 'success',
      }),
    [t, baseAlert],
  )
  const successWithQuestionAlert = useCallback(
    (title, text, confirm_text, cancel_text, cancel_opts = {}, confirm_opts = {}) =>
      baseAlertWithButtons('success', title, text, confirm_text, cancel_text, {
        cancel_opts,
        confirm_opts,
      }),
    [baseAlertWithButtons],
  )
  const infoAlert = useCallback(
    (title, text, opts = {}) =>
      baseAlert(
        'info',
        title,
        text,
        true,
        opts?.confirmButton || { content: t('general:confirm'), color: 'primary' },
        opts?.cancelButton || null,
        opts?.footer,
      ),
    [t, baseAlert],
  )
  const errorAlert = useCallback(
    (title, text) =>
      baseAlert('error', title, text, true, { content: t('general:confirm'), color: 'danger' }),
    [t, baseAlert],
  )
  const errorFromXhrAlert = useCallback(
    xhr => errorAlert($.parseJSON(xhr.responseText).message.toString()),
    [errorAlert],
  )
  const warningAlert = useCallback(
    (title, text, confirm_text, cancel_text, opts = {}) =>
      baseAlertWithButtons('warning', title, text, confirm_text, cancel_text, opts),
    [baseAlertWithButtons],
  )
  const confirmAlert = useCallback(
    (title, confirm_text, callback, opts = {}) =>
      warningAlert(
        title,
        opts.text,
        confirm_text,
        opts.cancel_text || t('general:cancel_confirm'),
        opts,
      ).then(({ result }) => {
        // eslint-disable-next-line callback-return
        if (result) callback()
        else if (opts.cancelCallback) opts.cancelCallback()
      }),
    [t, warningAlert],
  )
  const questionAlert = useCallback(
    (title, text, confirm_text, cancel_text, opts = {}) =>
      baseAlertWithButtons('question', title, text, confirm_text, cancel_text, opts),
    [baseAlertWithButtons],
  )

  return {
    successAlert,
    successWithQuestionAlert,
    infoAlert,
    errorAlert,
    errorFromXhrAlert,
    warningAlert,
    confirmAlert,
    questionAlert,
  }
}

export { useAlert }
