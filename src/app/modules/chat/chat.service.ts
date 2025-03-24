import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiErrors';
import QueryBuilder from '../../../helpers/QueryBuilder';
import { User } from '../user/user.model';
import { IChat } from './chat.interface';
import { Chat } from './chat.model';
import { Message } from '../message/message.model';

const createChatToDB = async (payload: any): Promise<IChat> => {

    const isExistFriend = await User.findOne({ _id: payload[1], role: "SELLER" });
    if (!isExistFriend) {
        throw new ApiError( StatusCodes.BAD_REQUEST, 'User not found');
    }

    const isExistChat: IChat | null = await Chat.findOne({
        participants: { $all: payload },
    });

    if (isExistChat) {
        return isExistChat;
    }
    const chat: IChat = await Chat.create({ participants: payload });
    return chat;
}

const getChatFromDB = async (user: any, query: Record<string, any>): Promise<{ persons:IChat[], pagination:any } > => {

    const result = new QueryBuilder(Chat.find({ participants: { $in: [user.id] } }).populate({
        path: 'participants',
        select: '-_id name profile occupation',
        match: {
            _id: { $ne: user.id }
        }
    }), query).paginate();
    
    const chats = await result.queryModel.lean()
    const pagination = await result.getPaginationInfo();

    const persons = await Promise.all(chats.map(async (chat: any) => {
        const { _id, participants } = chat;
        const participant = participants[0];
        const lastMessage = await Message.findOne({ chatId: chat._id }).sort({ createdAt: -1 }).lean();   
        return {
            chatId: _id,
            ...participant,
            lastMessage
        };
    }));


    return { persons, pagination };
};

export const ChatService = { createChatToDB, getChatFromDB };