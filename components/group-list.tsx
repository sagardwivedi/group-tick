import { QUERIES } from "@/db/queries";
import Link from "next/link";
import { Button } from "./ui/button";

export default async function GroupsList() {
	const groupsData = await QUERIES.getAllGroupsByUser();
	const { owner, member } = groupsData;

	return (
		<div className="space-y-8">
			{/* Groups You Created */}
			<div>
				<h2 className="text-lg font-semibold mb-3">Groups You Created</h2>
				{owner.length === 0 ? (
					<p className="text-gray-500">You haven't created any groups yet.</p>
				) : (
					<ul className="space-y-3">
						{owner.map((group) => (
							<li key={group.id}>
								<Button asChild variant="ghost">
									<Link href={`/g/${group.id}`}>{group.name}</Link>
								</Button>
							</li>
						))}
					</ul>
				)}
			</div>

			{/* Groups You Joined */}
			<div>
				<h2 className="text-lg font-semibold mb-3">Groups You Joined</h2>
				{member.length === 0 ? (
					<p className="text-gray-500">You haven't joined any groups yet.</p>
				) : (
					<ul className="space-y-3">
						{member.map((group) => (
							<li key={group.id}>
								<Button asChild variant="ghost">
									<Link href={`/g/${group.id}`}>{group.name}</Link>
								</Button>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}
