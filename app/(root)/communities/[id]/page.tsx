import BubblesTabs from "@/components/shared/BubblesTabs";
import ProfileHeader from "@/components/shared/ProfileHeader";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import Image from "next/image";
import React from "react";
import { fetchCurrentUserAndUserProfile } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { communityTabs } from "@/constants";
import { fetchCommunityDetails } from "@/lib/actions/community.actions";
import UserCard from "@/components/cards/UserCard";

interface CommunitiesProps {
  params: {
    id: string;
  };
}

const Communities = async ({
  params,
}: CommunitiesProps) => {
  const { user, userProfile } =
    await fetchCurrentUserAndUserProfile();
  if (!user) return null;
  if (!userProfile.onboarded) redirect("/onboarding");

  const communityDetails = await fetchCommunityDetails(
    params.id
  );

  const communityPosts = communityDetails.bubbles;
  console.log("posts", communityPosts);

  return (
    <section>
      <ProfileHeader
        accountId={communityDetails.id}
        authUserId={user.id}
        bio={communityDetails.bio}
        imgUrl={communityDetails.image}
        name={communityDetails.name}
        username={communityDetails.username}
        type='Community'
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
                  communityDetails.bubbles.length > 0 && (
                    <p className='ml-1 rounded-full bg-red-400 px-2 py-1 !text-tiny-medium text-light-2'>
                      {communityDetails.bubbles.length}
                    </p>
                  )}
              </TabsTrigger>
            );
          })}
        </TabsList>
        <TabsContent value='bubbles'>
          <BubblesTabs
            accountId={communityDetails._id}
            accountType='Community'
            currentUserId={user.id}
          />
        </TabsContent>
        <TabsContent value='members'>
          <section className='mt-9 flex flex-col gap-10'>
            {communityDetails?.members.map(
              (member: any) => {
                return (
                  <UserCard
                    key={member.id}
                    id={member.id}
                    imgUrl={member.image}
                    name={member.name}
                    personType='User'
                    username={member.username}
                  />
                );
              }
            )}
          </section>
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

export default Communities;
