// pages/posts/[slug].tsx
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { Post, getSortedPosts } from "../../lib/getPosts";

interface Props {
  post: Post;
}

export default function PostPage({ post }: Props) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const PostComponent = require(`./${post.fileName}`).default;

  return (
    <div>
      <h1>{post.title}</h1>
      <PostComponent />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths;
