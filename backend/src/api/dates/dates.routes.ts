import { Router } from 'express'; 
import { createDateController, getDatesController, getDateByIdController, updateDateController, deleteDateController } from './dates.controller';

const router = Router();

router.post('/', createDateController);
router.get('/', getDatesController);
router.get('/:id', getDateByIdController);
router.put('/:id', updateDateController);
router.delete('/:id', deleteDateController);

export default router;