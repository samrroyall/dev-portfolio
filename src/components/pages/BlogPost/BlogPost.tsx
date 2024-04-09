import dayjs, { type Dayjs } from "dayjs";
import { Markdown } from "../../shared";
import BasePage from "../BasePage";

const title = "Blog Post 1";

const subtitle = "This is the subtitle of the post";

const date: Dayjs = dayjs("2024-04-08", "YYYY-MM-DD");

const text = `
This is some example blog post text. You can see a link [here](#). This is 
**some bold text**. And this is _some italic text_. This is also a 
\`variable_name\`. This is some example blog post text. You can see a link 
[here](#). This is **some bold text**. And this is _some italic text_. This is 
also a \`variable_name\`. This is some example blog post text. You can see a 
link [here](#). This is **some bold text**. And this is _some italic text_. 
This is also a \`variable_name\`. This is an equation: $E = mc^2$.

This is some example blog post text. You can see a link [here](#). This is 
**some bold text**. And this is _some italic text_. This is also a 
\`variable_name\`. This is some example blog post text. You can see a link 
[here](#). This is **some bold text**. And this is _some italic text_. This is 
also a \`variable_name\`. This is some example blog post text. You can see a 
link [here](#). This is **some bold text**. And this is _some italic text_. 
This is also a \`variable_name\`.

> This is a block quote by someone smart.

This is a block equation

$$
x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}
$$

This is an unordered list:
- First
  - First First
    - First Second
      - First Third
- Second
- Third

This is an ordered list:
1. First
  1. First First
    1. First Second
      1. First Third
2. Second
3. Third

---

This is some example blog post text. You can see a link [here](#). This is 
**some bold text**. And this is _some italic text_. This is also a 
\`variable_name\`. This is some example blog post text. You can see a link 
[here](#). This is **some bold text**. And this is _some italic text_. This is 
also a \`variable_name\`. This is some example blog post text. You can see a 
link [here](#). This is **some bold text**. And this is _some italic text_. 
This is also a \`variable_name\`.
`;

// interface BlogPostProps {
//   title: string;
//   subtitle: string;
//   date: Dayjs;
//   text: string;
// }

// const BlogPost = ({ title, subtitle, date, text }: BlogPostProps) => (

const BlogPost = () => (
  <BasePage current="">
    <header>
      <div class="text-secondary-text text-2xl font-bold">{title}</div>
      <div class="text-lg font-light">{subtitle}</div>
      <div class="text-secondary-text w-full text-right">
        {date.format("MMMM D, YYYY")}
      </div>
    </header>
    <hr class="text-secondary-bg" />
    <article>
      <Markdown text={text} />
    </article>
  </BasePage>
);

export default BlogPost;
