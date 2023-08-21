import UserCard from "@/components/cards/UserCard";
import {
  fetchUser,
  fetchUsers,
} from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import User from "@/lib/models/user.model";
import Image from "next/image";
import { redirect } from "next/navigation";

const Search = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userData = await fetchUser(user.id);

  if (!userData.onboarded) redirect("/onboarding");

  const result = await fetchUsers({
    userId: user.id,
    searchString: "",
    pageNumber: 1,
    pageSize: 25,
  });
  console.log("all users", result);

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
