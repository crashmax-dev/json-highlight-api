import { highlightJson, generateHighlightStyle } from "json-highlight-api";
import "./index.css";

const app = document.querySelector<HTMLDivElement>("#app")!;

const json = {
  a: "string",
  b: 111,
  c: false,
  d: true,
  e: null,
  f: {
    ww: "kkk",
    qq: [1, 2, 3],
    rr: { t: "awt" },
  },
  g: '<p>hello world</p> with \n <p>new line</p> and quote sign: "',
};

const style = generateHighlightStyle({
  colors: { falseColor: "#f44747" },
});
document.head.append(style);

const code = document.createElement("code");
const pre = document.createElement("pre");
pre.style.background = "#1e1e1e";
pre.style.color = "#d4d4d4";
pre.style.overflow = "auto";
pre.textContent = JSON.stringify(json, null, 2);
code.append(pre);
app.append(code);

highlightJson(pre);
