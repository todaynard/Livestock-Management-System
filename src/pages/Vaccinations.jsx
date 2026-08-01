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

const Vaccinations = () => {
  const [vaccinations, setVaccinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    animal: "",
    vaccine: "",
    dateGiven: "",
    nextDate: "",
    status: "Completed",
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "vaccinations"), (snapshot) => {
      const data = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      setVaccinations(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.animal || !form.vaccine || !form.dateGiven) return;

    await addDoc(collection(db, "vaccinations"), {
      animal: form.animal,
      vaccine: form.vaccine,
      dateGiven: form.dateGiven,
      nextDate: form.nextDate,
      status: form.status,
      createdAt: serverTimestamp(),
    });

    setForm({ animal: "", vaccine: "", dateGiven: "", nextDate: "", status: "Completed" });
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "vaccinations", id));
  };

  const totalVaccinations = vaccinations.length;
  const upcomingVaccines = vaccinations.filter((v) => v.status === "Upcoming").length;
  const protectedPercent =
    totalVaccinations === 0
      ? 0
      : Math.round(
          (vaccinations.filter((v) => v.status === "Completed").length / totalVaccinations) * 100
        );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Vaccination Management
            </h1>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700"
            >
              {showForm ? "Cancel" : "+ Add Vaccination"}
            </button>
          </div>

          {showForm && (
            <div className="bg-white shadow rounded-xl p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Add Vaccination Record</h2>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <input
                  type="text"
                  name="animal"
                  placeholder="Animal (e.g. Cow #024)"
                  value={form.animal}
                  onChange={handleChange}
                  className="border rounded-lg px-3 py-2 text-sm"
                />
                <input
                  type="text"
                  name="vaccine"
                  placeholder="Vaccine name"
                  value={form.vaccine}
                  onChange={handleChange}
                  className="border rounded-lg px-3 py-2 text-sm"
                />
                <input
                  type="date"
                  name="dateGiven"
                  value={form.dateGiven}
                  onChange={handleChange}
                  className="border rounded-lg px-3 py-2 text-sm"
                />
                <input
                  type="date"
                  name="nextDate"
                  value={form.nextDate}
                  onChange={handleChange}
                  className="border rounded-lg px-3 py-2 text-sm"
                />
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="border rounded-lg px-3 py-2 text-sm"
                >
                  <option value="Completed">Completed</option>
                  <option value="Upcoming">Upcoming</option>
                </select>
                <button
                  type="submit"
                  className="col-span-1 sm:col-span-2 lg:col-span-5 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-fit"
                >
                  Save Vaccination
                </button>
              </form>
            </div>
          )}

          <div className="bg-white shadow rounded-xl overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-green-700 text-white">
                <tr>
                  <th className="p-4">Animal</th>
                  <th className="p-4">Vaccine</th>
                  <th className="p-4">Date Given</th>
                  <th className="p-4">Next Vaccination</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td className="p-4 text-gray-500" colSpan="6">Loading...</td>
                  </tr>
                ) : vaccinations.length === 0 ? (
                  <tr>
                    <td className="p-4 text-gray-500" colSpan="6">No vaccination records found.</td>
                  </tr>
                ) : (
                  vaccinations.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="p-4 font-semibold">{item.animal}</td>
                      <td className="p-4">{item.vaccine}</td>
                      <td className="p-4">{item.dateGiven}</td>
                      <td className="p-4">{item.nextDate}</td>
                      <td className="p-4">
                        <span
                          className={
                            item.status === "Completed"
                              ? "bg-green-100 text-green-700 px-3 py-1 rounded-full"
                              : "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full"
                          }
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:underline text-xs"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white shadow rounded-xl p-5">
              <h2 className="text-gray-500">Total Vaccinations</h2>
              <p className="text-3xl font-bold text-blue-600">{totalVaccinations}</p>
            </div>
            <div className="bg-white shadow rounded-xl p-5">
              <h2 className="text-gray-500">Upcoming Vaccines</h2>
              <p className="text-3xl font-bold text-yellow-500">{upcomingVaccines}</p>
            </div>
            <div className="bg-white shadow rounded-xl p-5">
              <h2 className="text-gray-500">Protected Animals</h2>
              <p className="text-3xl font-bold text-green-600">{protectedPercent}%</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
export default Vaccinations;
