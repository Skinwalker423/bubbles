import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className='flex w-full h-full justify-center items-center'>
      <SignUp />
    </main>
  );
}
