// pages/index.tsx
import fs from "fs";
import path from "path";
import Link from "next/link";

interface Post {
  id: string;
  title: string;
}

interface IndexProps {
  posts: Post[];
}

export default function Index({ posts }: IndexProps) {
  return (
    <div>
      <h1>Sketches</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/sketches/${post.id}.html`}>
              {post.id.split("-")[0]} - {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const sketchesDirectory = path.join(process.cwd(), "public/sketches");
  const fileNames = fs.readdirSync(sketchesDirectory);
  const posts = fileNames
    .filter((fileName) => /\.html$/.test(fileName))
    .map((fileName) => {
      const id = fileName.replace(/\.html$/, "");
      const title = id.split("-").slice(1).join(" ");
      return {
        id,
        title,
      };
    })
    .sort((a, b) => Number(b.id.split("-")[0]) - Number(a.id.split("-")[0]));

  return {
    props: {
      posts,
    },
  };
}
