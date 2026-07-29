import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "Vaccination",
      message: "Cow #12 is due for FMD vaccination on 2026-08-02.",
      date: "2026-07-28",
      read: false,
    },
    {
      id: 2,
      type: "Treatment",
      message: "Goat #5 treatment for bloating is ongoing — follow-up needed.",
      date: "2026-07-27",
      read: false,
    },
    {
      id: 3,
      type: "Health",
      message: "Sheep #9 health check completed — status: Healthy.",
      date: "2026-07-25",
      read: true,
    },
    {
      id: 4,
      type: "System",
      message: "Monthly farm report is ready to view in Reports.",
      date: "2026-07-24",
      read: true,
    },
  ]);

  const [filter, setFilter] = useState("All");

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const dismiss = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const typeColor = (type) => {
    switch (type) {
      case "Vaccination":
        return "bg-blue-100 text-blue-700";
      case "Treatment":
        return "bg-yellow-100 text-yellow-700";
      case "Health":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const filteredNotifications = notifications.filter((n) =>
    filter === "All" ? true : filter === "Unread" ? !n.read : n.type === filter
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Notifications{" "}
              {unreadCount > 0 && (
                <span className="text-sm bg-red-500 text-white px-2 py-1 rounded-full align-middle ml-2">
                  {unreadCount} new
                </span>
              )}
            </h1>
            <button
              onClick={markAllAsRead}
              className="text-sm text-blue-600 hover:underline"
            >
              Mark all as read
            </button>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {["All", "Unread", "Vaccination", "Treatment", "Health", "System"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                  filter === f
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Notification list */}
          <div className="bg-white rounded-xl shadow divide-y">
            {filteredNotifications.length === 0 ? (
              <p className="text-gray-500 p-6">No notifications to show.</p>
            ) : (
              filteredNotifications.map((n) => (
                <div
                  key={n.id}
                  className={`p-4 flex items-start justify-between gap-4 ${
                    !n.read ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${typeColor(n.type)}`}>
                        {n.type}
                      </span>
                      {!n.read && (
                        <span className="w-2 h-2 rounded-full bg-blue-600 inline-block"></span>
                      )}
                    </div>
                    <p className="text-gray-800 text-sm">{n.message}</p>
                    <p className="text-gray-400 text-xs mt-1">{n.date}</p>
                  </div>
                  <div className="flex flex-col gap-2 text-xs">
                    {!n.read && (
                      <button
                        onClick={() => markAsRead(n.id)}
                        className="text-blue-600 hover:underline"
                      >
                        Mark read
                      </button>
                    )}
                    <button
                      onClick={() => dismiss(n.id)}
                      className="text-red-600 hover:underline"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Notifications;