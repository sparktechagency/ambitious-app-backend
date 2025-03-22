import { model, Schema } from "mongoose";
import { ITransaction, TransactionModel } from "./transaction.interface";

const transactionSchema = new Schema<ITransaction, TransactionModel>(
    {
        customer: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        seller: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        business: {
            type: Schema.Types.ObjectId,
            ref: "Business",
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        txid: {
            type: String,
            required: true,
            unique: true,
        },
    },
    { timestamps: true }
);

export const Transaction = model<ITransaction, TransactionModel>("Transaction", transactionSchema);