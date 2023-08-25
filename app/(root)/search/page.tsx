import UserCard from "@/components/cards/UserCard";
import {
  fetchUsers,
  fetchCurrentUserAndUserProfile,
} from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

const Search = async () => {
  const { user, userProfile } =
    await fetchCurrentUserAndUserProfile();
  if (!user) return null;
  if (!userProfile.onboarded) redirect("/onboarding");

  const result = await fetchUsers({
    userId: user.id,
    searchString: "",
    pageNumber: 1,
    pageSize: 25,
  });

  return (
    <section>
      <h1 className='text-light-1'>Search</h1>;
      {/* seach bar */}
      <div className='mt-14 flex flx-col gap-9'>
        {result.users.length === 0 ? (
          <p className='no-result'>No Users</p>
        ) : (
          <>
            {result.users.map((person) => {
              return (
                <UserCard
                  key={person.id}
                  id={person.id}
                  name={person.name}
                  username={person.username}
                  imgUrl={person.image}
                  personType='User'
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
