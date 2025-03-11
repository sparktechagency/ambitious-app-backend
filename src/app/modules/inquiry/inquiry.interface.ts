import { Model, Types } from 'mongoose';

export type IInquiry = {
  _id: string;
  seller: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  message: string;
};

export type InquiryModel = Model<IInquiry>;
