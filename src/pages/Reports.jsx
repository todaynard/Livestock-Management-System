import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

const Reports = () => {
  const [animals, setAnimals] = useState([]);
  const [vaccinations, setVaccinations] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubAnimals = onSnapshot(collection(db, "animals"), (snap) =>
      setAnimals(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    const unsubVax = onSnapshot(collection(db, "vaccinations"), (snap) =>
      setVaccinations(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    const unsubTreat = onSnapshot(collection(db, "treatments"), (snap) => {
      setTreatments(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return () => {
      unsubAnimals();
      unsubVax();
      unsubTreat();
    };
  }, []);

  const totalLivestock = animals.length;
  const vaccinatedCount = vaccinations.filter((v) => v.status === "Completed").length;
  const pendingVaccinations = vaccinations.filter((v) => v.status === "Upcoming").length;

  const now = new Date();
  const treatmentsThisMonth = treatments.filter((t) => {
    if (!t.date) return false;
    const tDate = new Date(t.date);
    return tDate.getMonth() === now.getMonth() && tDate.getFullYear() === now.getFullYear();
  }).length;

  const reportCards = [
    { label: "Total Livestock", value: totalLivestock, color: "bg-blue-50 text-blue-700" },
    { label: "Vaccinated", value: vaccinatedCount, color: "bg-green-50 text-green-700" },
    { label: "Pending Vaccinations", value: pendingVaccinations, color: "bg-yellow-50 text-yellow-700" },
    { label: "Treatments This Month", value: treatmentsThisMonth, color: "bg-red-50 text-red-700" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Reports</h1>

          {loading ? (
            <p className="text-gray-500">Loading report data...</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {reportCards.map((card) => (
                  <div key={card.label} className={`rounded-xl shadow p-5 ${card.color}`}>
                    <p className="text-sm font-medium">{card.label}</p>
                    <p className="text-3xl font-bold mt-2">{card.value}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-xl shadow p-6 mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">Vaccination Coverage</h2>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-green-500 h-4 rounded-full"
                    style={{
                      width: `${totalLivestock ? Math.min((vaccinatedCount / totalLivestock) * 100, 100) : 0}%`,
                    }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {vaccinatedCount} of {totalLivestock} animals vaccinated
                </p>
              </div>

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
            </>
          )}
        </main>
      </div>
    </div>
  );
};
export default Reports;
