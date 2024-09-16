import { Post } from "@prisma/client"; // Prisma will generate this during client generation

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) {
  return (
    <article>
      {post.content}
    </article>
  );
}