import BubbleCard from "@/components/cards/BubbleCard";
import React from "react";
import { CommentProps } from "@/lib/types";
import { redirect } from "next/navigation";
import ProfileHeader from "@/components/shared/ProfileHeader";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { communityTabs } from "@/constants";
import Image from "next/image";
import BubblesTabs from "@/components/shared/BubblesTabs";
import { fetchCurrentUserAndUserProfile } from "@/lib/actions/user.actions";

interface ProfileProps {
  params: {
    id: string;
  };
}

const Profile = async ({ params }: ProfileProps) => {
  const { user, userProfile } =
    await fetchCurrentUserAndUserProfile(params.id);
  if (!user) return null;
  if (!userProfile.onboarded) redirect("/onboarding");

  if (!userProfile) {
    throw new Error("no user found");
  }

  if (!userProfile.onboarded) redirect("/onboarding");

  const bubblesList = userProfile.bubbles.map(
    (bubble: CommentProps) => {
      const isBubbleLiked: boolean =
        userProfile?.likes.includes(bubble._id.toString());
      return (
        <BubbleCard
          key={bubble._id}
          id={bubble._id}
          currentUserId={user?.id || ""}
          content={bubble.text}
          community={bubble.community}
          author={bubble.author}
          createdAt={bubble.createdAt}
          comments={bubble.children}
          parentId={bubble.parentId || ""}
          isComment={false}
          liked={isBubbleLiked}
        />
      );
    }
  );

  return (
    <section>
      <ProfileHeader
        accountId={userProfile.id}
        authUserId={user.id}
        bio={userProfile.bio}
        imgUrl={userProfile.image}
        name={userProfile.name}
        username={userProfile.username}
      />
      <div className='mt-9'></div>
      <Tabs defaultValue='bubbles' className='w-full'>
        <TabsList className='tab'>
          {communityTabs.map(({ label, value, icon }) => {
            return (
              <TabsTrigger key={value} value={value}>
                <Image
                  src={icon}
                  width={24}
                  height={24}
                  alt={"tab image"}
                  className='object-contained'
                />{" "}
                <p className='max-sm:hidden'>{label}</p>
                {label === "Bubbles" &&
                  bubblesList.length > 0 && (
                    <p className='ml-1 rounded-full bg-red-400 px-2 py-1 !text-tiny-medium text-light-2'>
                      {bubblesList.length}
                    </p>
                  )}
              </TabsTrigger>
            );
          })}
        </TabsList>
        <TabsContent value='bubbles'>
          <BubblesTabs
            currentUserId={user.id}
            accountId={userProfile.id}
            accountType='User'
          />
        </TabsContent>
        <TabsContent value='members'>
          <div>
            <h3 className='text-light-1'>
              second tab info here
            </h3>
          </div>
        </TabsContent>
        <TabsContent value='requests'>
          <div>
            <h3 className='text-light-1'>
              third tab info here
            </h3>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default Profile;
