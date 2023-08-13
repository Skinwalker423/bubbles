import Image from "next/image";
import { fetchBubbles } from "@/lib/actions/bubble.actions";

export default async function Home() {
  const { posts, isNext } = await fetchBubbles(1, 30);
  console.log(posts);

  const bubblesList = posts.map((bubble) => {
    return (
      <div
        key={bubble._id.toString()}
        className=' rounded-lg bg-dark-4'
      >
        <h2 className='flex items-center gap-2'>
          <Image
            className='rounded-full'
            src={bubble.author.image}
            width={50}
            height={50}
            alt={`avatar for ${bubble.author.username}`}
          />
          <span className='text-light-1'>
            created by: {bubble.author.username}
          </span>{" "}
        </h2>
        <p className='text-light-1'>{bubble.text}</p>
      </div>
    );
  });

  return (
    <>
      <h1 className='head-text text-left'>Home</h1>
      <section className='mt-9 flex flex-col gap-9'>
        {posts.length === 0 ? (
          <p>No bubbles found</p>
        ) : (
          <>{bubblesList}</>
        )}
      </section>
    </>
  );
}
