import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiErrors';
import { IBusiness } from './business.interface';
import Business from './business.model';
import mongoose from 'mongoose';
import { sendNotifications } from '../../../helpers/notificationsHelper';
import { JwtPayload } from 'jsonwebtoken';
import QueryBuilder from '../../../helpers/QueryBuilder';

const createBusinessInDB = async (payload: IBusiness): Promise<IBusiness> => {

    const session = await mongoose.startSession();
    session.startTransaction();

    try {

        const business = (await Business.create([payload], { session }))[0];
        if (!business) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to create Business")
        }

        const notificationData = {
            text: "A seller Submit Business for sell" as string,
            referenceId: business?._id as mongoose.Types.ObjectId,
            type: "ADMIN" as const,
            screen: "BUSINESS" as const
        };

        await sendNotifications(notificationData, session)


        await session.commitTransaction();
        session.endSession();
        return business;

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to Process order');
    }
}

const approvedBusinessInDB = async (id: string, status: string): Promise<IBusiness> => {

    const session = await mongoose.startSession();
    session.startTransaction();

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid Business Object ID");
    }

    if(status !== "Approved" && status !== "Rejected"){
        throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid Status");
    }

    try {

        const business = await Business.findByIdAndUpdate(
            { _id: id },
            { $set: { status: status } },
            { new: true, session }
        )

        if (!business) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to Update Business")
        }

        const notificationData = {
            text: `Admin ${status} your Business Submission` as string,
            receiver: business?.seller as mongoose.Types.ObjectId,
            referenceId: business?._id as mongoose.Types.ObjectId,
            screen: "BUSINESS" as const
        };

        await sendNotifications(notificationData, session)
        return business;

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to Process order');
    }

}


const businessDetailsFromDB = async (user: JwtPayload): Promise<IBusiness | null>=>{
    const business: (IBusiness & {_id : mongoose.Types.ObjectId}) | null= await Business.findOne({seller: user.id}).lean();
    return business;
}

const businessListFromDB = async (query: Record<string, any>): Promise<{business:IBusiness[], pagination:any}>=>{
    
    const result = new QueryBuilder(Business.find(), query).paginate().filter();
    const business = await result.queryModel.populate("seller", "name email profile");
    const pagination = await result.getPaginationInfo();

    return { business, pagination}
}

export const BusinessService = {
    createBusinessInDB,
    approvedBusinessInDB,
    businessDetailsFromDB,
    businessListFromDB
};
