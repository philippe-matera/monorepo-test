import { useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import i18nInstance from 'lib/i18n'
import { UIContext } from 'src/UIContext'

export default (ns, options = {}) => {
  const { locale } = useContext(UIContext)
  const { t, i18n, ready } = useTranslation(ns, { i18n: i18nInstance, ...options })

  useEffect(() => {
    if (i18n.language !== locale) i18n.changeLanguage(locale)
  }, [locale, i18n])

  return {
    i18n,
    ready,
    t,
  }
}
