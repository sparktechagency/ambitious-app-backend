import QueryBuilder from '../../../helpers/QueryBuilder';
import { IChat } from './chat.interface';
import { Chat } from './chat.model';

const createChatToDB = async (payload: any): Promise<IChat> => {
    const isExistChat: IChat | null = await Chat.findOne({
        participants: { $all: payload },
    });

    if (isExistChat) {
        return isExistChat;
    }
    const chat: IChat = await Chat.create({ participants: payload });
    return chat;
}

const getChatFromDB = async (user: any, query: Record<string, any>): Promise<{ friends:IChat[], pagination:any } > => {

    const result = new QueryBuilder(Chat.find({ participants: { $in: [user.id] } }).populate({
        path: 'participants',
        select: '-_id name profile occupation',
        match: {
            _id: { $ne: user.id },
            ...(query?.search && { name: { $regex: query?.search, $options: 'i' } })
        }
    }), query).paginate();
    
    const chats = await result.queryModel.lean()
    const pagination = await result.getPaginationInfo();

    const friends = chats?.filter((chat: any) => chat?.participants?.length > 0)
    .map((friend: any) => {
        const { _id, participants } = friend;
        const participant = participants[0];
        return {
            _id,
            ...participant
        };
    });

    return { friends, pagination };
};

export const ChatService = { createChatToDB, getChatFromDB };