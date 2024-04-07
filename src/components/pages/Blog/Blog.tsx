import { Sections } from "../../shared";
import BasePage from "../BasePage";

const entries = [
  { title: "Blog Entry 1", content: [<>Blog Entry 1 content</>] },
];

const Blog = () => (
  <BasePage current="blog">
    <Sections sectionNum="02" entries={entries} />
  </BasePage>
);

export default Blog;
