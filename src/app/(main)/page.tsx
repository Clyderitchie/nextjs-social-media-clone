import PostEditor from "@/components/posts/editor/PostEditor";
import Post from "@/components/posts/Post";
import prisma from "@/lib/prisma";

export default async function Home() {
  const posts = await prisma.post.findMany({
    include: {
      //Prisma way of doing a JOIN for the schema. User is the model and select is the data we want to show in the UI/Front End
      user: {
        select: {
          username: true,
          displayName: true,
          avatarUrl: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
  return (
    // Main class below is responsible for setting background color for the Post screen section
    <main className="h=[200vh] w-full  bg-red-50">
      <div className="w-full">
        <PostEditor />
        {posts.map((post) => {
          console.log(post); // This will log each post in the console
          return <Post key={post.id} post={post} />;
        })}
      </div>
    </main>
  );
}
