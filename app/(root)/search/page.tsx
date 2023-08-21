import {
  fetchUser,
  fetchUsers,
} from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";

const Search = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userData = await fetchUser(user.id);

  if (!userData.onboarded) redirect("/onboarding");

  const users = await fetchUsers(userData._id);
  console.log("all users", users);

  return (
    <section>
      <h1 className='text-light-1'>Search</h1>;
    </section>
  );
};

export default Search;
