import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiErrors';
import { IProposal } from './proposal.interface';
import { Proposal } from './proposal.model';
import mongoose from 'mongoose';
import { JwtPayload } from 'jsonwebtoken';
import QueryBuilder from '../../../helpers/QueryBuilder';
import Business from '../business/business.model';
import { PROPOSAL } from '../../../enums/proposal';

const makeProposalInDB = async ( user: JwtPayload, payload: IProposal ): Promise<IProposal> =>{

    const isExistBusiness = await Business.findById(payload.business).lean();
    if(!isExistBusiness){
        throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid Business ID");
    }

    payload.seller = isExistBusiness.seller;
    payload.customer = user.id;
    const proposal = await Proposal.create(payload);
    if(!proposal){
        throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to Submitted Proposal");
    }

    return proposal;
}

const approvedProposalInDB = async ( id: string, status: string ): Promise<IProposal> =>{

    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid Proposal ID");
    }

    if(status !== "Accept" && status !== "Reject"){
        throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid Status");
    }

    const proposal = await Proposal.findByIdAndUpdate(
        id,
        {
            $set : {status : status}
        },
        {new: true}
    );

    if(!proposal){
        throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to Submitted Proposal");
    }

    return proposal;
}

const proposalsFromDB = async (user: JwtPayload, query: Record<string, any>): Promise<{proposals: IProposal[], pagination:any}> =>{
    const result = new QueryBuilder(Proposal.find({seller: user.id}), query).paginate();
    const proposals = await result.queryModel.populate("customer", "name profile email").populate("business", "name price");;
    const pagination = await result.getPaginationInfo();
    return { proposals, pagination };
}

const customerProposalsFromDB = async (user: JwtPayload, query: Record<string, any>): Promise<{proposals: IProposal[], pagination:any}> =>{
    const result = new QueryBuilder(Proposal.find({customer: user.id}), query).paginate();
    const proposals = await result.queryModel.populate("seller", "name profile email").populate("business", "name price");
    const pagination = await result.getPaginationInfo();
    return { proposals, pagination };
}

export const ProposalService = {
    makeProposalInDB,
    approvedProposalInDB,
    proposalsFromDB,
    customerProposalsFromDB
 };
