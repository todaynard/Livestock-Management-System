import React from "react";
import { Link } from "react-router-dom";

const navItems = [
  { label: "Dashboard", to: "/farmer" },
  { label: "Livestock", to: "/livestock" },
  { label: "Health Records", to: "/health-records" },
  { label: "Vaccinations", to: "/vaccinations" },
  { label: "Treatments", to: "/treatments" },
  { label: "Reports", to: "/reports" },
  { label: "Notifications", to: "/notifications" },
  { label: "Settings", to: "/settings" },
];

const Sidebar = () => {
  return (
    <aside className="w-56 bg-gray-900 text-gray-200 min-h-screen p-4 hidden md:block">
      <h1 className="text-xl font-bold text-white mb-6">🐄 FarmApp</h1>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="block px-3 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
