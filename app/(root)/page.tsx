import Image from "next/image";
import { fetchBubbles } from "@/lib/actions/bubble.actions";

export default async function Home() {
  const { posts, isNext } = await fetchBubbles();
  console.log(posts);

  const bubblesList = posts.map((bubble) => {
    return (
      <div className='border border-white'>
        <h2 className='flex items-center gap-2'>
          <Image
            className='rounded-full'
            src={bubble.author.image}
            width={50}
            height={50}
            alt={`avatar for ${bubble.author.username}`}
          />
          <span>created by: {bubble.author.username}</span>{" "}
        </h2>
        <p>{bubble.text}</p>
      </div>
    );
  });

  return (
    <main className='head-text text-left'>
      {bubblesList}
    </main>
  );
}
