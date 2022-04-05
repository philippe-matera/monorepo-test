import numeral from 'numeral'

numeral.register('locale', 'fr', {
  delimiters: {
    thousands: ' ',
    decimal: ',',
  },
  abbreviations: {},
  currency: {
    symbol: '€',
  },
})

numeral.locale('fr')

numeral.format = (value, sign) => {
  let format = '0,0.00\xa0$'
  if (sign === true) format = `+${format}`

  return numeral(parseFloat(value)).format(format)
}

window.numeral = numeral

const toPercentage = (value, opts = {}) => {
  const precision = typeof opts.precision === 'number' ? opts.precision : 2
  let format = '0,0'
  if (precision > 0) {
    format = `${format}.`
    for (let i = 0; i < precision; i++) format = `${format}0`
  }

  format = `${format} %`

  return numeral(parseFloat(value) / 100.0).format(format)
}

export { toPercentage, numeral }
