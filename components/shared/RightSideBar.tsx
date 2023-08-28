import { fetchSuggestedCommunities } from "@/lib/actions/community.actions";
import React from "react";
import CommunityCard from "../cards/CommunityCard";

const RightSideBar = async () => {
  const { suggestedCommunities } =
    await fetchSuggestedCommunities({
      pageNumber: 1,
      pageSize: 25,
    });

  const communites = suggestedCommunities.map(
    (community) => {
      return (
        <li>
          <CommunityCard
            bio={community.bio}
            id={community._id}
            key={community._id}
            imgUrl={community.image}
            name={community.name}
            username={community.username}
            members={community.members}
          />
        </li>
      );
    }
  );

  console.log("suggested communites", suggestedCommunities);
  return (
    <section className='custom-scrollbar rightsidebar'>
      <div className='flex flex-1 flex-col justify-start overflow-auto'>
        <h3 className='text-light-1 text-heading4-medium'>
          Suggested Communities
        </h3>
        <ul className='flex flex-col gap-2'>
          {communites.length > 0 && communites}
        </ul>
      </div>
      <div className='flex flex-1 flex-col justify-start overflow-auto'>
        <h3 className='text-light-1 text-heading4-medium'>
          Suggested Users
        </h3>
      </div>
    </section>
  );
};

export default RightSideBar;
