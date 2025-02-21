"use client";

import { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function CreateGroupForm({ userId }: { userId?: number }) {
	const [groupName, setGroupName] = useState("");
	const router = useRouter();

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		// Implement your create group logic here
		// For example: await QUERIES.createGroup(userId, groupName)
		setGroupName("");
		router.refresh();
	};

	return (
		<form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-4">
			<h2 className="text-xl font-semibold mb-2">Create New Group</h2>
			<Input
				type="text"
				value={groupName}
				onChange={(e) => setGroupName(e.target.value)}
				placeholder="Group Name"
				className="w-full p-2 border rounded mb-2"
				required
			/>
			<Button
				type="submit"
				className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
			>
				Create Group
			</Button>
		</form>
	);
}
