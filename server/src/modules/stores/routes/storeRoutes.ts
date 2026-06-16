import { Router } from 'express';
import { storeController } from '../controllers/StoreController';

const router = Router();

router.post('/', storeController.create);
router.get('/', storeController.list);
router.get('/:id', storeController.get);
router.put('/:id', storeController.update);
router.delete('/:id', storeController.delete);

export default router;
