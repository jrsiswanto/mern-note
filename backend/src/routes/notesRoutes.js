import express from "express";
import {
  getAllNotes,
  createNotes,
  upgradeNotes,
  deleteNotes,
  getNoteById,
} from "../controllers/notesController.js";

const router = express.Router();

router.get("/", getAllNotes);         // GET /api/notes
router.get("/:id", getNoteById);
router.post("/", createNotes);        // POST /api/notes
router.put("/:id", upgradeNotes);     // PUT /api/notes/:id ✅ penting!
router.delete("/:id", deleteNotes);   // DELETE /api/notes/:id

export default router;
