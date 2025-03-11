import { Model } from 'mongoose';

export type IContact = {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export type ContactModel = Model<IContact>;