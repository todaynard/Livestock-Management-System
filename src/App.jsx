import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";

import Login from "./pages/Login";
import FarmerDashboard from "./pages/FarmerDashboard";
import VeterinarianDashboard from "./pages/VeterinarianDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Livestock from "./pages/Livestock";
import AddAnimal from "./pages/AddAnimal";
import AnimalDetails from "./pages/AnimalDetails";
import HealthRecords from "./pages/HealthRecords";
import Vaccinations from "./pages/Vaccinations";
import Treatments from "./pages/Treatments";
import Reports from "./pages/Reports";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/farmer" element={<FarmerDashboard />} />
      <Route path="/vet" element={<VeterinarianDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/livestock" element={<Livestock />} />
      <Route path="/add-animal" element={<AddAnimal />} />
      <Route path="/animal/:id" element={<AnimalDetails />} />
      <Route path="/health-records" element={<HealthRecords />} />
      <Route path="/vaccinations" element={<Vaccinations />} />
      <Route path="/treatments" element={<Treatments />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default App;
