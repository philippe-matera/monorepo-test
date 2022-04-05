import React from 'react'
import _ from 'underscore'

const isBlankNode = node =>
  _.isEmpty(node) || (node.type === React.Fragment && _.isEmpty(node.props.children))

const openTab = (url, opts = {}) => {
  const a = document.createElement('a')
  a.href = url
  a.target = '_blank'
  if (opts.download) a.download = opts.download

  document.body.appendChild(a)
  a.click()
}

const sanitizeString = string => {
  if (!string) return ''
  let sanitized = string.toLowerCase()

  if (typeof sanitized.normalize === 'function') sanitized = sanitized.normalize('NFD')

  return sanitized.replace(/[\u0300-\u036f]/gu, '')
}

const toSentence = (t, array, mode) => {
  const key = mode === 'or' ? 'or' : 'and'

  return array.join(', ').replace(/,\s([^,]+)$/u, ` ${t(`general:${key}`)} $1`) // eslint-disable-line prefer-named-capture-group
}

export const Utils = { isBlankNode, openTab, sanitizeString, toSentence }
