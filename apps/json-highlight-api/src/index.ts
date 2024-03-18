export interface HighlightJsonOptions {
  /**
   * @default
   * ```json
   * {
   *   "keyColor": "#9cdcfe",
   *   "nullColor": "#569cd6",
   *   "trueColor": "#569cd6",
   *   "falseColor": "#569cd6",
   *   "numberColor": "#b5cea8",
   *   "stringColor": "#ce9178",
   *   "bracketsColor": "#d4d4d4"
   * }
   * ```
   */
  colors?: {
    keyColor?: string;
    nullColor?: string;
    trueColor?: string;
    falseColor?: string;
    numberColor?: string;
    stringColor?: string;
  };
}

const defaultColors: HighlightJsonOptions["colors"] = {
  keyColor: "#9cdcfe",
  nullColor: "#569cd6",
  trueColor: "#569cd6",
  falseColor: "#569cd6",
  numberColor: "#b5cea8",
  stringColor: "#ce9178",
};

function highlightKey(str: string): string {
  return `json-highlight-${str.toLowerCase().replace("color", "")}`;
}

declare global {
  class Highlight {
    constructor(...ranges: Range[]);
  }
}

export function generateHighlightStyle(
  options?: HighlightJsonOptions
): HTMLStyleElement {
  const style = document.createElement("style");
  const colors = { ...defaultColors, ...options?.colors };

  for (const [key, color] of Object.entries(colors)) {
    style.innerHTML += `::highlight(${highlightKey(
      key
    )}) { color: ${color}; }\n`;
  }

  return style;
}

export function highlightJson(node: Node, str = ": ") {
  const treeWalker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
  const textNode = treeWalker.nextNode();
  if (!textNode?.textContent) {
    throw new Error("Node has no text content");
  }

  const text = textNode.textContent;
  const matches = text.matchAll(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+]?\d+)?)/g
  );
  console.log([...matches]);

  const indices = [];
  let startPos = 0;
  while (startPos < text.length) {
    const index = text.indexOf(str, startPos);
    if (index === -1) break;
    indices.push(index);
    startPos = index + str.length;
  }

  const ranges = indices.map((index) => {
    const range = new Range();
    range.setStart(textNode, index);
    range.setEnd(textNode, index + str.length);
    return range;
  });

  const hightlight = new Highlight(...ranges);
  CSS.highlights.set(highlightKey("key"), hightlight);
}
