import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const HealthRecords = () => {
  const [records, setRecords] = useState([
    {
      id: 1,
      animal: "Cow #12",
      checkupDate: "2026-07-15",
      weight: "420",
      temperature: "38.5",
      notes: "Normal checkup, no concerns.",
      status: "Normal",
    },
    {
      id: 2,
      animal: "Goat #5",
      checkupDate: "2026-07-20",
      weight: "45",
      temperature: "39.8",
      notes: "Slight fever, monitor closely.",
      status: "Attention Needed",
    },
  ]);

  const [form, setForm] = useState({
    animal: "",
    checkupDate: "",
    weight: "",
    temperature: "",
    notes: "",
    status: "Normal",
  });

  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.animal || !form.checkupDate) return;

    const newRecord = {
      id: records.length ? records[records.length - 1].id + 1 : 1,
      ...form,
    };

    setRecords([...records, newRecord]);
    setForm({ animal: "", checkupDate: "", weight: "", temperature: "", notes: "", status: "Normal" });
  };

  const handleDelete = (id) => {
    setRecords(records.filter((r) => r.id !== id));
  };

  const filteredRecords = records.filter((r) =>
    r.animal.toLowerCase().includes(search.toLowerCase())
  );

  const statusColor = (status) =>
    status === "Normal"
      ? "bg-green-100 text-green-700"
      : status === "Attention Needed"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Health Records</h1>

          {/* Add Record Form */}
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Add Health Checkup Record</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
              <input
                type="text"
                name="animal"
                placeholder="Animal (e.g. Cow #12)"
                value={form.animal}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 text-sm"
              />
              <input
                type="date"
                name="checkupDate"
                value={form.checkupDate}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 text-sm"
              />
              <input
                type="number"
                name="weight"
                placeholder="Weight (kg)"
                value={form.weight}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 text-sm"
              />
              <input
                type="number"
                step="0.1"
                name="temperature"
                placeholder="Temp (°C)"
                value={form.temperature}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 text-sm"
              />
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 text-sm"
              >
                <option value="Normal">Normal</option>
                <option value="Attention Needed">Attention Needed</option>
                <option value="Critical">Critical</option>
              </select>
              <input
                type="text"
                name="notes"
                placeholder="Notes"
                value={form.notes}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 text-sm"
              />
              <button
                type="submit"
                className="col-span-1 sm:col-span-2 lg:col-span-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-fit"
              >
                Add Record
              </button>
            </form>
          </div>

          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by animal..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm w-full sm:w-80"
            />
          </div>

          {/* Health Records Table */}
          <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Checkup History ({filteredRecords.length})
            </h2>
            {filteredRecords.length === 0 ? (
              <p className="text-gray-500">No health records found.</p>
            ) : (
              <table className="min-w-full text-sm text-left">
                <thead>
                  <tr className="border-b text-gray-500">
                    <th className="py-2 pr-4">Animal</th>
                    <th className="py-2 pr-4">Date</th>
                    <th className="py-2 pr-4">Weight (kg)</th>
                    <th className="py-2 pr-4">Temp (°C)</th>
                    <th className="py-2 pr-4">Status</th>
                    <th className="py-2 pr-4">Notes</th>
                    <th className="py-2 pr-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((r) => (
                    <tr key={r.id} className="border-b last:border-0">
                      <td className="py-2 pr-4 font-medium text-gray-800">{r.animal}</td>
                      <td className="py-2 pr-4">{r.checkupDate}</td>
                      <td className="py-2 pr-4">{r.weight || "—"}</td>
                      <td className="py-2 pr-4">{r.temperature || "—"}</td>
                      <td className="py-2 pr-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor(r.status)}`}>
                          {r.status}
                        </span>
                      </td>
                      <td className="py-2 pr-4 text-gray-600">{r.notes || "—"}</td>
                      <td className="py-2 pr-4">
                        <button
                          onClick={() => handleDelete(r.id)}
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

export default HealthRecords;