export interface HighlightJsonOptions {
  /**
   * @default
   * ```json
   * {
   *   "key": "#9cdcfe",
   *   "literal": "#569cd6",
   *   "number": "#b5cea8",
   *   "string": "#ce9178"
   * }
   * ```
   */
  colors: {
    key?: string
    literal?: string
    number?: string
    string?: string
  }
}

export type Indexes = {
  start: number
  end: number
}
