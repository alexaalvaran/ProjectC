import { Router } from 'express'; 
import { createRestoController, getRestosController, getRestoByIdController, updateRestoController, deleteRestoController } from './restos.controller';

const router = Router();

router.post('/', createRestoController);
router.get('/', getRestosController);
router.get('/:id', getRestoByIdController);
router.put('/:id', updateRestoController);
router.delete('/:id', deleteRestoController);

export default router;