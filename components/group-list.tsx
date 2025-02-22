import { QUERIES } from "@/db/queries";
import Link from "next/link";
import { Button } from "./ui/button";
import { Crown, Users, PlusCircle, Search } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { GroupCreateJoinDialog } from "./group-create-join-dialog";

export default async function GroupsList() {
	const groupsData = await QUERIES.getAllGroupsByUser();
	const { owner, member } = groupsData;

	return (
		<ScrollArea className="h-[79vh]">
			<div className="space-y-5 max-w-3xl mx-auto">
				{/* Groups You Created */}
				<section className="bg-indigo-50/50 p-6 rounded-xl border border-indigo-100">
					<div className="flex items-center gap-3 mb-6">
						<Crown className="w-6 h-6 text-indigo-600" />
						<h2 className="text-xl font-semibold text-indigo-900">
							Created Groups
						</h2>
					</div>

					{owner.length === 0 ? (
						<div className="text-center space-y-4 py-8">
							<div className="text-gray-500 space-y-3">
								<PlusCircle className="w-12 h-12 mx-auto text-gray-400" />
								<p className="text-lg">You haven&apos;t created any groups yet</p>
								<Button asChild className="mt-4">
									<Link href="/create-group">Create New Group</Link>
								</Button>
							</div>
						</div>
					) : (
						<ul className="grid gap-3">
							{owner.map((group) => (
								<li key={group.id}>
									<Button
										asChild
										className="w-full justify-start px-3 py-5 bg-white hover:bg-indigo-50 transition-all 
									         shadow-sm hover:shadow-md group rounded-xl"
									>
										<Link href={`/g/${group.id}`}>
											<span className="mr-3 text-indigo-600 group-hover:text-indigo-700">
												<Crown className="w-5 h-5" />
											</span>
											<span className="text-gray-800 group-hover:text-indigo-900 font-medium">
												{group.name}
											</span>
										</Link>
									</Button>
								</li>
							))}
						</ul>
					)}
				</section>

				{/* Groups You Joined */}
				<section className="bg-green-50/50 p-6 rounded-xl border border-green-100">
					<div className="flex items-center gap-3 mb-6">
						<Users className="w-6 h-6 text-green-600" />
						<h2 className="text-xl font-semibold text-green-900">
							Joined Groups
						</h2>
					</div>

					{member.length === 0 ? (
						<div className="text-center space-y-4 py-8">
							<div className="text-gray-500 space-y-3">
								<Search className="w-12 h-12 mx-auto text-gray-400" />
								<p className="text-lg">You haven&apos;t joined any groups yet</p>
								<GroupCreateJoinDialog />
							</div>
						</div>
					) : (
						<ul className="grid gap-3">
							{member.map((group) => (
								<li key={group.id}>
									<Button
										asChild
										className="w-full justify-start px-6 py-5 bg-white hover:bg-green-50 transition-all 
									         shadow-sm hover:shadow-md group rounded-xl"
									>
										<Link href={`/g/${group.id}`}>
											<span className="mr-3 text-green-600 group-hover:text-green-700">
												<Users className="w-5 h-5" />
											</span>
											<span className="text-gray-800 group-hover:text-green-900 font-medium">
												{group.name}
											</span>
										</Link>
									</Button>
								</li>
							))}
						</ul>
					)}
				</section>
			</div>
		</ScrollArea>
	);
}
