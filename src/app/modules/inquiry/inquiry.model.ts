import { Schema, model } from 'mongoose';
import { IInquiry, InquiryModel } from './inquiry.interface';

const inquirySchema = new Schema<IInquiry, InquiryModel>(
  {
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
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
  }, 
  { timestamps : true}
);

export const Inquiry = model<IInquiry, InquiryModel>('Inquiry', inquirySchema);