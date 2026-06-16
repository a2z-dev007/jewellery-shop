"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const auth_1 = require("../../../shared/middleware/auth");
const router = (0, express_1.Router)();
// Public route to accept the invitation
router.post('/accept-invite', UserController_1.userController.acceptInvite);
// Protected routes (Tenant context and Auth required)
router.use(auth_1.checkAuth);
router.post('/invite', (0, auth_1.checkRole)(['store_owner', 'manager']), UserController_1.userController.invite);
router.get('/', (0, auth_1.checkRole)(['store_owner', 'manager']), UserController_1.userController.list);
router.put('/:id/role', (0, auth_1.checkRole)(['store_owner']), UserController_1.userController.updateRole);
router.delete('/:id', (0, auth_1.checkRole)(['store_owner']), UserController_1.userController.delete);
exports.default = router;
