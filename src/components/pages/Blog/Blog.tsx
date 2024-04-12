import dayjs from "dayjs";
import { Link, Sections } from "../../shared";
import BasePage from "../BasePage";

interface BlogPostEntry {
  title: string;
  subtitle: string;
  date: string; // ISO format (YYYY-MM-DD)
}

const blogPost1: BlogPostEntry = {
  title: "Blog Post 1",
  subtitle: "This is the subtitle of the post",
  date: "2024-04-08",
};

const blogPost2: BlogPostEntry = {
  title: "Blog Post 2",
  subtitle: `
    This is the subtitle of the post with a slightly longer title to test the
    text wrapping in this component
  `,
  date: "2024-04-14",
};

const blogPost3: BlogPostEntry = {
  title: "Blog Post 3",
  subtitle: "This is the subtitle of the post",
  date: "2024-04-23",
};

const posts = [blogPost1, blogPost2, blogPost3];

const entries = posts.map(({ title, subtitle, date }) => ({
  title: "",
  content: [
    <div>
      <Link href="/blog/post" arrow={true} target="_self">
        <span class="font-bold text-white">{title}</span>
      </Link>
      <div class="flex justify-between font-light">
        <span>{subtitle}</span>
        <span class="text-secondary-text ml-3 text-nowrap italic">
          {dayjs(date, "YYYY-MM-DD").format("MMMM D, YYYY")}
        </span>
      </div>
    </div>,
  ],
}));

const Blog = () => (
  <BasePage current="blog">
    <Sections sectionNum="02" entries={entries} />
  </BasePage>
);

export default Blog;
