import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

const STORAGE_KEY = "notification_status";

const loadStatus = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
};

const saveStatus = (status) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(status));
};

const Notifications = () => {
  const [vaccinations, setVaccinations] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [healthRecords, setHealthRecords] = useState([]);
  const [status, setStatus] = useState(loadStatus());
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const unsubVax = onSnapshot(collection(db, "vaccinations"), (snap) =>
      setVaccinations(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    const unsubTreat = onSnapshot(collection(db, "treatments"), (snap) =>
      setTreatments(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    const unsubHealth = onSnapshot(collection(db, "healthRecords"), (snap) =>
      setHealthRecords(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    return () => {
      unsubVax();
      unsubTreat();
      unsubHealth();
    };
  }, []);

  const generated = [
    ...vaccinations
      .filter((v) => v.status === "Upcoming")
      .map((v) => ({
        id: `vax-${v.id}`,
        type: "Vaccination",
        message: `${v.animal} is due for ${v.vaccine} on ${v.nextDate || "an upcoming date"}.`,
        date: v.dateGiven || "",
      })),
    ...treatments
      .filter((t) => t.status === "Ongoing")
      .map((t) => ({
        id: `treat-${t.id}`,
        type: "Treatment",
        message: `${t.animal} treatment for ${t.condition} is ongoing — follow-up needed.`,
        date: t.date || "",
      })),
    ...healthRecords
      .filter((h) => h.status === "Attention Needed" || h.status === "Critical")
      .map((h) => ({
        id: `health-${h.id}`,
        type: "Health",
        message: `${h.animal} health check flagged: ${h.status}.`,
        date: h.checkupDate || "",
      })),
  ];

  const notifications = generated
    .filter((n) => !status[n.id]?.dismissed)
    .map((n) => ({ ...n, read: !!status[n.id]?.read }));

  const markAsRead = (id) => {
    const next = { ...status, [id]: { ...status[id], read: true } };
    setStatus(next);
    saveStatus(next);
  };

  const markAllAsRead = () => {
    const next = { ...status };
    generated.forEach((n) => {
      next[n.id] = { ...next[n.id], read: true };
    });
    setStatus(next);
    saveStatus(next);
  };

  const dismiss = (id) => {
    const next = { ...status, [id]: { ...status[id], dismissed: true } };
    setStatus(next);
    saveStatus(next);
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

          <div className="flex gap-2 mb-6 flex-wrap">
            {["All", "Unread", "Vaccination", "Treatment", "Health"].map((f) => (
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
                    {n.date && <p className="text-gray-400 text-xs mt-1">{n.date}</p>}
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
