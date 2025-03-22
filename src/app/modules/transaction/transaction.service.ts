import { StatusCodes } from "http-status-codes";
import { ITransaction } from "./transaction.interface";
import { Transaction } from "./transaction.model";
import ApiError from "../../../errors/ApiErrors";
import mongoose from "mongoose";
import { sendNotifications } from "../../../helpers/notificationsHelper";
import stripe from "../../../config/stripe";
import { JwtPayload } from "jsonwebtoken";
import { generateTxid } from "../../../util/generateTxid";
import QueryBuilder from "../../../helpers/QueryBuilder";
import Business from "../business/business.model";

const makePayment = async (user: JwtPayload, payload: ITransaction) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    const isExistBusiness = await Business.findById(payload.business).lean();
    if(!isExistBusiness){
        throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid Business")
    }

    try {
        
        const stripeSession = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: `Icon Purchase Payment`,
                        },
                        unit_amount: Math.trunc(Number(isExistBusiness?.price) * 100),
                    },
                    quantity: 1,
                },
            ],
            customer_email: user?.email,
            success_url: "http://10.0.80.75:6001/success",
            cancel_url: "http://10.0.80.75:6001/errors",
        });

        if (!stripeSession) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to create Stripe session");
        }

        const transactionPayload = {
            customer: user?.id,
            seller: isExistBusiness?.seller,
            business: isExistBusiness?._id,
            txid: generateTxid(),
            price: isExistBusiness?.price
        };

        const transaction: ITransaction & {_id: mongoose.Types.ObjectId} = (await Transaction.create([transactionPayload], { session }))[0];
        if (!transaction) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to create transaction record");
        }

        // Send notifications
        const data = {
            text: "Someone made a payment for icon purchase" as string,
            type: "ADMIN" as const,
            referenceId: transaction?._id as mongoose.Types.ObjectId,
            screen: "TRANSACTION" as const,
        };
        await sendNotifications(data, session);

        await session.commitTransaction();
        session.endSession();

        return stripeSession?.url;

    } catch (error: any) {
        await session.abortTransaction();
        session.endSession();
        throw new ApiError(StatusCodes.BAD_REQUEST, error);
    }
};


const transactionsFromDB = async (user: JwtPayload, query: Record<string, any>): Promise<{ transactions: ITransaction[], pagination: any }> => {

    const result = new QueryBuilder(Transaction.find(), query).paginate().filter();
    const transactions = await result.queryModel.lean();
    const pagination = await result.getPaginationInfo();

    return { transactions, pagination };
}

export const TransactionService = {
    makePayment,
    transactionsFromDB
}
