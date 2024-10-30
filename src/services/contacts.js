import ContactCollection from '../db/models/Contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/contacts.js';

export const getContacts = async ({
  page = 1,
  perPage: limit = 10,
  sortBy = '_id',
  sortOrder = SORT_ORDER.ASC,
  filter = {},
}) => {
  const skip = (page - 1) * limit;

  const contactsQuery = ContactCollection.find()
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder });

  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }
  if (filter.isFavourite !== undefined) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }
  if (filter.userId) {
    contactsQuery.where('userId').equals(filter.userId);
  }

  const data = await contactsQuery.exec();
  const count = await ContactCollection.find()
    .merge(contactsQuery)
    .countDocuments();

  const paginationData = calculatePaginationData(count, limit, page);

  return {
    page,
    perPage: limit,
    ...paginationData,
    data,
    count,
  };
};

export const getContactById = (contactId, userId) =>
  ContactCollection.findOne({ _id: contactId, userId });

export const createContact = (payload) => ContactCollection.create(payload);

export const updateContactById = async (
  contactId,
  userId,
  payload,
  options = {},
) => {
  const result = await ContactCollection.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    {
      new: true,
      ...options,
    },
  );

  if (!result) return null;
  return result;
};

export const deleteContactById = (contactId, userId) =>
  ContactCollection.findOneAndDelete({ _id: contactId, userId });
