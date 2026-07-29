import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const FarmerDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Farmer Dashboard
          </h1>
 
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="bg-white rounded-xl shadow p-5">
              <h2 className="text-gray-500 text-sm">Total Livestock</h2>
              <p className="text-3xl font-bold text-green-600 mt-2">120</p>
            </div>

            <div className="bg-white rounded-xl shadow p-5">
              <h2 className="text-gray-500 text-sm">Healthy Animals</h2>
              <p className="text-3xl font-bold text-blue-600 mt-2">105</p>
            </div>

            <div className="bg-white rounded-xl shadow p-5">
              <h2 className="text-gray-500 text-sm">Vaccinations Due</h2>
              <p className="text-3xl font-bold text-yellow-500 mt-2">8</p>
            </div>

            <div className="bg-white rounded-xl shadow p-5">
              <h2 className="text-gray-500 text-sm">Monthly Expenses</h2>
              <p className="text-3xl font-bold text-red-600 mt-2">$2,450</p>
            </div>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
              <ul className="space-y-3">
                <li className="border-b pb-2">🐄 Cow ID 024 added to livestock records</li>
                <li className="border-b pb-2">💉 Vaccination completed for Goat ID 015</li>
                <li className="border-b pb-2">🌾 Feed inventory updated</li>
                <li>📋 Health report generated</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Animal Health Overview</h2>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between">
                    <span>Cattle</span>
                    <span>85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-green-500 h-3 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between">
                    <span>Goats</span>
                    <span>75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-blue-500 h-3 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between">
                    <span>Poultry</span>
                    <span>90%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-yellow-500 h-3 rounded-full" style={{ width: "90%" }}></div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="bg-white rounded-xl shadow mt-8 p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="flex flex-wrap gap-4">
              <button className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700">
                Add Animal
              </button>
              <button className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700">
                Record Health
              </button>
              <button className="bg-yellow-500 text-white px-5 py-3 rounded-lg hover:bg-yellow-600">
                Add Vaccination
              </button>
              <button className="bg-gray-700 text-white px-5 py-3 rounded-lg hover:bg-gray-800">
                View Reports
              </button>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default FarmerDashboard;
