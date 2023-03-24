// mdx.js

import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import stringify from "rehype-stringify";

export const mdx = async (content) => {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(stringify)
    .process(content);

  return result.toString();
};
