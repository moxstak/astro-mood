// AstroMood - MVP Web App (React + Tailwind)
// This is a starter layout with mood logging, forecasts, and basic routing

import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { supabase } from './supabaseClient'; // add this at the top

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white font-sans">
        <nav className="bg-gray-800 p-4 flex justify-between">
          <span className="font-bold text-xl">AstroMood</span>
          <div className="space-x-4">
            <Link to="/" className="hover:underline">Log Mood</Link>
            <Link to="/forecast" className="hover:underline">Forecast</Link>
            <Link to="/history" className="hover:underline">History</Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<MoodLogger />} />
          <Route path="/forecast" element={<Forecast />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </Router>
  );
}

function MoodLogger() {
  const [mood, setMood] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = async () => {
  if (!mood) {
    alert("Please select a mood.");
    return;
  }

  const { error } = await supabase.from('mood_logs').insert([
    { mood, note }
  ]);

  if (error) {
    console.error('Error saving mood:', error);
    alert("Error saving mood.");
  } else {
    alert(`Mood saved: ${mood}`);
    setMood("");
    setNote("");
  }
};

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Log Your Mood</h2>
      <label className="block mb-2">How do you feel?</label>
      <select
        className="text-black p-2 rounded w-full mb-4"
        value={mood}
        onChange={(e) => setMood(e.target.value)}
      >
        <option value="">Select a mood</option>
        <option value="happy">Happy</option>
        <option value="anxious">Anxious</option>
        <option value="angry">Angry</option>
        <option value="calm">Calm</option>
        <option value="sad">Sad</option>
      </select>

      <label className="block mb-2">Notes</label>
      <textarea
        className="text-black w-full p-2 rounded mb-4"
        rows="4"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      ></textarea>

      <button
        onClick={handleSubmit}
        className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700"
      >
        Save Entry
      </button>
    </div>
  );
}

function Forecast() {
  const upcomingTransits = [
    { date: "2025-05-23", event: "Moon conjunct Mars", meaning: "Heightened emotional energy and drive." },
    { date: "2025-05-25", event: "Venus trine Jupiter", meaning: "Optimism and social harmony." },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Upcoming Forecast</h2>
      {upcomingTransits.map((t, i) => (
        <div key={i} className="mb-4 border-b border-gray-700 pb-2">
          <div className="font-semibold text-purple-400">{t.date} - {t.event}</div>
          <div>{t.meaning}</div>
        </div>
      ))}
    </div>
  );
}

function History() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Mood History</h2>
      <p>This will show past mood logs and trends once we connect the backend.</p>
    </div>
  );
}

export default App;
