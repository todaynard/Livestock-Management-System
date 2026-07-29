# Livestock Management System

## How to run this (every time)

1. Open this folder in VS Code.
2. Open a terminal (`` Ctrl+` ``) and run, once:
   ```
   npm install
   ```
3. Then, every time you want to work on it:
   ```
   npm run dev
   ```
4. Open the URL it prints (usually `http://localhost:5173`) in your browser.

**Do not use "Go Live" / Live Server for this project.** This is a real React
app built with JSX and routing — it needs Vite's dev server (`npm run dev`),
which compiles everything and hot-reloads on save, same instant feedback as
Go Live, just through the terminal instead of a button.

## What's real vs. placeholder right now

- `FarmerDashboard.jsx` and `Vaccinations.jsx` — your actual code, wired in.
- All other pages (`Login`, `VeterinarianDashboard`, `AdminDashboard`,
  `Livestock`, `AddAnimal`, `AnimalDetails`, `HealthRecords`, `Treatments`,
  `Reports`, `Notifications`, `Settings`) — placeholder stubs so the app
  builds and every route works. Replace each file's content with your real
  code whenever you have it; nothing else needs to change.
- `src/services/api.js` — placeholder fetch helpers pointing at
  `http://localhost:5000/api`. Update `BASE_URL` to your real backend.

## Routes

| Path              | Page                     |
|-------------------|--------------------------|
| `/`                | Login                    |
| `/farmer`          | FarmerDashboard          |
| `/vet`             | VeterinarianDashboard    |
| `/admin`           | AdminDashboard           |
| `/livestock`       | Livestock                |
| `/add-animal`      | AddAnimal                |
| `/animal/:id`      | AnimalDetails            |
| `/health-records`  | HealthRecords            |
| `/vaccinations`    | Vaccinations             |
| `/treatments`      | Treatments               |
| `/reports`         | Reports                  |
| `/notifications`   | Notifications            |
| `/settings`        | Settings                 |

Visit `http://localhost:5173/farmer` or `http://localhost:5173/vaccinations`
to see your real pages directly.
