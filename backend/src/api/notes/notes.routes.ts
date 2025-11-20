import { Router } from 'express'; 
import { createNoteController, getNotesController, getNoteByIdController, updateNoteController, deleteNoteController } from './notes.controller';

const router = Router();

    router.post('/', createNoteController);
    router.get('/', getNotesController);
    router.get('/:id', getNoteByIdController);
    router.put('/:id', updateNoteController);
    router.delete('/:id', deleteNoteController);

export default router;