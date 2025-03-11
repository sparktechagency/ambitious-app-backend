import { Request, Response } from 'express';
import { BusinessService } from './business.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createBusiness = catchAsync( async (req: Request, res: Response) => {
    const result = await BusinessService.createBusinessInDB(req.body);
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: "Business Submitted Successfully",
        data: result
    })
})


const approvedBusiness = catchAsync( async (req: Request, res: Response) => {
    const result = await BusinessService.createBusinessInDB(req.body);
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: `Business ${req.body.status} Successfully`,
        data: result
    })
})
const businessDetails = catchAsync( async (req: Request, res: Response) => {
    const result = await BusinessService.createBusinessInDB(req.body);
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: "Business Details Retrieved Successfully",
        data: result
    })
})
const businessList = catchAsync( async (req: Request, res: Response) => {
    const result = await BusinessService.createBusinessInDB(req.body);
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: "Business List Retrieved Successfully",
        data: result
    })
})

export const BusinessController = { 
    createBusiness,
    approvedBusiness,
    businessList,
    businessDetails
};
