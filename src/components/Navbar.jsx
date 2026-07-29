import React from "react";

const Navbar = () => {
  return (
    <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
      <span className="text-lg font-semibold text-gray-800">
        Farm Manager
      </span>

      <div className="flex items-center gap-3">
        <span className="text-gray-500 text-sm">Welcome, Farmer</span>
        <div className="w-9 h-9 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
          F
        </div>
      </div>
    </header>
  );
};

export default Navbar;
