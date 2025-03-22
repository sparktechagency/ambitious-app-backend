import { JwtPayload } from "jsonwebtoken";
import { IInquiry } from "./inquiry.interface";
import { Inquiry } from "./inquiry.model";
import QueryBuilder from "../../../helpers/QueryBuilder";
import ApiError from "../../../errors/ApiErrors";
import { StatusCodes } from "http-status-codes";

const createInquiryInDB = async (user: JwtPayload, payload: IInquiry): Promise<IInquiry> => {

    payload.customer = user.id;
    const inquiry = await Inquiry.create(payload);
    if(!inquiry) throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to Submit Inquiry');
    return inquiry;
}

const getInquiriesFromDB = async (user: JwtPayload, query: Record<string,any>): Promise<{inquiries:IInquiry[], pagination:any}> => {

    const result = new QueryBuilder(Inquiry.find({seller: user?.id}), query).paginate();
    const inquiries = await result.queryModel.populate('customer', "name profile email");
    const pagination = await result.getPaginationInfo();
    return { inquiries, pagination };
}

export const InquiryService = {
    createInquiryInDB,
    getInquiriesFromDB
};