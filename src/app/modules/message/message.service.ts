import mongoose from 'mongoose';
import { IMessage } from './message.interface';
import { Message } from './message.model';
import ApiError from '../../../errors/ApiErrors';
import { StatusCodes } from 'http-status-codes';
import QueryBuilder from '../../../helpers/QueryBuilder';

const sendMessageToDB = async (payload: any): Promise<IMessage> => {
  // save to DB
  const response = await Message.create(payload);

  const newMessage = await Message.findOne({ _id: response._id }).populate('sender', 'name profile');

  //@ts-ignore
  const io = global.io;
  if (io) {
    io.emit(`getMessage::${payload?.chatId}`, newMessage);
  }

  return response;
};

const getMessageFromDB = async (id: any, query: Record<string, any>): Promise<{messages:IMessage[], pagination:any}> => {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid id');
  }

  const result = new QueryBuilder(Message.find({ chatId: id }), query).paginate();
  const messages = await result.queryModel.populate("sender", "name profile occupation");
  const pagination = await result.getPaginationInfo();

  return { messages, pagination };
};

export const MessageService = { sendMessageToDB, getMessageFromDB };

