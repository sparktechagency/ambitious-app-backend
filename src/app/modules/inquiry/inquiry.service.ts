import { JwtPayload } from "jsonwebtoken";
import { IInquiry } from "./inquiry.interface";
import { Inquiry } from "./inquiry.model";
import QueryBuilder from "../../../helpers/QueryBuilder";

const createInquiryInDB = async (payload: IInquiry): Promise<IInquiry> => {
    const inquiry = await Inquiry.create(payload);
    if(!inquiry) throw new Error('Failed to Submit Inquiry');
    return inquiry;
}

const getInquiriesFromDB = async (user: JwtPayload, query: Record<string,any>): Promise<{inquiries:IInquiry[], pagination:any}> => {

    const result = new QueryBuilder(Inquiry.find({seller: user?.id}), query).paginate();
    const inquiries = await result.query;
    const pagination = await result.getPaginationInfo();
    return { inquiries, pagination };
}

export const InquiryService = {
    createInquiryInDB,
    getInquiriesFromDB
};