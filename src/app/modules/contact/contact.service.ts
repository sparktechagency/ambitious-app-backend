import { IContact } from "./contact.interface";
import { Contact } from "./contact.model";
import QueryBuilder from "../../../helpers/QueryBuilder";
import ApiError from "../../../errors/ApiErrors";
import { StatusCodes } from "http-status-codes";

const createContactInDB = async (payload: IContact): Promise<IContact> => {
    const contact = await Contact.create(payload);
    if (!contact) throw new  ApiError(StatusCodes.BAD_REQUEST, 'Failed to Submit Contact');
    return contact;
}

const getContactsFromDB = async (query: Record<string, any>): Promise<{ contacts: IContact[], pagination: any }> => {

    const result = new QueryBuilder(Contact.find({}), query).paginate();
    const contacts = await result.queryModel;
    const pagination = await result.getPaginationInfo();

    return { contacts, pagination }
}

export const ContactService = {
    createContactInDB,
    getContactsFromDB
};