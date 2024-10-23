import { Router } from 'express';

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
import { isValidId } from '../middlewares/isValidId.js';

const routerContacts = Router();

routerContacts.get('/', ctrlWrapper(getContactsController));
routerContacts.get(
  '/:contactId',
  isValidId,
  ctrlWrapper(getContactByIdController),
);
routerContacts.post(
  '/',
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
