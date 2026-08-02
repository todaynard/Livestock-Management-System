import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

const VeterinarianDashboard = () => {
  const navigate = useNavigate();

  const [animals, setAnimals] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [vaccinations, setVaccinations] = useState([]);
  const [healthRecords, setHealthRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubAnimals = onSnapshot(collection(db, "animals"), (snap) =>
      setAnimals(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    const unsubTreat = onSnapshot(collection(db, "treatments"), (snap) =>
      setTreatments(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    const unsubVax = onSnapshot(collection(db, "vaccinations"), (snap) =>
      setVaccinations(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    const unsubHealth = onSnapshot(collection(db, "healthRecords"), (snap) => {
      setHealthRecords(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return () => {
      unsubAnimals();
      unsubTreat();
      unsubVax();
      unsubHealth();
    };
  }, []);

  const animalsNeedingAttention = animals.filter(
    (a) => a.health === "Under Treatment" || a.health === "Critical"
  );
  const ongoingTreatments = treatments.filter((t) => t.status === "Ongoing");
  const upcomingVaccinations = vaccinations.filter((v) => v.status === "Upcoming");
  const flaggedHealthRecords = healthRecords.filter(
    (h) => h.status === "Attention Needed" || h.status === "Critical"
  );

  const healthColor = (health) =>
    health === "Healthy"
      ? "bg-green-100 text-green-700"
      : health === "Under Treatment"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Veterinarian Dashboard</h1>

          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow p-5">
                  <h2 className="text-gray-500 text-sm">Animals Needing Attention</h2>
                  <p className="text-3xl font-bold text-red-600 mt-2">{animalsNeedingAttention.length}</p>
                </div>
                <div className="bg-white rounded-xl shadow p-5">
                  <h2 className="text-gray-500 text-sm">Ongoing Treatments</h2>
                  <p className="text-3xl font-bold text-yellow-500 mt-2">{ongoingTreatments.length}</p>
                </div>
                <div className="bg-white rounded-xl shadow p-5">
                  <h2 className="text-gray-500 text-sm">Upcoming Vaccinations</h2>
                  <p className="text-3xl font-bold text-blue-600 mt-2">{upcomingVaccinations.length}</p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Animals Needing Attention</h2>
                {animalsNeedingAttention.length === 0 ? (
                  <p className="text-gray-500">No animals currently need attention.</p>
                ) : (
                  <table className="min-w-full text-sm text-left">
                    <thead>
                      <tr className="border-b text-gray-500">
                        <th className="py-2 pr-4">Name</th>
                        <th className="py-2 pr-4">Type</th>
                        <th className="py-2 pr-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {animalsNeedingAttention.map((a) => (
                        <tr key={a.id} className="border-b last:border-0">
                          <td className="py-2 pr-4 font-medium text-gray-800">{a.name}</td>
                          <td className="py-2 pr-4">{a.type}</td>
                          <td className="py-2 pr-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${healthColor(a.health)}`}>
                              {a.health}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-xl shadow p-6">
                  <h2 className="text-xl font-semibold mb-4">Ongoing Treatments</h2>
                  {ongoingTreatments.length === 0 ? (
                    <p className="text-gray-500">No ongoing treatments.</p>
                  ) : (
                    <ul className="space-y-3">
                      {ongoingTreatments.map((t) => (
                        <li key={t.id} className="border-b last:border-0 pb-2">
                          <span className="font-medium">{t.animal}</span> — {t.condition} ({t.medicine || "no medicine noted"})
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="bg-white rounded-xl shadow p-6">
                  <h2 className="text-xl font-semibold mb-4">Upcoming Vaccinations</h2>
                  {upcomingVaccinations.length === 0 ? (
                    <p className="text-gray-500">No upcoming vaccinations.</p>
                  ) : (
                    <ul className="space-y-3">
                      {upcomingVaccinations.map((v) => (
                        <li key={v.id} className="border-b last:border-0 pb-2">
                          <span className="font-medium">{v.animal}</span> — {v.vaccine} due {v.nextDate}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => navigate("/health-records")}
                    className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
                  >
                    Record Health Checkup
                  </button>
                  <button
                    onClick={() => navigate("/treatments")}
                    className="bg-yellow-500 text-white px-5 py-3 rounded-lg hover:bg-yellow-600"
                  >
                    Log Treatment
                  </button>
                  <button
                    onClick={() => navigate("/vaccinations")}
                    className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700"
                  >
                    Record Vaccination
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

export default VeterinarianDashboard;
