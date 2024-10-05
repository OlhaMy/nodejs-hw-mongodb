import { Schema, model } from 'mongoose';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    phoneNumber: {
      type: String,
      require: true,
    },

    email: {
      type: String,
      require: true,
    },
    isFavourite: {
      type: Boolean,
      require: true,
    },
    contactType: {
      type: String,
      require: true,
    },
  },
  { versionKey: false, timeseries: true },
);

const ContactCollection = model('contact', contactSchema);

export default ContactCollection;
