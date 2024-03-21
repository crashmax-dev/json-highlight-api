import type { HighlightJsonOptions } from './types.js'

export const defaultColors: HighlightJsonOptions['colors'] = {
  key: '#9cdcfe',
  literal: '#569cd6',
  number: '#b5cea8',
  string: '#ce9178'
}

export const jsonLiterals = [
  'true',
  'false',
  'null'
]
