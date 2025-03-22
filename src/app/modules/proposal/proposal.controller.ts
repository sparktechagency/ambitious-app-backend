import { Request, Response, NextFunction } from 'express';
import { ProposalService } from './proposal.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';

const makeProposal = catchAsync ( async(req: Request, res: Response) =>{
    const result = await ProposalService.makeProposalInDB(req.user as JwtPayload, req.body);
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: "Proposal Submitted Successfully",
        data: result
    })
});

const proposals = catchAsync ( async(req: Request, res: Response) =>{
    const result = await ProposalService.proposalsFromDB(req.user as JwtPayload, req.query);
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: "Proposal Submitted Successfully",
        data: result
    })
});

const customerProposals = catchAsync ( async(req: Request, res: Response) =>{
    const result = await ProposalService.customerProposalsFromDB(req.user as JwtPayload, req.query);
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: "Proposal Submitted Successfully",
        data: result
    })
});

const approvedProposal = catchAsync ( async(req: Request, res: Response) =>{
    const result = await ProposalService.approvedProposalInDB(req.params.id, req.body.status);
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: "Proposal Updated Successfully",
        data: result
    })
});

export const ProposalController = {
    makeProposal,
    proposals,
    approvedProposal,
    customerProposals
};
