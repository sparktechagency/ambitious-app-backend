import { Model, Types } from 'mongoose';

export type IInquiry = {
  _id: string;
  customer: Types.ObjectId;
  seller: Types.ObjectId;
  message: string;
};

export type InquiryModel = Model<IInquiry>;