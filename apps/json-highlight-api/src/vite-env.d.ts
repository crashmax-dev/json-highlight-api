/// <reference types="vite/client" />

declare global {
  class Highlight extends Set<Range> {
    constructor(...ranges: Range[])
  }

  declare namespace CSS {
    export const highlights: Map<string, Highlight>
  }
}

export {}
