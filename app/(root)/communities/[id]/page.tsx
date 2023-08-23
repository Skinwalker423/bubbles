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

  const communitiesList = userProfile.communities.map(
    (community: any) => {
      return (
        <div>
          <h3>{community._id.toString()}</h3>
        </div>
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
                  communitiesList.length > 0 && (
                    <p className='ml-1 rounded-full bg-red-400 px-2 py-1 !text-tiny-medium text-light-2'>
                      {communitiesList.length}
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

export default Communities;
