import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import moment from 'lib/moment'
import { numeral } from 'lib/numeral'
/* eslint-disable */
import fr_general from 'src/locales/general.fr.json'
import de_general from 'src/locales/general.de.json'
/* eslint-enable */

const resources = {
  fr: {
    general: fr_general,
  },
  de: {
    general: de_general,
  },
}

const interpolation = {
  escapeValue: false,
  format(value, format) {
    if (format === 'currency') return numeral.format(value)
    else if (format === 'currency_sign') return numeral.format(value, true)
    else if (value instanceof Date) return moment.format(value, format)

    return value
  },
}

const i18nNewInstance = i18n.createInstance()
i18nNewInstance.use(initReactI18next).init({
  fallbackLng: 'fr',
  lng: 'fr',
  resources,
  interpolation,
  saveMissing: true,
  returnObjects: true,
  // eslint-disable-next-line no-console
  missingKeyHandler: (lng, ns, key) => console.error(`[I18N] MISSING KEY ${lng} - ${ns}:${key}`),
})

export default i18nNewInstance
