// pages/index.tsx
import { GetStaticProps } from "next";
import Link from "next/link";
import path from "path";
import { Post, getSortedPosts } from "../lib/getPosts";

interface Props {
  allPosts: Post[];
}

export default function Home({ allPosts }: Props) {
  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {allPosts.map(({ id, title }) => (
          <li key={id}>
            <Link href={`/posts/${id}`}>{title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const postsDirectory = path.join(process.cwd(), "pages", "posts");
  const allPosts = getSortedPosts(postsDirectory);
  return {
    props: {
      allPosts,
    },
  };
};
