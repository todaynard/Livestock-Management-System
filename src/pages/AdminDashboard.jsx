import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [animals, setAnimals] = useState([]);
  const [healthRecords, setHealthRecords] = useState([]);
  const [vaccinations, setVaccinations] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [farmProfiles, setFarmProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubAnimals = onSnapshot(collection(db, "animals"), (snap) =>
      setAnimals(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    const unsubHealth = onSnapshot(collection(db, "healthRecords"), (snap) =>
      setHealthRecords(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    const unsubVax = onSnapshot(collection(db, "vaccinations"), (snap) =>
      setVaccinations(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    const unsubTreat = onSnapshot(collection(db, "treatments"), (snap) =>
      setTreatments(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    const unsubProfiles = onSnapshot(collection(db, "farmProfiles"), (snap) => {
      setFarmProfiles(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return () => {
      unsubAnimals();
      unsubHealth();
      unsubVax();
      unsubTreat();
      unsubProfiles();
    };
  }, []);

  const speciesBreakdown = animals.reduce((acc, a) => {
    const type = a.type || "Unknown";
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow p-5">
                  <h2 className="text-gray-500 text-sm">Total Livestock</h2>
                  <p className="text-3xl font-bold text-green-600 mt-2">{animals.length}</p>
                </div>
                <div className="bg-white rounded-xl shadow p-5">
                  <h2 className="text-gray-500 text-sm">Health Records</h2>
                  <p className="text-3xl font-bold text-blue-600 mt-2">{healthRecords.length}</p>
                </div>
                <div className="bg-white rounded-xl shadow p-5">
                  <h2 className="text-gray-500 text-sm">Vaccinations</h2>
                  <p className="text-3xl font-bold text-yellow-500 mt-2">{vaccinations.length}</p>
                </div>
                <div className="bg-white rounded-xl shadow p-5">
                  <h2 className="text-gray-500 text-sm">Treatments</h2>
                  <p className="text-3xl font-bold text-red-600 mt-2">{treatments.length}</p>
                </div>
                <div className="bg-white rounded-xl shadow p-5">
                  <h2 className="text-gray-500 text-sm">Registered Farms</h2>
                  <p className="text-3xl font-bold text-purple-600 mt-2">{farmProfiles.length}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-xl shadow p-6">
                  <h2 className="text-xl font-semibold mb-4">Livestock by Species</h2>
                  {Object.keys(speciesBreakdown).length === 0 ? (
                    <p className="text-gray-500">No livestock recorded yet.</p>
                  ) : (
                    <ul className="space-y-3">
                      {Object.entries(speciesBreakdown).map(([species, count]) => (
                        <li key={species} className="flex justify-between border-b last:border-0 pb-2">
                          <span>{species}</span>
                          <span className="font-semibold">{count}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="bg-white rounded-xl shadow p-6">
                  <h2 className="text-xl font-semibold mb-4">Registered Farm Profiles</h2>
                  {farmProfiles.length === 0 ? (
                    <p className="text-gray-500">No farm profiles set up yet.</p>
                  ) : (
                    <ul className="space-y-3">
                      {farmProfiles.map((f) => (
                        <li key={f.id} className="border-b last:border-0 pb-2">
                          <p className="font-medium text-gray-800">{f.farmName || "Unnamed Farm"}</p>
                          <p className="text-sm text-gray-500">{f.ownerName} — {f.location}</p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => navigate("/livestock")}
                    className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700"
                  >
                    View Livestock
                  </button>
                  <button
                    onClick={() => navigate("/reports")}
                    className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
                  >
                    View Reports
                  </button>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
