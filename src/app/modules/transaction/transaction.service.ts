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
import { Proposal } from "../proposal/proposal.model";
import { User } from "../user/user.model";

const makePayment = async (user: JwtPayload, payload: ITransaction) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    const isExistProposal = await Proposal.findById(payload.proposal).lean();
    if(!isExistProposal){
        throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid Proposal ID");
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
                        unit_amount: Math.trunc(Number(isExistProposal?.price) * 100),
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
            seller: isExistProposal?.seller,
            proposal: isExistProposal?._id,
            txid: generateTxid(),
            price: isExistProposal?.price,
            sessionId: stripeSession.id
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

    const result = new QueryBuilder(Transaction.find({status: "Paid"}), query).paginate().search(["amount"]).filter();
    const transactions = await result.queryModel
        .populate("customer", "name profile email")
        .populate("seller", "name profile email")
        .populate({
            path: "proposal", 
            select: "business", 
            populate: {
                path: "business",
                select: "name"
            }
        })
        .lean();

    const pagination = await result.getPaginationInfo();
    return { transactions, pagination };
}


const createAccountToStripe = async (user: JwtPayload) => {
   

    const existingUser: any = await User.findById(user.id).select("+accountInformation").lean();
    if (existingUser?.accountInformation?.accountUrl) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "You already connected your bank on Stripe.");
    }

    // Create account for Canada
    const account = await stripe.accounts.create({
        type: "express",
        country: "SG",
        email: user?.email,
        capabilities: {
            card_payments: { requested: true },
            transfers: { requested: true },
        },
    });

    if (!account) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to create account.");
    }

    // Create an account link for onboarding
    const accountLink = await stripe.accountLinks.create({
        account: account.id,
        refresh_url: 'http://10.0.80.75:6008/failed',
        return_url: 'https://10.0.80.75:6008/success',
        type: 'account_onboarding',
    });

    // Update the user account with the Stripe account ID
    const updateAccount = await User.findOneAndUpdate(
        { _id: user.id },
        { "accountInformation.stripeAccountId": account.id },
        { new: true }
    );

    if (!updateAccount) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to update account.");
    }

    return accountLink?.url; // Return the onboarding link
}

export const TransactionService = {
    makePayment,
    transactionsFromDB,
    createAccountToStripe
}
