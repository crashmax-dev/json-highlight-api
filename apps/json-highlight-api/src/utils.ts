import { defaultColors } from './constants.js'
import type { HighlightJsonOptions, Indexes } from './types.js'

export function highlightColorKey(str: string): string {
  return `json-highlight-${str}`
}

export function injectHighlight(options?: HighlightJsonOptions): {
  style: HTMLStyleElement
  destroy: () => void
} {
  const style = document.createElement('style')
  const colors = { ...defaultColors, ...options?.colors }

  for (const [key, color] of Object.entries(colors)) {
    style.innerHTML += `::highlight(${highlightColorKey(
      key
    )}) { color: ${color}; }\n`
  }

  return {
    style,
    destroy: () => destroyHighlight(style)
  }
}

function destroyHighlight(style: HTMLStyleElement): void {
  style?.remove()

  for (const color of Object.keys(defaultColors)) {
    const colorKey = highlightColorKey(color)
    CSS.highlights.delete(colorKey)
  }
}

export function createRange(node: Node, indexes: Indexes): Range {
  const range = new Range()
  range.setStart(node, indexes.start)
  range.setEnd(node, indexes.end)
  return range
}
