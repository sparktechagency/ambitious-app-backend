import { Model, Types } from "mongoose"

export type ITransaction = {
    _id?: Types.ObjectId;
    customer: Types.ObjectId;
    seller: Types.ObjectId;
    business: Types.ObjectId;
    price: number;
    txid: string;
}

export type TransactionModel = Model<ITransaction, Record<string, any>>;