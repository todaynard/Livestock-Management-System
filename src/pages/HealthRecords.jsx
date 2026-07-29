import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

// PLACEHOLDER -- replace this whole file with your real HealthRecords.jsx content
const HealthRecords = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Health Records</h1>
          <div className="bg-white rounded-xl shadow p-6 text-gray-500">
            This is a placeholder page. Paste your real HealthRecords.jsx code here.
          </div>
        </main>
      </div>
    </div>
  );
};

export default HealthRecords;
