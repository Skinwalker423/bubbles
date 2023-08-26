import UserCard from "@/components/cards/UserCard";
import {
  fetchUsers,
  fetchCurrentUserAndUserProfile,
} from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { fetchCommunities } from "@/lib/actions/community.actions";

const Search = async () => {
  const { user, userProfile } =
    await fetchCurrentUserAndUserProfile();
  if (!user) return null;
  if (!userProfile.onboarded) redirect("/onboarding");

  const { communities, isNext } = await fetchCommunities({
    searchString: "",
    pageNumber: 1,
    pageSize: 25,
  });

  return (
    <section>
      <h1 className='text-light-1'>Search</h1>;
      {/* seach bar */}
      <div className='mt-14 flex flx-col gap-9'>
        {communities.length === 0 ? (
          <p className='no-result'>No Users</p>
        ) : (
          <>
            {communities.map((community) => {
              return (
                <UserCard
                  key={community.id}
                  id={community.id}
                  name={community.name}
                  username={community.username}
                  imgUrl={community.image}
                  personType='Community'
                />
              );
            })}
          </>
        )}
      </div>
    </section>
  );
};

export default Search;
