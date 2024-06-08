import { marked } from "marked";
import markedKatex from "marked-katex-extension";
import blockRenderers from "./block";
import inlineRenderers from "./inline";

const md = marked.use(
  markedKatex({
    strict: "error",
    throwOnError: false,
  }),
  {
    renderer: {
      ...blockRenderers,
      ...inlineRenderers,
    },
  },
);

interface MarkdownProps {
  text: string;
}

const Markdown = ({ text }: MarkdownProps): JSX.Element => (
  <div>{md.parse(text)}</div>
);

export default Markdown;
