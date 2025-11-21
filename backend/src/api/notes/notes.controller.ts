import { Request, Response } from 'express'; 
import { createNote, getNotes, getNoteById, updateNote, deleteNote } from '../notes/notes.service';

export const createNoteController = async (req: Request, res: Response) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({ message: 'Title and description are required' });
        }

        const note = await createNote(title, description);
       return res.status(201).json(note);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to create new note' });
    }
};

export const getNotesController = async (req: Request, res: Response) => {
    try {
        const notes = await getNotes();
       return res.status(200).json(notes);
    } catch (err) {
        console.error(err);
       return res.status(500).json({ message: 'Failed to retrieve notes' });
    }
};

export const getNoteByIdController = async (req: Request, res: Response) => {  
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid note ID' });
        }

        const note = await getNoteById(id);

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }


        return res.status(200).json(note);

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to retrieve note' });
    }   
};

export const updateNoteController = async (req: Request, res: Response) => {  
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid note ID' });
        }

        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({ message: 'Title and description are required' });
        }

        const updatedNote = await updateNote(id, title, description);

        return res.status(200).json(updatedNote);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to update note' });
    }
};

export const deleteNoteController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid note ID' });
        }

        await deleteNote(id);

        return res.status(204).send();

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to delete note' });
    }
};


       
