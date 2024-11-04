import path from 'node:path';
import createHttpError from 'http-errors';
import { env } from '../utils/env.js';
import {
  getContacts,
  getContactById,
  createContact,
  updateContactById,
  deleteContactById,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { saveFileToUploadsDir } from '../utils/saveFileToUploadsDir.js';
import { upload } from '../middlewares/uploads.js';

export const getContactsController = async (req, res) => {
  const { _id: userId } = req.user;
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = { ...parseFilterParams(req.query), userId };

  const data = await getContacts({ page, perPage, sortBy, sortOrder, filter });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId, req.user._id);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const { _id: userId } = req.user;
  let photo = '';

  if (req.file) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photo = await saveFileToCloudinary(req.file);
    } else {
      const localPath = await saveFileToUploadsDir(req.file, 'contacts');
      photo = `/uploads/contacts/${path.basename(localPath)}`;
    }
  }

  const contact = await createContact({ ...req.body, userId, photo });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const photo = req.file;
  let photoUrl;

  if (req.file) {
    photoUrl =
      env('ENABLE_CLOUDINARY') === 'true'
        ? await saveFileToCloudinary(req.file)
        : `/uploads/contacts/${path.basename(
            await saveFileToUploadsDir(req.file, 'contacts'),
          )}`;
  }

  const result = await updateContactById(
    { _id: contactId, userId },
    {
      ...req.body,
      photo: photoUrl,
    },
  );

  if (!result) {
    return next(createHttpError(404, `Contact with id=${contactId} not found`));
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result,
  });
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  const result = await deleteContactById(contactId, req.user._id);

  if (!result) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).send();
};
