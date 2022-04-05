import { parsePhoneNumberFromString } from 'libphonenumber-js'

import { useLocalization } from 'hooks/useLocalization'

const formatter = () => value => {
  const { country } = useLocalization()

  return value
    ? parsePhoneNumberFromString(value, country.toUpperCase())?.format('INTERNATIONAL') || null
    : null
}

export const PhoneNumberFormatter = { formatter }
