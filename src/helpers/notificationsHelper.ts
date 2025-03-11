import { ClientSession } from "mongoose";
import { INotification } from "../app/modules/notification/notification.interface";
import { Notification } from "../app/modules/notification/notification.model";


export const sendNotifications = async (data: INotification, session: ClientSession): Promise<INotification> => {

    const result = (await Notification.create([data], { session }))[0];

    //@ts-ignore
    const socketIo = global.io;

    if (socketIo && data?.receiver) {
        socketIo.emit(`get-notification::${data?.receiver}`, result);
    } else {
        socketIo.emit(`get-notification`, result);
    }

    return result;
}