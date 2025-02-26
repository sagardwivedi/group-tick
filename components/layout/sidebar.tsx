import { GroupsList } from "@/components/group-list";

export const Sidebar = () => {
  return (
    <aside className="w-68 max-md:hidden border-r fixed h-full">
      <div className="h-full p-1">
        <GroupsList />
      </div>
    </aside>
  );
};
