import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const AddAnimal = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    species: "",
    breed: "",
    age: "",
    gender: "",
    notes: "",
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const next = {};
    if (!formData.name.trim()) next.name = "Animal name/ID is required";
    if (!formData.species.trim()) next.species = "Species is required";
    if (!formData.gender) next.gender = "Gender is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    setSuccess(false);
    if (!validate()) return;

    setIsLoading(true);
    try {
      await addDoc(collection(db, "animals"), {
        name: formData.name,
        species: formData.species,
        breed: formData.breed,
        age: formData.age,
        gender: formData.gender,
        notes: formData.notes,
        createdAt: serverTimestamp(),
      });
      setSuccess(true);
      setFormData({ name: "", species: "", breed: "", age: "", gender: "", notes: "" });
    } catch (err) {
      setServerError("Failed to save animal. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Add Animal</h1>

          <div className="bg-white rounded-xl shadow p-6 max-w-xl">
            {success && (
              <div className="mb-4 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3">
                Animal saved successfully.
              </div>
            )}
            {serverError && (
              <div className="mb-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">
                {serverError}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Animal Name / ID
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full rounded-lg border px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.name ? "border-red-400" : "border-gray-300"
                  }`}
                  placeholder="e.g. Cow 001"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Species</label>
                <input
                  name="species"
                  value={formData.species}
                  onChange={handleChange}
                  className={`w-full rounded-lg border px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.species ? "border-red-400" : "border-gray-300"
                  }`}
                  placeholder="e.g. Cattle, Goat, Sheep"
                />
                {errors.species && <p className="mt-1 text-sm text-red-600">{errors.species}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Breed</label>
                <input
                  name="breed"
                  value={formData.breed}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Friesian"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Age (years)</label>
                <input
                  name="age"
                  type="number"
                  min="0"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. 2"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={`w-full rounded-lg border px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.gender ? "border-red-400" : "border-gray-300"
                  }`}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender}</p>}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="3"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Any additional details"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-lg bg-blue-600 text-white font-medium py-2.5 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
              >
                {isLoading ? "Saving..." : "Save Animal"}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddAnimal;
