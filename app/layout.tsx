import {
	ClerkProvider,
	SignInButton,
	SignedIn,
	SignedOut,
	UserButton,
} from "@clerk/nextjs";
import { Users } from "lucide-react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";

import GroupsList from "@/components/group-list";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import "./globals.css";

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
					<header className="sticky top-0 z-50 bg-white">
						<div className="px-8">
							<div className="h-16 flex justify-between items-center">
								<h1 className="text-2xl">GroupTick</h1>
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
											appearance={{ elements: { avatarBox: "w-8 h-8" } }}
											fallback={<Skeleton className="w-8 h-8 rounded-full" />}
										/>
									</SignedIn>
								</div>
							</div>
						</div>
					</header>

					<div className="flex flex-1">
						<SignedIn>
							<aside className="w-64 border-r bg-white fixed h-full overflow-y-auto">
								<div className="h-full">
									<div className="p-4 border-b">
										<h2 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
											<Users className="w-5 h-5" />
											Your Groups
										</h2>
									</div>
									<div className="p-2">
										<Suspense fallback={<GroupsSkeleton />}>
											<GroupsList />
										</Suspense>
									</div>
								</div>
							</aside>
						</SignedIn>

						<main className="flex-1 ml-64">
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
