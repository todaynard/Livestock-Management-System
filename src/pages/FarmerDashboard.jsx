import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

const FarmerDashboard = () => {
  const navigate = useNavigate();

  const [animals, setAnimals] = useState([]);
  const [vaccinations, setVaccinations] = useState([]);
  const [healthRecords, setHealthRecords] = useState([]);
  const [treatments, setTreatments] = useState([]);

  useEffect(() => {
    const unsubAnimals = onSnapshot(collection(db, "animals"), (snap) =>
      setAnimals(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    const unsubVax = onSnapshot(collection(db, "vaccinations"), (snap) =>
      setVaccinations(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    const unsubHealth = onSnapshot(collection(db, "healthRecords"), (snap) =>
      setHealthRecords(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    const unsubTreat = onSnapshot(collection(db, "treatments"), (snap) =>
      setTreatments(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    return () => {
      unsubAnimals();
      unsubVax();
      unsubHealth();
      unsubTreat();
    };
  }, []);

  const totalLivestock = animals.length;
  const healthyAnimals = animals.filter((a) => a.health === "Healthy").length;
  const vaccinationsDue = vaccinations.filter((v) => v.status === "Upcoming").length;

  const speciesList = ["Cow", "Goat", "Poultry"];
  const speciesHealth = speciesList.map((species) => {
    const inSpecies = animals.filter((a) => a.type === species);
    const healthyInSpecies = inSpecies.filter((a) => a.health === "Healthy").length;
    const percent = inSpecies.length === 0 ? 0 : Math.round((healthyInSpecies / inSpecies.length) * 100);
    return { species, percent, count: inSpecies.length };
  });

  const recentActivities = [
    ...animals.map((a) => ({
      text: `${a.name} added to livestock records`,
      time: a.createdAt,
    })),
    ...vaccinations.map((v) => ({
      text: `Vaccination (${v.vaccine}) recorded for ${v.animal}`,
      time: v.createdAt,
    })),
    ...healthRecords.map((h) => ({
      text: `Health checkup recorded for ${h.animal}`,
      time: h.createdAt,
    })),
    ...treatments.map((t) => ({
      text: `Treatment (${t.condition}) recorded for ${t.animal}`,
      time: t.createdAt,
    })),
  ]
    .filter((item) => item.time)
    .sort((a, b) => (b.time?.seconds || 0) - (a.time?.seconds || 0))
    .slice(0, 5);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Farmer Dashboard
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow p-5">
              <h2 className="text-gray-500 text-sm">Total Livestock</h2>
              <p className="text-3xl font-bold text-green-600 mt-2">{totalLivestock}</p>
            </div>

            <div className="bg-white rounded-xl shadow p-5">
              <h2 className="text-gray-500 text-sm">Healthy Animals</h2>
              <p className="text-3xl font-bold text-blue-600 mt-2">{healthyAnimals}</p>
            </div>

            <div className="bg-white rounded-xl shadow p-5">
              <h2 className="text-gray-500 text-sm">Vaccinations Due</h2>
              <p className="text-3xl font-bold text-yellow-500 mt-2">{vaccinationsDue}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
              {recentActivities.length === 0 ? (
                <p className="text-gray-500">No activity yet.</p>
              ) : (
                <ul className="space-y-3">
                  {recentActivities.map((item, idx) => (
                    <li key={idx} className="border-b last:border-0 pb-2">
                      {item.text}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Animal Health Overview</h2>

              <div className="space-y-4">
                {speciesHealth.map(({ species, percent, count }) => (
                  <div key={species}>
                    <div className="flex justify-between">
                      <span>{species} {count === 0 ? "(none yet)" : ""}</span>
                      <span>{percent}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-green-500 h-3 rounded-full" style={{ width: `${percent}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow mt-8 p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/livestock")}
                className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700"
              >
                Add Animal
              </button>
              <button
                onClick={() => navigate("/health-records")}
                className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
              >
                Record Health
              </button>
              <button
                onClick={() => navigate("/vaccinations")}
                className="bg-yellow-500 text-white px-5 py-3 rounded-lg hover:bg-yellow-600"
              >
                Add Vaccination
              </button>
              <button
                onClick={() => navigate("/reports")}
                className="bg-gray-700 text-white px-5 py-3 rounded-lg hover:bg-gray-800"
              >
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
