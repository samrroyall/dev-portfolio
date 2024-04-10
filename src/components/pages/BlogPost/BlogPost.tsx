import dayjs, { type Dayjs } from "dayjs";
import { Markdown } from "../../shared";
import BasePage from "../BasePage";

const title = "Blog Post 1";

const subtitle = "This is the subtitle of the post";

const date: Dayjs = dayjs("2024-04-08", "YYYY-MM-DD");

const text = `
This is some example blog post text. You can see a link [here](#). This is 
**some bold text**. And so is __this__. And this is _some italic text_. And so 
is *this*. This is also a \`variable_name\`. This is an equation: $E = mc^2$. This is some example blog post text. You can see a link [here](#). This is 
**some bold text**. And so is __this__. And this is _some italic text_. And so 
is *this*. This is also a \`variable_name\`. This is an equation: $E = mc^2$.

This is some example blog post text. You can see a link [here](#). This is 
**some bold text**. And so is __this__. And this is _some italic text_. And so 
is *this*. This is also a \`variable_name\`. This is an equation: $E = mc^2$.

This is a link with no display text: <https://www.google.com>.

> This is a block quote by someone smart.

Here is some text...

> This is the outer block quote...
> 
> > And this is the inner block quote...

This is a block equation:

$$
x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}
$$

This is a nested unordered list:
- First
    - First First
        - First First First
            - First First First First
- Second
- Third

This is an ordered list:
1. First
1. Second

    Here is a paragraph related to the second item.

1. Third

This is another ordered list:
1. First
1. Second

    > Here is a block quote related to the second item.

1. Third

This is a nested ordered list:
1. First
    1. First First
    1. First Second
        1. First Second First
        1. First Second Second
1. Second
1. Third

---

This is some example blog post text. You can see a link [here](#). This is 
**some bold text**. And this is _some italic text_. This is also a 
\`variable_name\`. This is some example blog post text. You can see a link 
[here](#). This is **some bold text**. And this is _some italic text_. This is 
also a \`variable_name\`. This is some example blog post text. You can see a 
link [here](#). This is **some bold text**. And this is _some italic text_. 
This is also a \`variable_name\`.

---

This is a C++ code block:

\`\`\`cpp
int fib(int n) {
  if (n == 0 || n == 1) {
    return n;
  }

  return func(n - 1) + func(n - 2);
}
\`\`\`
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
    <hr class="border-primary-text" />
    <article class="p-3">
      <Markdown text={text} />
    </article>
  </BasePage>
);

export default BlogPost;
