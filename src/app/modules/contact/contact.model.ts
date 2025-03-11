import { Schema, model } from 'mongoose';
import { ContactModel, IContact } from './contact.interface';

const contactSchema = new Schema<IContact>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export const Contact: ContactModel = model<IContact, ContactModel>('contact', contactSchema);