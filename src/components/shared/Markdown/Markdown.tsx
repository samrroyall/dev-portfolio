import { marked } from "marked";
import markedKatex from "marked-katex-extension";
import blockRenderers from "./block";
import inlineRenderers from "./inline";

const md = marked.use(markedKatex({ throwOnError: false }), {
  renderer: {
    ...blockRenderers,
    ...inlineRenderers,
  },
});

interface MarkdownProps {
  text: string;
}

const Markdown = ({ text }: MarkdownProps) => <div>{md.parse(text)}</div>;

export default Markdown;
