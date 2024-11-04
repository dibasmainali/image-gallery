// src/App.js
import React from "react";
import Gallery from "./components/Gallery";
import './index.css'; // Import your CSS file here

function App() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white text-center py-4 shadow-md">
        <h1 className="text-2xl font-bold text-center flex justify-center items-center">My Image Gallery</h1>
        <p className="text-sm">Browse and search beautiful images</p>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-6 flex">
        <Gallery />
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 text-center py-4 text-gray-600 text-sm">
        <p>© {new Date().getFullYear()} My Image Gallery. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
