import { MDXProvider } from "@mdx-js/react";
import Link from "next/link";

const components = {
  a: ({ href, ...props }) => (
    <Link href={href}>
      <a {...props} />
    </Link>
  ),
};

export default function Layout({ children }) {
  return (
    <MDXProvider components={components}>
      <div className="container mx-auto px-4 py-8 lg:px-8 max-w-screen-md">
        <div className="prose mx-auto">{children}</div>
      </div>
    </MDXProvider>
  );
}
