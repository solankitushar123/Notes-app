import React from "react";
import { BookOpenIcon, TagIcon } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="bg-white border-r border-gray-200 w-64 h-screen px-6 py-8 space-y-6 shadow-sm">
      <h1 className="text-xl font-semibold text-gray-800 text-center tracking-tight">
        📚 My Notes
      </h1>

      <nav className="flex flex-col gap-2">
        <SidebarButton icon={<BookOpenIcon size={18} />} label="All Notes" />
        <SidebarButton icon={<TagIcon size={18} />} label="Tags" />
      </nav>
    </aside>
  );
};

const SidebarButton = ({ icon, label }) => (
  <button className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition-colors">
    {icon}
    {label}
  </button>
);

export default Sidebar;
