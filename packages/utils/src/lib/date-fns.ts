import {de, fr} from "date-fns/locale"
import {format, formatDistance as formatDistanceDateFns} from "date-fns"

export type SupportedLocalesType = {
  [lng: string]: Locale
}

export type DateFormatsType = {
  [scope: string]: {
    [format_type: string]: string
  }
}

export const SUPPORTED_LOCALES: SupportedLocalesType = {fr, de}

export const DATE_FORMATS: DateFormatsType = {
  date: {
    explicit: "PPP",
    hyphen: "yyyy-MM-dd",
    long: "PPPP",
    month_year: "MMMM yyyy",
    slash: "dd/MM/yyyy",
    short: "dd MMMM",
  },
  time: {
    long: "PPPp",
    compact: "Pp",
    default: "p",
  },
}

export const getDateFormat = (date_format: string) => {
  const regexp = new RegExp(/^(date.|time.)/)
  if (regexp.test(date_format)) {
    const [scope, format_type] = date_format.split(".")
    return DATE_FORMATS[scope][format_type]
  }
  return date_format
}

export const formatDate = (date: Date, date_format = "yyyy-MM-dd'T'HH:mm:ssxxx", locale = "fr") =>
  format(typeof date === "undefined" ? new Date() : new Date(date), getDateFormat(date_format), {
    locale: SUPPORTED_LOCALES[locale] || fr,
  })

export const formatDistance = (start_date: Date, end_date: Date, addSuffix: boolean, locale: string) =>
  formatDistanceDateFns(start_date, end_date, {locale: SUPPORTED_LOCALES[locale] || fr, addSuffix})
