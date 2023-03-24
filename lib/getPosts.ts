// lib/getPosts.ts
import fs from "fs";
import path from "path";

export interface Post {
  fileName: string;
  id: string;
  title: string;
}

export function getSortedPosts(postsDirectory: string): Post[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames
    .filter((fileName) => fileName !== "[slug].tsx") // Add this line to filter out [slug].tsx
    .map((fileName) => {
      const id = fileName.replace(/\.tsx$/, "");
      const filePath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const title =
        fileContents.match(/export const title = '(.+)';/)?.[1] || id;
      return {
        fileName,
        id,
        title,
      };
    });
  return allPosts.sort(
    (a, b) => Number(b.id.split("-")[0]) - Number(a.id.split("-")[0])
  );
}
