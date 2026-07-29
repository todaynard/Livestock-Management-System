import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Settings = () => {
  const [farmInfo, setFarmInfo] = useState({
    farmName: "Green Valley Farm",
    ownerName: "Farmer",
    location: "Nairobi, Kenya",
    contact: "0712 345 678",
  });

  const [preferences, setPreferences] = useState({
    emailAlerts: true,
    smsAlerts: false,
    vaccinationReminders: true,
    darkMode: false,
  });

  const [password, setPassword] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });

  const [savedMessage, setSavedMessage] = useState("");

  const handleFarmInfoChange = (e) => {
    setFarmInfo({ ...farmInfo, [e.target.name]: e.target.value });
  };

  const togglePreference = (key) => {
    setPreferences({ ...preferences, [key]: !preferences[key] });
  };

  const handlePasswordChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const showSaved = (label) => {
    setSavedMessage(label);
    setTimeout(() => setSavedMessage(""), 2500);
  };

  const handleFarmInfoSubmit = (e) => {
    e.preventDefault();
    showSaved("Farm profile updated successfully.");
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!password.current || !password.newPassword) return;
    if (password.newPassword !== password.confirm) {
      showSaved("Passwords do not match.");
      return;
    }
    setPassword({ current: "", newPassword: "", confirm: "" });
    showSaved("Password updated successfully.");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-6 max-w-3xl">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Settings</h1>

          {savedMessage && (
            <div className="bg-green-100 text-green-700 text-sm px-4 py-2 rounded-lg mb-4">
              {savedMessage}
            </div>
          )}

          {/* Farm Profile */}
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Farm Profile</h2>
            <form onSubmit={handleFarmInfoSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600 block mb-1">Farm Name</label>
                <input
                  type="text"
                  name="farmName"
                  value={farmInfo.farmName}
                  onChange={handleFarmInfoChange}
                  className="border rounded-lg px-3 py-2 text-sm w-full"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-1">Owner Name</label>
                <input
                  type="text"
                  name="ownerName"
                  value={farmInfo.ownerName}
                  onChange={handleFarmInfoChange}
                  className="border rounded-lg px-3 py-2 text-sm w-full"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={farmInfo.location}
                  onChange={handleFarmInfoChange}
                  className="border rounded-lg px-3 py-2 text-sm w-full"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-1">Contact Number</label>
                <input
                  type="text"
                  name="contact"
                  value={farmInfo.contact}
                  onChange={handleFarmInfoChange}
                  className="border rounded-lg px-3 py-2 text-sm w-full"
                />
              </div>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>

          {/* Notification Preferences */}
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Preferences</h2>
            <div className="space-y-4">
              {[
                { key: "emailAlerts", label: "Email Alerts" },
                { key: "smsAlerts", label: "SMS Alerts" },
                { key: "vaccinationReminders", label: "Vaccination Reminders" },
                { key: "darkMode", label: "Dark Mode" },
              ].map((pref) => (
                <div key={pref.key} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{pref.label}</span>
                  <button
                    onClick={() => togglePreference(pref.key)}
                    className={`w-11 h-6 rounded-full flex items-center px-0.5 transition-colors ${
                      preferences[pref.key] ? "bg-blue-600 justify-end" : "bg-gray-300 justify-start"
                    }`}
                  >
                    <span className="w-5 h-5 bg-white rounded-full shadow"></span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Change Password */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Change Password</h2>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 block mb-1">Current Password</label>
                <input
                  type="password"
                  name="current"
                  value={password.current}
                  onChange={handlePasswordChange}
                  className="border rounded-lg px-3 py-2 text-sm w-full"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-1">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={password.newPassword}
                  onChange={handlePasswordChange}
                  className="border rounded-lg px-3 py-2 text-sm w-full"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-1">Confirm New Password</label>
                <input
                  type="password"
                  name="confirm"
                  value={password.confirm}
                  onChange={handlePasswordChange}
                  className="border rounded-lg px-3 py-2 text-sm w-full"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Update Password
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;