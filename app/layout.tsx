import { Button } from "@/components/ui/button";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Skeleton } from "@/components/ui/skeleton";

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

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
				>
					<header className="p-4 flex justify-between items-center border-b">
						<h1 className="text-xl font-bold">GroupTick</h1>
						<div>
							<SignedOut>
								<div className="space-x-4">
									<SignInButton mode="modal" />
								</div>
							</SignedOut>
							<SignedIn>
								<UserButton fallback={<Skeleton className="rounded-full size-8" />} />
							</SignedIn>
						</div>
					</header>

					<main className="flex-grow p-4">
						<SignedIn>{children}</SignedIn>
						<SignedOut>
							{/* Hero Section */}
							<div className="max-w-4xl mx-auto px-4 py-20 text-center">
								<h1 className="text-5xl font-bold mb-6">GroupTick</h1>
								<p className="text-xl mb-8">
									Collaborate on tasks with your team, effortlessly.
								</p>
								<SignInButton mode="modal">
									<Button>Get Started</Button>
								</SignInButton>
							</div>

							{/* Features Section */}
							<div className="max-w-4xl mx-auto px-4 py-10">
								<h2 className="text-3xl font-semibold text-center mb-10">
									Features
								</h2>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
									<div className="p-4">
										<h3 className="text-xl font-semibold mb-2">Create Tasks</h3>
										<p>Easily create and assign tasks to team members.</p>
									</div>
									<div className="p-4">
										<h3 className="text-xl font-semibold mb-2">
											Track Progress
										</h3>
										<p>See who’s completed what at a glance.</p>
									</div>
									<div className="p-4">
										<h3 className="text-xl font-semibold mb-2">
											Real-time Updates
										</h3>
										<p>Stay in sync with live updates.</p>
									</div>
								</div>
							</div>
						</SignedOut>
					</main>

					<footer className="p-4 text-center text-sm text-gray-500 border-t">
						© {new Date().getFullYear()} GroupTick
					</footer>
				</body>
			</html>
		</ClerkProvider>
	);
}
