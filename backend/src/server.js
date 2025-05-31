import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "../config/db.js"; // Pastikan path ini benar: ../config/db.js
import dotenv from "dotenv";
import path from "path"; // <--- 1. TAMBAHKAN IMPORT PATH
import { fileURLToPath } from 'url'; // <--- 2. TAMBAHKAN IMPORT INI
import rateLimiter from "../middleware/rateLimiter.js"; // Pastikan path ini benar: ../middleware/rateLimiter.js
import cors from "cors";

dotenv.config();

// 3. DAPATKAN __dirname YANG BENAR UNTUK ES MODULES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // Ini akan menunjuk ke direktori 'src' di dalam 'backend'

const app = express();
const PORT = process.env.PORT || 5001; // Gunakan variabel PORT

connectDB().then(() => {
  app.listen(PORT, () => { // Gunakan variabel PORT
    console.log(`server anda running di port: ${PORT}`); // Perbaiki console log
  });
});

//middleware
// Sebaiknya kondisikan CORS hanya untuk development jika frontend dan backend disajikan dari domain yang sama di produksi
if (process.env.NODE_ENV !== 'production') {
  app.use(cors({
    origin: "http://localhost:5173",
  }));
}
app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

// --- 4. TAMBAHKAN BLOK INI UNTUK MENYAJIKAN FRONTEND ---
if (process.env.NODE_ENV === "production") {
  // Tentukan path ke direktori build frontend
  const frontendDistPath = path.join(__dirname, "../../frontend/dist"); // Dari backend/src/ ke frontend/dist/

  // Sajikan file statis dari direktori build React
  app.use(express.static(frontendDistPath));

  // Untuk semua rute GET lainnya, kirim index.html agar React Router bisa bekerja
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendDistPath, "index.html"));
  });
} else {
  // Rute default untuk development jika tidak ada yang cocok (opsional)
  app.get('/', (req, res) => {
    res.send('API is running... (Development Mode - Frontend served separately)');
  });
}