import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Livestock = () => {
  const [animals, setAnimals] = useState([
    { id: 1, name: "Cow #12", type: "Cow", breed: "Friesian", age: 3, gender: "Female", health: "Healthy" },
    { id: 2, name: "Goat #5", type: "Goat", breed: "Boer", age: 2, gender: "Male", health: "Under Treatment" },
    { id: 3, name: "Sheep #9", type: "Sheep", breed: "Dorper", age: 1, gender: "Female", health: "Healthy" },
  ]);

  const [form, setForm] = useState({
    name: "",
    type: "",
    breed: "",
    age: "",
    gender: "Female",
    health: "Healthy",
  });

  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.type) return;

    if (editingId) {
      setAnimals(
        animals.map((a) => (a.id === editingId ? { ...form, id: editingId, age: Number(form.age) } : a))
      );
      setEditingId(null);
    } else {
      const newAnimal = {
        id: animals.length ? animals[animals.length - 1].id + 1 : 1,
        ...form,
        age: Number(form.age),
      };
      setAnimals([...animals, newAnimal]);
    }

    setForm({ name: "", type: "", breed: "", age: "", gender: "Female", health: "Healthy" });
  };

  const handleEdit = (animal) => {
    setForm(animal);
    setEditingId(animal.id);
  };

  const handleDelete = (id) => {
    setAnimals(animals.filter((a) => a.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setForm({ name: "", type: "", breed: "", age: "", gender: "Female", health: "Healthy" });
    }
  };

  const filteredAnimals = animals.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.type.toLowerCase().includes(search.toLowerCase())
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
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Livestock</h1>

          {/* Add/Edit Animal Form */}
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              {editingId ? "Edit Animal" : "Add New Animal"}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Name / Tag ID"
                value={form.name}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 text-sm"
              />
              <input
                type="text"
                name="type"
                placeholder="Type (Cow, Goat...)"
                value={form.type}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 text-sm"
              />
              <input
                type="text"
                name="breed"
                placeholder="Breed"
                value={form.breed}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 text-sm"
              />
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={form.age}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 text-sm"
                min="0"
              />
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 text-sm"
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
              <select
                name="health"
                value={form.health}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 text-sm"
              >
                <option value="Healthy">Healthy</option>
                <option value="Under Treatment">Under Treatment</option>
                <option value="Critical">Critical</option>
              </select>

              <div className="col-span-1 sm:col-span-2 lg:col-span-6 flex gap-3">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  {editingId ? "Update Animal" : "Add Animal"}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      setForm({ name: "", type: "", breed: "", age: "", gender: "Female", health: "Healthy" });
                    }}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by name or type..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm w-full sm:w-80"
            />
          </div>

          {/* Livestock Table */}
          <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              All Livestock ({filteredAnimals.length})
            </h2>
            {filteredAnimals.length === 0 ? (
              <p className="text-gray-500">No animals found.</p>
            ) : (
              <table className="min-w-full text-sm text-left">
                <thead>
                  <tr className="border-b text-gray-500">
                    <th className="py-2 pr-4">Name</th>
                    <th className="py-2 pr-4">Type</th>
                    <th className="py-2 pr-4">Breed</th>
                    <th className="py-2 pr-4">Age</th>
                    <th className="py-2 pr-4">Gender</th>
                    <th className="py-2 pr-4">Health</th>
                    <th className="py-2 pr-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAnimals.map((a) => (
                    <tr key={a.id} className="border-b last:border-0">
                      <td className="py-2 pr-4 font-medium text-gray-800">{a.name}</td>
                      <td className="py-2 pr-4">{a.type}</td>
                      <td className="py-2 pr-4">{a.breed || "—"}</td>
                      <td className="py-2 pr-4">{a.age}</td>
                      <td className="py-2 pr-4">{a.gender}</td>
                      <td className="py-2 pr-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${healthColor(a.health)}`}>
                          {a.health}
                        </span>
                      </td>
                      <td className="py-2 pr-4 flex gap-3">
                        <button
                          onClick={() => handleEdit(a)}
                          className="text-blue-600 hover:underline text-xs"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(a.id)}
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

export default Livestock.jsx.replace(".jsx","") // keep default export clean