import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Reports = () => {
  // Replace this mock data with real data from your Livestock/Vaccinations state, API, or localStorage
  const [stats, setStats] = useState({
    totalLivestock: 0,
    vaccinated: 0,
    pendingVaccinations: 0,
    treatmentsThisMonth: 0,
  });

  useEffect(() => {
    // Example: pull from localStorage if you're storing livestock data there
    // const livestock = JSON.parse(localStorage.getItem("livestock")) || [];
    // const vaccinations = JSON.parse(localStorage.getItem("vaccinations")) || [];

    // Mock data for now
    setStats({
      totalLivestock: 42,
      vaccinated: 30,
      pendingVaccinations: 12,
      treatmentsThisMonth: 5,
    });
  }, []);

  const reportCards = [
    { label: "Total Livestock", value: stats.totalLivestock, color: "bg-blue-50 text-blue-700" },
    { label: "Vaccinated", value: stats.vaccinated, color: "bg-green-50 text-green-700" },
    { label: "Pending Vaccinations", value: stats.pendingVaccinations, color: "bg-yellow-50 text-yellow-700" },
    { label: "Treatments This Month", value: stats.treatmentsThisMonth, color: "bg-red-50 text-red-700" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Reports</h1>

          {/* Summary cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {reportCards.map((card) => (
              <div key={card.label} className={`rounded-xl shadow p-5 ${card.color}`}>
                <p className="text-sm font-medium">{card.label}</p>
                <p className="text-3xl font-bold mt-2">{card.value}</p>
              </div>
            ))}
          </div>

          {/* Vaccination coverage bar */}
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Vaccination Coverage</h2>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-green-500 h-4 rounded-full"
                style={{
                  width: `${stats.totalLivestock ? (stats.vaccinated / stats.totalLivestock) * 100 : 0}%`,
                }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {stats.vaccinated} of {stats.totalLivestock} animals vaccinated
            </p>
          </div>

          {/* Placeholder for future: export button */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Export Report</h2>
            <p className="text-gray-500 mb-4">Download a summary of farm health data.</p>
            <button
              onClick={() => window.print()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Print / Export
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Reports;