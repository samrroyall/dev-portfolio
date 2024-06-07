import { type BlogPostInfo } from "../../../models/blog";
import { getLowercaseCharAt, getPrettyDate } from "../../../utils";
import { Heading, Icon, Link } from "../../shared";

interface BlogCardProps {
  data: BlogPostInfo;
  index: number;
  sectionNum: string;
}

const BlogCard = ({ data, index, sectionNum }: BlogCardProps) => (
  <div class="border-primary-text dark:border-primary-text-dark flex h-[300px] flex-col justify-between rounded border p-3">
    <div class="flex justify-between">
      <span class="font-geist-mono">{`${sectionNum}.${getLowercaseCharAt(index)}`}</span>
      <span class="text-nowrap font-semibold">
        <Link href={`/blog/post/${data.slug}`} arrow={true} target="_self">
          {"Read more"}
        </Link>
      </span>
    </div>
    <div class="flex flex-col">
      <p>
        <span>{getPrettyDate(data.createdAt)}</span>
      </p>
      <Heading text={data.title} variant={2} inline={true} />
    </div>
  </div>
);

export default BlogCard;
