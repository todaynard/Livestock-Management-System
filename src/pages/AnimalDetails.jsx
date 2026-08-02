import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { db } from "../firebase";
import { doc, getDoc, collection, onSnapshot } from "firebase/firestore";

const AnimalDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [animal, setAnimal] = useState(null);
  const [healthRecords, setHealthRecords] = useState([]);
  const [vaccinations, setVaccinations] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadAnimal = async () => {
      try {
        const animalRef = doc(db, "animals", id);
        const snap = await getDoc(animalRef);
        if (snap.exists()) {
          setAnimal({ id: snap.id, ...snap.data() });
        } else {
          setNotFound(true);
        }
      } catch (err) {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    loadAnimal();
  }, [id]);

  useEffect(() => {
    if (!animal) return;
    const unsubHealth = onSnapshot(collection(db, "healthRecords"), (snap) => {
      setHealthRecords(
        snap.docs.map((d) => ({ id: d.id, ...d.data() })).filter((h) => h.animal === animal.name)
      );
    });
    const unsubVax = onSnapshot(collection(db, "vaccinations"), (snap) => {
      setVaccinations(
        snap.docs.map((d) => ({ id: d.id, ...d.data() })).filter((v) => v.animal === animal.name)
      );
    });
    const unsubTreat = onSnapshot(collection(db, "treatments"), (snap) => {
      setTreatments(
        snap.docs.map((d) => ({ id: d.id, ...d.data() })).filter((t) => t.animal === animal.name)
      );
    });
    return () => {
      unsubHealth();
      unsubVax();
      unsubTreat();
    };
  }, [animal]);

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
          <button
            onClick={() => navigate("/livestock")}
            className="text-sm text-blue-600 hover:underline mb-4 inline-block"
          >
            ← Back to Livestock
          </button>

          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : notFound ? (
            <div className="bg-white rounded-xl shadow p-6 text-gray-500">
              Animal not found. It may have been deleted.
            </div>
          ) : (
            <>
              <div className="bg-white rounded-xl shadow p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-3xl font-bold text-gray-800">{animal.name}</h1>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${healthColor(animal.health)}`}>
                    {animal.health}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Type</p>
                    <p className="font-medium text-gray-800">{animal.type}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Breed</p>
                    <p className="font-medium text-gray-800">{animal.breed || "-"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Age</p>
                    <p className="font-medium text-gray-800">{animal.age}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Gender</p>
                    <p className="font-medium text-gray-800">{animal.gender}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Health Records</h2>
                {healthRecords.length === 0 ? (
                  <p className="text-gray-500">No health records for this animal.</p>
                ) : (
                  <ul className="space-y-3">
                    {healthRecords.map((h) => (
                      <li key={h.id} className="border-b last:border-0 pb-2 text-sm">
                        <span className="font-medium">{h.checkupDate}</span> — {h.status}
                        {h.notes ? ` — ${h.notes}` : ""}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="bg-white rounded-xl shadow p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Vaccinations</h2>
                {vaccinations.length === 0 ? (
                  <p className="text-gray-500">No vaccination records for this animal.</p>
                ) : (
                  <ul className="space-y-3">
                    {vaccinations.map((v) => (
                      <li key={v.id} className="border-b last:border-0 pb-2 text-sm">
                        <span className="font-medium">{v.vaccine}</span> — given {v.dateGiven}, next {v.nextDate} ({v.status})
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Treatments</h2>
                {treatments.length === 0 ? (
                  <p className="text-gray-500">No treatment records for this animal.</p>
                ) : (
                  <ul className="space-y-3">
                    {treatments.map((t) => (
                      <li key={t.id} className="border-b last:border-0 pb-2 text-sm">
                        <span className="font-medium">{t.condition}</span> — {t.medicine || "no medicine noted"} ({t.status}, {t.date})
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default AnimalDetails;
