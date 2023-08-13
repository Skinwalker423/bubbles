import { connectToMongoDb } from "@/lib/mongoose";
import Bubble from "@/lib/models/bubble.model";
import Image from "next/image";

export default async function Home() {
  const bubbles = await Bubble.find({}).populate({
    path: "author",
    model: "User",
  });
  console.log(bubbles);

  const bubblesList = bubbles.map((bubble) => {
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
