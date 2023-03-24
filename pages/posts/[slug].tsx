// pages/posts/[slug].tsx
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import path from "path";
import { Post as PostType, getSortedPosts } from "../../lib/getPosts";

interface PostProps {
  post: PostType;
}

const PostPage: NextPage<PostProps> = ({ post }) => {
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
};

export default PostPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const postsDirectory = path.join(process.cwd(), "pages/posts");
  const paths = getSortedPosts(postsDirectory).map(({ id }) => ({
    params: { slug: id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PostProps> = async ({ params }) => {
  const postsDirectory = path.join(process.cwd(), "pages/posts");
  const allPosts = getSortedPosts(postsDirectory);
  const post = allPosts.find((p) => p.id === params.slug);

  return {
    props: {
      post,
    },
  };
};
