import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import "./globals.css";
import { LandingPageContent } from "@/components/landing-page";
import { GroupsList } from "@/components/group-list";
import { MobileGroupsDrawer } from "@/components/mobile-groups";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GroupTick",
  description: "A collaborative todo app for groups",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-gray-50`}
        >
          <header className="sticky bg-white inset-x-0 top-0 z-50 border-b">
            <div className="md:px-8 px-4">
              <div className="h-16 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <SignedIn>
                    <MobileGroupsDrawer />
                  </SignedIn>
                  <h1 className="md:text-2xl text-xl">GroupTick</h1>
                </div>
                <div>
                  <SignedOut>
                    <SignInButton mode="modal">
                      <Button variant="outline" className="font-medium">
                        Sign In
                      </Button>
                    </SignInButton>
                  </SignedOut>
                  <SignedIn>
                    <UserButton
                      showName
                      appearance={{
                        elements: {
                          avatarBox: "w-8 h-8",
                          userButtonBox: "flex items-center gap-2",
                        },
                      }}
                      fallback={<Skeleton className="w-8 h-8 rounded-full" />}
                    />
                  </SignedIn>
                </div>
              </div>
            </div>
          </header>
          <SignedOut>
            <LandingPageContent />
          </SignedOut>

          <div className="flex flex-1">
            <SignedIn>
              <aside className="w-64 max-md:hidden border-r bg-white fixed h-full">
                <div className="h-full">
                  <div className="p-2">
                    <Suspense fallback={<GroupsSkeleton />}>
                      <GroupsList />
                    </Suspense>
                  </div>
                </div>
              </aside>
            </SignedIn>

            <main className="flex-1 md:ml-64">
              <SignedIn>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                  {children}
                </div>
              </SignedIn>
            </main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
};

const GroupsSkeleton = () => (
  <div className="space-y-3">
    {[1, 2, 3].map((i) => (
      <Skeleton key={i} className="h-10 w-full rounded-md" />
    ))}
  </div>
);

export default RootLayout;
