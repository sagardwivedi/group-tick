import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { MobileGroupsDrawer } from "@/components/mobile-groups";
import { Skeleton } from "@/components/ui/skeleton";
import { ModeToggle } from "../mode-toggle";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b bg-background py-3">
      <div className="md:px-8 px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Left Section: Logo & Drawer */}
          <div className="flex items-center gap-3">
            <SignedIn>
              <MobileGroupsDrawer />
            </SignedIn>
            <h1 className="text-xl md:text-2xl font-bold">GroupTick</h1>
          </div>

          {/* Right Section: Auth & Theme */}
          <AuthButton />
        </div>
      </div>
    </header>
  );
};

const AuthButton = () => (
  <div className="flex items-center gap-3">
    <ModeToggle />
    <SignedOut>
      <SignInButton mode="modal">
        <Button variant="outline" className="font-medium">
          Sign In
        </Button>
      </SignInButton>
    </SignedOut>
    <SignedIn>
      <UserButton
        fallback={<Skeleton className="w-10 h-10 rounded-full" />}
        appearance={{ elements: { avatarBox: "w-10 h-10" } }}
      />
    </SignedIn>
  </div>
);
