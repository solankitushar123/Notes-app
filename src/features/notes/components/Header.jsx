import React from "react";

const Header = () => {
  return (
    <header className="bg-white border-b px-6 py-4 flex items-center justify-between shadow-sm">
      {/* Left - Title */}
      <h1 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
        📝 <span>My Notes</span>
      </h1>

      {/* Right - Controls */}
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Search notes..."
          className="border border-gray-300 text-sm px-3 py-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-56"
        />
        <img
          src="https://ui-avatars.com/api/?name=User"
          alt="profile"
          className="w-8 h-8 rounded-full border object-cover"
        />
      </div>
    </header>
  );
};

export default Header;
