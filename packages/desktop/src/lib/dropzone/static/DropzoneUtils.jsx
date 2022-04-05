import { Utils } from 'utils/Utils'

const formats = (t, accept) => {
  const results = []
  if (accept.includes('application/pdf')) results.push('pdf')
  if (accept.includes('image/*')) results.push('png, jpeg')
  if (accept.includes('text/csv')) results.push('csv')
  if (
    accept.includes('application/vnd.ms-excel') ||
    accept.includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  ) {
    results.push('excel')
  }
  if (
    accept.includes('application/msword') ||
    accept.includes('application/vnd.openxmlformats-officedocument.wordprocessingml.document')
  ) {
    results.push('word')
  }
  if (
    accept.includes('application/vnd.ms-powerpoint') ||
    accept.includes('application/vnd.openxmlformats-officedocument.presentationml.presentation') ||
    accept.includes('application/vnd.ms-pps') ||
    accept.includes('application/vnd.openxmlformats-officedocument.presentationml.slideshow') ||
    accept.includes('application/vnd.apple.keynote') ||
    accept.includes('application/vnd.oasis.opendocument.presentation')
  ) {
    results.push('powerpoint')
  }

  return Utils.toSentence(t, results, 'or')
}

export const DropzoneUtils = { formats }
