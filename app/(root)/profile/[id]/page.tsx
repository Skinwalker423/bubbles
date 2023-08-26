import React from "react";
import { redirect } from "next/navigation";
import ProfileHeader from "@/components/shared/ProfileHeader";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { communityTabs, profileTabs } from "@/constants";
import Image from "next/image";
import BubblesTabs from "@/components/shared/BubblesTabs";
import { fetchCurrentUserAndUserProfile } from "@/lib/actions/user.actions";

interface ProfileProps {
  params: {
    id: string;
  };
}

const Profile = async ({ params }: ProfileProps) => {
  const { user, userProfile, profile } =
    await fetchCurrentUserAndUserProfile(params.id);
  if (!user) return null;
  if (!userProfile.onboarded) redirect("/onboarding");

  if (!profile) {
    throw new Error("no user found");
  }

  return (
    <section>
      <ProfileHeader
        accountId={profile.id}
        authUserId={user.id}
        bio={profile.bio}
        imgUrl={profile.image}
        name={profile.name}
        username={profile.username}
      />
      <div className='mt-9'></div>
      <Tabs defaultValue='bubbles' className='w-full'>
        <TabsList className='tab'>
          {profileTabs.map(({ label, value, icon }) => {
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
                  profile.bubbles.length > 0 && (
                    <p className='ml-1 rounded-full bg-red-400 px-2 py-1 !text-tiny-medium text-light-2'>
                      {profile.bubbles.length}
                    </p>
                  )}
              </TabsTrigger>
            );
          })}
        </TabsList>
        <TabsContent value='bubbles'>
          <BubblesTabs
            currentUserId={user.id}
            accountId={profile.id}
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
