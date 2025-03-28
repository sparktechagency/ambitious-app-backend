import { Model, Types } from "mongoose"

export type ITransaction = {
    _id?: Types.ObjectId;
    customer: Types.ObjectId;
    seller: Types.ObjectId;
    proposal: Types.ObjectId;
    price: number;
    txid: string;
    status: "Paid" | "Pending";
    sessionId?: string;
}

export type TransactionModel = Model<ITransaction, Record<string, any>>;