import { Router } from 'express';

import { getContacts, getContactById } from '../services/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getContacts));
router.get('/contacts/:contactId', ctrlWrapper(getContactById));

export default router;
