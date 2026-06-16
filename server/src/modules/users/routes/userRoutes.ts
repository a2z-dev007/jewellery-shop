import { Router } from 'express';
import { userController } from '../controllers/UserController';
import { checkAuth, checkRole } from '../../../shared/middleware/auth';

const router = Router();

// Public route to accept the invitation
router.post('/accept-invite', userController.acceptInvite);

// Protected routes (Tenant context and Auth required)
router.use(checkAuth);

router.post('/invite', checkRole(['store_owner', 'manager']), userController.invite);
router.get('/', checkRole(['store_owner', 'manager']), userController.list);
router.put('/:id/role', checkRole(['store_owner']), userController.updateRole);
router.delete('/:id', checkRole(['store_owner']), userController.delete);

export default router;
