import { SignIn } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

export default async function Page() {
  // Fetch the user from the server
  const user = await currentUser();

  // If the user is signed in, redirect them to their page
  if (user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <SignIn fallbackRedirectUrl={`/dashbaord`} />
      </div>
    );
  }

  // If no user is found, show the sign-in page
  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignIn />
    </div>
  );
}
