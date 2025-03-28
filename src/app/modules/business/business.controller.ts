import { Request, Response } from 'express';
import { BusinessService } from './business.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';

const createBusiness = catchAsync( async (req: Request, res: Response) => {
    const result = await BusinessService.createBusinessInDB(req.body);
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: "Business Submitted Successfully",
        data: result
    })
});

const approvedBusiness = catchAsync( async (req: Request, res: Response) => {
    const result = await BusinessService.approvedBusinessInDB(req.params.id, req.body.status);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: `Business ${req.body.status} Successfully`,
        data: result
    })
});

const businessDetails = catchAsync( async (req: Request, res: Response) => {
    const result = await BusinessService.businessDetailsFromDB(req.user as JwtPayload);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Business Details Retrieved Successfully",
        data: result
    })
});

const businessList = catchAsync( async (req: Request, res: Response) => {
    const result = await BusinessService.businessListFromDB(req.query);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Business List Retrieved Successfully",
        data: result
    })
});

const businessEveryone = catchAsync( async (req: Request, res: Response) => {
    const result = await BusinessService.businessEveryoneFromDB(req.query);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Business List Retrieved Successfully",
        data: result
    })
});

const businessDetailsForCustomer = catchAsync( async (req: Request, res: Response) => {
    const result = await BusinessService.businessDetailsForCustomerFromDB(req.params.id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Business Details Retrieved Successfully",
        data: result
    })
});

const businessListForSeller = catchAsync( async (req: Request, res: Response) => {
    const result = await BusinessService.businessListForSellerFromDB(req.user as JwtPayload, req.query);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Business List Retrieved Successfully",
        data: result
    });
});

const deleteBusiness = catchAsync( async (req: Request, res: Response) => {
    const result = await BusinessService.deleteBusinessFromDB(req.params.id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Business Deleted Successfully",
        data: result
    });
});

const updateBusiness = catchAsync( async (req: Request, res: Response) => {
    const result = await BusinessService.updateBusinessInDB(req.params.id, req.body);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Business Updated Successfully",
        data: result
    });
});

export const BusinessController = { 
    createBusiness,
    approvedBusiness,
    businessList,
    businessDetails,
    businessEveryone,
    businessDetailsForCustomer,
    businessListForSeller,
    deleteBusiness,
    updateBusiness
};
