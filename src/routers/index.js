import { Router } from 'express';
import routerAuth from './auth.js';
import routerContacts from './contacts.js';

const router = Router();

router.use('/contacts', routerContacts);
router.use('/auth', routerAuth);

export default router;
