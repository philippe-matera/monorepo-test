import { useContext } from 'react'

import { UIContext } from 'src/UIContext'

const SUPPORTED_COUNTRIES = ['fr', 'de']
const DEFAULT_COUNTRY = 'fr'
const SUPPORTED_LOCALES = ['fr', 'de']
const DEFAULT_LOCALE = 'fr'

const useLocalization = () => {
  const { country, locale } = useContext(UIContext)
  const supported_country = SUPPORTED_COUNTRIES.includes(country) ? country : DEFAULT_COUNTRY
  const supported_locale = SUPPORTED_LOCALES.includes(locale) ? locale : DEFAULT_LOCALE

  return {
    country: supported_country,
    locale: supported_locale,
  }
}

export { useLocalization }
