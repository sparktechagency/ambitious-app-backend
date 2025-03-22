import { Request, Response } from 'express';
import { InquiryService } from './inquiry.service';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';

const createInquiry = async (req: Request, res: Response) => {
    const result = await InquiryService.createInquiryInDB(req.user as JwtPayload, req.body);
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: 'Inquiry Created Successfully',
        data: result
    })
}

const getInquiries = async (req: Request, res: Response) => {
    const result = await InquiryService.getInquiriesFromDB(req.user as JwtPayload, req.query);
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: 'Inquiry Created Successfully',
        data: result
    })
}

export const InquiryController = {
    createInquiry,
    getInquiries
};