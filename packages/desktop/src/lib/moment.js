import moment from 'moment-timezone'
import 'moment/locale/fr' // eslint-disable-line import/no-unassigned-import

moment.locale('fr')
moment.tz.setDefault('Europe/Paris')

const DATE_FORMATS = {
  date: {
    explicit: 'DD MMMM Y',
    hyphen: 'Y-MM-DD',
    long: 'dddd DD MMMM Y',
    month_year: 'MMMM Y',
    slash: 'DD/MM/Y',
    short: 'DD MMMM',
  },
  time: {
    long: 'dddd D MMMM Y à HH[h]mm',
    default: 'HH[h]mm',
  },
}

moment.format = (value, format_type) => {
  const [scope, format] = format_type.split('.')

  return moment(value).format(DATE_FORMATS[scope][format])
}

export default moment
