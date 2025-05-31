import React from 'react';
// Mengembalikan impor ke 'react-router' sesuai dengan setup proyek Anda
import { Routes, Route } from 'react-router';
import HomePage from './pages/HomePage.jsx';
import CreatePage from './pages/CreatePage.jsx';
import NoteDetailPage from './pages/NoteDetailPage.jsx';
// Impor toast tidak digunakan secara langsung di App.jsx, tapi mungkin digunakan oleh komponen anak
// import toast from "react-hot-toast";

const App = () => {
  return (
    // Pastikan tidak ada karakter '//' atau teks lain yang tidak diinginkan
    // langsung di dalam div ini, sebelum atau sesudah <Routes>
    <div className="relative h-full w-full">
      {/* Titik di mana '//' mungkin tidak sengaja tertulis adalah di sini,
          sebelum atau sesudah komponen <Routes>. Pastikan area ini bersih. */}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/create' element={<CreatePage />} />
        <Route path='/note/:id' element={<NoteDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;
