# json-highlight-api

> [!WARNING]
> This package use [CSS Custom Highlight API](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Custom_Highlight_API)

## Install

```bash
pnpm add json-highlight-api
```

## Usage

```ts
import { highlightJson, injectHighlight } from 'json-highlight-api'

const { style, destroy } = injectHighlight(/** override colors */)
document.head.append(style)

// remove the style element and css highlights from `CSS.highlights`
// destroy()

const pre = document.createElement('pre')
pre.style.padding = '1rem'
pre.style.overflow = 'auto'
pre.style.color = '#d4d4d4'
pre.style.background = '#1e1e1e'
pre.style.whiteSpace = 'pre-wrap'
pre.textContent = JSON.stringify({ hello: 'world', age: 18 }, null, 2)

const code = document.createElement('code')
code.append(pre)
document.body.append(code)

// highlight pre tag
highlightJson(pre)
```
