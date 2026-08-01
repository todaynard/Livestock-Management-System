import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

const Treatments = () => {
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    animal: "",
    condition: "",
    medicine: "",
    date: "",
    status: "Ongoing",
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "treatments"), (snapshot) => {
      const data = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      setTreatments(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.animal || !form.condition || !form.date) return;

    await addDoc(collection(db, "treatments"), {
      animal: form.animal,
      condition: form.condition,
      medicine: form.medicine,
      date: form.date,
      status: form.status,
      createdAt: serverTimestamp(),
    });

    setForm({ animal: "", condition: "", medicine: "", date: "", status: "Ongoing" });
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "treatments", id));
  };

  const statusColor = (status) =>
    status === "Completed"
      ? "bg-green-100 text-green-700"
      : "bg-yellow-100 text-yellow-700";

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Treatments</h1>

          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Add New Treatment</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <input
                type="text"
                name="animal"
                placeholder="Animal (e.g. Cow #12)"
                value={form.animal}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 text-sm"
              />
              <input
                type="text"
                name="condition"
                placeholder="Condition"
                value={form.condition}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 text-sm"
              />
              <input
                type="text"
                name="medicine"
                placeholder="Medicine used"
                value={form.medicine}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 text-sm"
              />
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 text-sm"
              />
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 text-sm"
              >
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
              </select>
              <button
                type="submit"
                className="col-span-1 sm:col-span-2 lg:col-span-5 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-fit"
              >
                Add Treatment
              </button>
            </form>
          </div>

          <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Treatment Records</h2>
            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : treatments.length === 0 ? (
              <p className="text-gray-500">No treatment records yet.</p>
            ) : (
              <table className="min-w-full text-sm text-left">
                <thead>
                  <tr className="border-b text-gray-500">
                    <th className="py-2 pr-4">Animal</th>
                    <th className="py-2 pr-4">Condition</th>
                    <th className="py-2 pr-4">Medicine</th>
                    <th className="py-2 pr-4">Date</th>
                    <th className="py-2 pr-4">Status</th>
                    <th className="py-2 pr-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {treatments.map((t) => (
                    <tr key={t.id} className="border-b last:border-0">
                      <td className="py-2 pr-4 font-medium text-gray-800">{t.animal}</td>
                      <td className="py-2 pr-4">{t.condition}</td>
                      <td className="py-2 pr-4">{t.medicine || "-"}</td>
                      <td className="py-2 pr-4">{t.date}</td>
                      <td className="py-2 pr-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor(t.status)}`}>
                          {t.status}
                        </span>
                      </td>
                      <td className="py-2 pr-4">
                        <button
                          onClick={() => handleDelete(t.id)}
                          className="text-red-600 hover:underline text-xs"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Treatments;
