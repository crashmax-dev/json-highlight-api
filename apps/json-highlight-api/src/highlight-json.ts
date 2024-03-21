import { jsonLiterals } from './constants.js'
import { createRange, highlightColorKey } from './utils.js'
import type { Indexes } from './types.js'

export function highlightJson(node: Node): void {
  const treeWalker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT)
  const textNode = treeWalker.nextNode()
  if (!textNode?.textContent) {
    throw new Error('Node has no text content')
  }

  const text = textNode.textContent
  const matches = text.matchAll(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+]?\d+)?)/g
  )

  const jsonRanges: Record<string, Range[]> = {}

  for (const match of matches) {
    const value = match[0]
    if (!value || match.index === undefined) continue

    const indexes: Indexes = {
      start: match.index,
      end: match.index + value.length
    }

    let rangeType: string = ''

    if (value.endsWith(':')) {
      rangeType = 'key'
      indexes.end -= 1
    }

    if (value.endsWith('"')) {
      rangeType = 'string'
    }

    if (!isNaN(parseFloat(value))) {
      rangeType = 'number'
    }

    if (jsonLiterals.includes(value)) {
      rangeType = 'literal'
    }

    if (rangeType) {
      const range = createRange(textNode, indexes)
      jsonRanges[rangeType] ??= []
      jsonRanges[rangeType].push(range)
    }
  }

  for (const [color, ranges] of Object.entries(jsonRanges)) {
    const colorKey = highlightColorKey(color)
    if (CSS.highlights.has(colorKey)) {
      const actualHighlights = CSS.highlights.get(colorKey)!
      for (const range of ranges) {
        actualHighlights.add(range)
      }
    } else {
      const highlight = new Highlight(...ranges)
      CSS.highlights.set(highlightColorKey(color), highlight)
    }
  }
}
