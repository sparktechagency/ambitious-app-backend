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
        proposal: {
            type: Schema.Types.ObjectId,
            ref: "Proposal",
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
        sessionId: {type: String},
        status: {
            type: String,
            enum: ["Paid", "Pending"],
            default: "Pending"
        }
    },
    { timestamps: true }
);

export const Transaction = model<ITransaction, TransactionModel>("Transaction", transactionSchema);