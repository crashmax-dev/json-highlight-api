import { generateHighlightStyle, highlightJson } from 'json-highlight-api'
import { el } from 'zero-dependency'

import './index.css'

const app = document.querySelector<HTMLDivElement>('#app')!

const { style, destroy } = generateHighlightStyle()
document.head.append(style)

const jsons = [
  createHighlightElement({
    a: 'string',
    b: 111,
    c: false,
    d: true,
    e: null,
    f: {
      aa: '',
      ww: 'kkk',
      qq: [
        1,
        2,
        3
      ],
      rr: { t: 'awt' }
    },
    g: '<p>hello world</p> with \n <p>new line</p> and quote sign: "'
  }),
  createHighlightElement({
    aboba: 'hello',
    a: 1,
    b: null,
    c: true
  })

]

for (const json of jsons) {
  highlightJson(json)
}

function createHighlightElement(json: any): HTMLElement {
  const pre = el('pre', JSON.stringify(json, null, 2))
  const code = el('code', pre)
  app.append(code)
  return pre
}
