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

  const htmlFileName = `${post.id}.html`;

  return (
    <div>
      <h1>{post.title}</h1>
      <iframe
        src={`/sketches/${htmlFileName}`}
        style={{ width: "100%", height: "400px", border: "none" }}
      ></iframe>
    </div>
  );
};

export default PostPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const postsDirectory = path.join(process.cwd(), "pages/posts"); // Update the directory here
  const paths = getSortedPosts(postsDirectory).map(({ id }) => ({
    params: { slug: id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PostProps> = async ({ params }) => {
  const postsDirectory = path.join(process.cwd(), "pages/posts"); // Update the directory here
  const allPosts = getSortedPosts(postsDirectory);
  const post = allPosts.find((p) => p.id === params.slug);

  return {
    props: {
      post,
    },
  };
};
