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

  return (
    <section>
      <ProfileHeader
        accountId={communityDetails.id}
        authUserId={user.id}
        bio={communityDetails.bio}
        imgUrl={communityDetails.image}
        name={communityDetails.name}
        username={communityDetails.username}
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
              </TabsTrigger>
            );
          })}
        </TabsList>
        <TabsContent value='bubbles'>
          <p className='text-light-1'>
            {communityDetails.name}
          </p>
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
