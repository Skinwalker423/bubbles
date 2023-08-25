import ProfileHeader from "@/components/shared/ProfileHeader";
import Image from "next/image";
import React from "react";
import { fetchCurrentUserAndUserProfile } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { fetchCommunities } from "@/lib/actions/community.actions";

const Page = async () => {
  const { user, userProfile } =
    await fetchCurrentUserAndUserProfile();
  if (!user) return null;
  if (!userProfile.onboarded) redirect("/onboarding");

  // const communities = await fetchCommunities();

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
      {communitiesList.length > 0 ? (
        <p className=' text-light-2'>{communitiesList}</p>
      ) : (
        <p className=' text-light-2'>
          No communities added
        </p>
      )}
    </section>
  );
};

export default Page;
