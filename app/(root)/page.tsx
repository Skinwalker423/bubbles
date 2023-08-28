import { fetchBubbles } from "@/lib/actions/bubble.actions";
import BubbleCard from "@/components/cards/BubbleCard";
import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "@/lib/actions/user.actions";

export default async function Home() {
  const { posts, isNext } = await fetchBubbles(1, 30);
  const user = await currentUser();
  if (!user) return;
  const userDb = await fetchUser(user.id);

  const bubblesList = posts.map(
    ({
      _id,
      text,
      community,
      path,
      author,
      children,
      createdAt,
      parentId,
    }) => {
      const isBubbleLiked: boolean = userDb?.likes.includes(
        _id.toString()
      );

      return (
        <BubbleCard
          key={_id.toString()}
          id={_id.toString()}
          currentUserId={user?.id || ""}
          content={text}
          community={community}
          author={author}
          comments={children}
          createdAt={createdAt}
          parentId={parentId}
          liked={isBubbleLiked}
        />
      );
    }
  );

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
