import { Request, Response } from 'express';
import { ContactService } from './contact.service';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createContact = async (req: Request, res: Response) => {
    const result = await ContactService.createContactInDB(req.body);
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: 'Contact Submitted Successfully',
        data: result
    })
}

const getContacts = async (req: Request, res: Response) => {
    const result = await ContactService.getContactsFromDB(req.query);
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: 'Contact retrieved Successfully',
        data: result.contacts,
        pagination: result.pagination
    })
}

export const ContactController = {
    createContact,
    getContacts
};