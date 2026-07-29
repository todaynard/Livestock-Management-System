import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Vaccinations = () => {

  const vaccinations = [
    {
      id: 1,
      animal: "Cow #024",
      vaccine: "Foot and Mouth Disease",
      dateGiven: "2026-07-05",
      nextDate: "2027-01-05",
      status: "Completed"
    },
    {
      id: 2,
      animal: "Goat #015",
      vaccine: "PPR Vaccine",
      dateGiven: "2026-06-20",
      nextDate: "2026-12-20",
      status: "Upcoming"
    },
    {
      id: 3,
      animal: "Chicken #033",
      vaccine: "Newcastle Disease",
      dateGiven: "2026-07-15",
      nextDate: "2026-10-15",
      status: "Completed"
    }
  ];

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

            <button className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700">
              + Add Vaccination
            </button>
          </div>

          <div className="bg-white shadow rounded-xl overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-green-700 text-white">
                <tr>
                  <th className="p-4">ID</th>
                  <th className="p-4">Animal</th>
                  <th className="p-4">Vaccine</th>
                  <th className="p-4">Date Given</th>
                  <th className="p-4">Next Vaccination</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>

              <tbody>
                {vaccinations.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">{item.id}</td>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white shadow rounded-xl p-5">
              <h2 className="text-gray-500">Total Vaccinations</h2>
              <p className="text-3xl font-bold text-blue-600">560</p>
            </div>

            <div className="bg-white shadow rounded-xl p-5">
              <h2 className="text-gray-500">Upcoming Vaccines</h2>
              <p className="text-3xl font-bold text-yellow-500">25</p>
            </div>

            <div className="bg-white shadow rounded-xl p-5">
              <h2 className="text-gray-500">Protected Animals</h2>
              <p className="text-3xl font-bold text-green-600">98%</p>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default Vaccinations;
