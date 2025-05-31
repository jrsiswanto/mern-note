import Note from "../models/notes.js"

export async function getAllNotes(_,res){
    try {
        const notes =await Note.find().sort({createdAt:-1})
        res.status(200).json(notes)
    } catch (error) {
        console.log("Error in getAllNotes controller", error)
        res.status(500).json({Message:"internal server error"})
    }
};

export async function getNoteById(req,res){
    try {
        const note = await Note.findById(req.params.id);
         if(!note) return res.status(404).json({Message:"Notes not found"})
        res.status(200).json(note)
    } catch (error) {
        console.log("Error in getNoteById controller", error)
        res.status(500).json({Message:"internal server error"})
    }
}

export async function createNotes (req,res){
    try {
        const {title,content}=req.body
        const note = new Note({title,content})
        const savedNote = await note.save();
        res.status(201).json(savedNote)
    } catch (error) {
        console.log("Error in createNotes controller", error)
        res.status(500).json({Message:"internal server error"})
    }
};

export async function upgradeNotes (req,res){
    try {
        const {title,content} = req.body
        const updatedNote = await Note.findByIdAndUpdate(req.params.id,{title,content},{
            new:true,
        }
        );
        if(!updatedNote) return res.status(404).json({Message:"Notes not found"})
        res.status(200).json(updatedNote)
    } catch (error) {
        console.log("Error in updateNotes controller", error)
        res.status(500).json({Message:"internal server error"})
    }
};

export async function deleteNotes(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if (!deletedNote) {
      return res.status(404).json({ Message: "Note not found" });
    }

    res.status(200).json({ Message: "Note deleted successfully"});
  } catch (error) {
    console.log("Error in deleteNotes controller", error);
    res.status(500).json({ Message: "Internal server error" });
  }
}
