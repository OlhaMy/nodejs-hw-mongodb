import { Router } from 'express';

import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/uploads.js';

import {
  getContactsController,
  getContactByIdController,
  createContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../utils/validateBody.js';
import {
  contactsAddSchema,
  contactsUpdateSchema,
} from '../validation/contacts.js';

const routerContacts = Router();

routerContacts.use(authenticate);

routerContacts.get('/', ctrlWrapper(getContactsController));
routerContacts.get(
  '/:contactId',
  isValidId,
  ctrlWrapper(getContactByIdController),
);
routerContacts.post(
  '/',
  upload.single('photo'),
  validateBody(contactsAddSchema),
  ctrlWrapper(createContactController),
);
routerContacts.patch(
  '/:contactId',
  isValidId,
  validateBody(contactsUpdateSchema),
  ctrlWrapper(patchContactController),
);
routerContacts.delete(
  '/:contactId',
  isValidId,
  ctrlWrapper(deleteContactController),
);

export default routerContacts;
