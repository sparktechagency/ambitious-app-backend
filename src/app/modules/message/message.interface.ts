import { Model, Types } from 'mongoose';

export type IMessage = {
  chatId: Types.ObjectId;
  sender: Types.ObjectId;
  text?: string;
  image?: string;
  doc?: string;
  type : "text" | "image" | "doc" | "both"
};

export type MessageModel = Model<IMessage, Record<string, unknown>>;