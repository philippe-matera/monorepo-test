import { getIn } from 'formik'
import { isValidNumber } from 'libphonenumber-js'

import i18n from 'lib/i18n'

const isError = (formik, name) => !!getIn(formik.touched, name) && !!getIn(formik.errors, name)

const errorClassName = (formik, name) => (isError(formik, name) ? 'input-error' : '')

// eslint-disable-next-line no-warning-comments
const checkPhoneNumber = function (message) {
  // eslint-disable-next-line babel/no-invalid-this
  return this.test({
    message: message || i18n.t('general:yup.string.phone_number'),
    name: 'phone-number',
    exclusive: true,
    test(value) {
      return value ? isValidNumber(value) : true
    },
  })
}

// eslint-disable-next-line no-warning-comments
const checkUrl = function (message) {
  // eslint-disable-next-line prefer-named-capture-group
  const url = /(https?:\/\/)?([\da-z.-]+).([a-z.]{2,6})([/\w .-]*)*\/?/u

  // eslint-disable-next-line babel/no-invalid-this
  return this.matches(url, {
    message: message || i18n.t('general:yup.string.url'),
  })
}

const checkUniqueness = function (message, mapper = a => a) {
  // eslint-disable-next-line babel/no-invalid-this
  return this.test('unique', message, list => list.length === new Set(list.map(mapper)).size)
}

export const FormikUtils = {
  errorClassName,
  isError,
  checkPhoneNumber,
  checkUrl,
  checkUniqueness,
}
